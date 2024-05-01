import Coupon from "../models/coupon.js";
import Day  from "../models/day.js";
import  Meal from "../models/meal.js";

const getWeekMenu = async (req, res) => {
    // Complete menu:
    const MenuData = await Day.find({}).select({ _id: 0 }); // Skip selecting id
    res.send(MenuData);
}

const getMealData = async (req, res) => {
    const MealData = await Meal.find({}).select({ _id: 0 });
    res.send(MealData);
}

const getCouponData = async (req, res) => {
    const { email } = req.body;
    const coupon = await Coupon.findOne({ email }).select({ _id: 0 });
    res.json(coupon);
}

export { getWeekMenu, getMealData, getCouponData };
