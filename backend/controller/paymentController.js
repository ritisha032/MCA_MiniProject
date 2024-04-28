import crypto from "crypto";
import Payment from "../models/payment.js";
import Razorpay from "razorpay";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";
import Coupon from "../models/coupon.js";
import dotenv from 'dotenv';
dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_ID_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY
});

const initiatePayment = async (req, res) => {
    try {
        const { selected, amount } = req.body;
        console.log("selected= ", selected, "amount= ", amount);

        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency: "INR",
        });

        const payment = await Payment.create({ orderId: order.id, selected });
        console.log("order= ", order);
        res.send(order);
    } catch (error) {
        console.error("Error initiating payment:", error);
        res.status(500).send("Error initiating payment");
    }
}

const paymentStatus = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        console.log("payment status ki body", req.body);

        const isPaymentValid = validatePaymentVerification({ order_id: razorpay_order_id, payment_id: razorpay_payment_id }, razorpay_signature, process.env.RAZORPAY_SECRET_KEY);
        if (!isPaymentValid) {
            return res.status(400).json({ msg: "Invalid payment verification" });
        }

        const order = await Payment.findOne({ orderId: razorpay_order_id });
        if (!order) {
            return res.status(404).json({ msg: "Order not found" });
        }

        await Coupon.createIndexes({ "createdAt": 1 }, { expireAfterSeconds: 20 });
        await Coupon.updateOne({ email: req.user?.email }, { $set: { week: order.selected, taken: true } }, { upsert: true });

        res.json({ success: true });
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).send("Error verifying payment");
    }
}

export { initiatePayment, paymentStatus };
