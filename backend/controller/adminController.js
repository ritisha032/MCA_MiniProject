import { Day } from "../models/day.js";
import { Meal } from "../models/meal.js";
import Coupon from "../models/coupon.js";

const setMealCostTime = async(req,res)=>{
    const data = req.body;
 //   await Meal.deleteMany({});
    const response = await Meal.create(data);
    
    res.send(response);
}

const setMenu = async(req,res)=>{
    const data = req.body;
    console.log("data= ",req.body);
    await Day.deleteMany({});
    const response = await Day.insertMany(data);
    
    res.send(response);
}

export {setMealCostTime, setMenu};