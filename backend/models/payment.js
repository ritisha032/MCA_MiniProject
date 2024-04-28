import mongoose from "mongoose";
const {Schema} = mongoose;

const paymentSchema = new Schema({
    orderId: String,
    selected : [
        [false, false, false, false, false, false, false], // Breakfast
        [false, false, false, false, false, false, false], // Lunch
        [false, false, false, false, false, false, false]  // Dinner
    ]
})

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;