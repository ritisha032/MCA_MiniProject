import { Day } from "../models/day.js";
import { Meal } from "../models/meal.js";
import Coupon from "../models/coupon.js";
import userModel from "../models/user.js";
import mess from "../models/mess.js";
import feedbackModel from "../models/feedback.js";
import complaintModel from "../models/complaint.js";

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
const getFeedbacks=async(req,res)=>{
  try {
    const { messId } = req.params;
    const feedbacks = await feedbackModel.find({ messId });
    res.status(200).json({ success: true, feedbacks });
  } catch (error) {
    console.error('Error getting feedbacks:', error);
    res.status(500).json({ success: false, message: 'Failed to get feedbacks' });
  }
}
const updateFeedback=async(req,res)=>{
  const { userId } = req.params;
  try {
    // Find the feedback by ID and update its status to 'read'
    const feedback = await feedbackModel.findByIdAndUpdate(userId, { status: 'read' }, { new: true });

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    // Send the updated feedback as response
    res.json({ feedback });
  } catch (error) {
    console.error('Error updating feedback status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
const getComplaints = async (req, res) => {
  try {
    const { messId } = req.params;
    const complaints = await complaintModel.find({ messId });
    res.status(200).json({ success: true, complaints });
  } catch (error) {
    console.error('Error getting complaints:', error);
    res.status(500).json({ success: false, message: 'Failed to get complaints' });
  }
}

const updateComplaint = async (req, res) => {
  const { complaintId } = req.params;
  try {
    // Find the complaint by ID and update its status to 'resolved'
    const complaint = await complaintModel.findByIdAndUpdate(complaintId, { status: 'resolved' }, { new: true });

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Send the updated complaint as response
    res.json({ complaint });
  } catch (error) {
    console.error('Error updating complaint:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export { setMealCostTime, setMenu, getUsers, deleteUser,getFeedbacks,updateFeedback,getComplaints,updateComplaint};
