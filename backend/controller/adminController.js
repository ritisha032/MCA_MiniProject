import { Day } from "../models/day.js";
import { Meal } from "../models/meal.js";
import Coupon from "../models/coupon.js";
import userModel from "../models/user.js";
import mess from "../models/mess.js";

const setMealCostTime = async (req, res) => {
  const data = req.body;
  //   await Meal.deleteMany({});
  const response = await Meal.create(data);

  res.send(response);
};

const setMenu = async (req, res) => {
  const data = req.body;
  console.log("data= ", req.body);
  await Day.deleteMany({});
  const response = await Day.insertMany(data);

  res.send(response);
};

const getUsers = async (req, res) => {
  const { messName } = req.params;
  console.log(req.params);

  // Assuming you have a model named 'messModel'
  mess
    .findOne({ messName: messName }) // Find the mess with the provided name
    .then((mess) => {
      if (!mess) {
        return res.status(404).json({ error: "Mess not found" });
      }
      console.log("Mess ID= ", mess.messId); // Assuming messID is stored in '_id' field
      const messID = mess.messId;

      // Now fetch users based on messID
      userModel
        .find({ messId: messID, isAdmin: false }) // Find users with the specific messId and isAdmin set to false
        .then((users) => {
          res.json(users);
        })
        .catch((err) => {
          console.error("Error fetching users:", err);
          res.status(500).json({ error: "Internal Server Error" });
        });
    })
    .catch((err) => {
      console.error("Error fetching mess:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
};
const deleteUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the user by ID and delete it
    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "User deleted successfully",
        deletedUser,
      });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { setMealCostTime, setMenu, getUsers, deleteUser };
