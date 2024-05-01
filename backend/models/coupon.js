import mongoose from "mongoose";
const { Schema } = mongoose;

const couponSchema = new Schema({
    email : String,
    taken: Boolean,
    week: [
        [false, false, false, false, false, false, false], // Breakfast
        [false, false, false, false, false, false, false], // Lunch
        [false, false, false, false, false, false, false]  // Dinner
    ]
},{timestamps: true});

const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;
