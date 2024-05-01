import Profile from "../models/profile.js";
import User from "../models/user.js";

import { uploadImageToCloudinary } from "../utils/imageUploader.js";
// Method for updating a profile
const updateProfile = async (req, res) => {
	try {
		const { gender,dateOfBirth = "", about = "", contactNumber } = req.body;
		console.log(req.body);
		const id = req.user.id;

		// Find the profile by id
		const userDetails = await User.findById(id);
		const profile = await Profile.findById(userDetails.additionalDetails);

		// Update the profile fields
		profile.dateOfBirth = dateOfBirth;
		profile.about = about;
		profile.contactNumber = contactNumber;
		profile.gender=gender;

		// Save the updated profile
		await profile.save();

		return res.json({
			success: true,
			message: "Profile updated successfully",
			profile,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

const deleteAccount = async (req, res) => {
	try {
		// TODO: Find More on Job Schedule
		// const job = schedule.scheduleJob("10 * * * * *", function () {
		// 	console.log("The answer to life, the universe, and everything!");
		// });
		// console.log(job);
		console.log("Printing ID: ", req.user.id);
		const id = req.user.id;
		
		const user = await User.findById({ _id: id });
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}
		// Delete Assosiated Profile with the User
		await Profile.findByIdAndDelete({ _id: user.additionalDetails });
		
		await User.findByIdAndDelete({ _id: id });
		res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ success: false, message: "User Cannot be deleted successfully" });
	}
};

//get profile section of user schema
const getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const updateDisplayPicture = async (req, res) => {
	try {
	  const displayPicture = req.files.displayPicture;
	  const userId = req.user.id;
	  console.log("user id= ",userId);
  
	  // Find the user with the given userId
	  const user = await User.findById(userId);
  
	  if (!user) {
		return res.status(404).json({
		  success: false,
		  message: "User not found",
		});
	  }
  
	  // Get the profileId associated with the user
	  const profileId = user.additionalDetails;
  
	  // Upload image to Cloudinary
	  const image = await uploadImageToCloudinary(
		displayPicture,
		process.env.FOLDER_NAME,
		1000,
		1000
	  );
  
	  // Update the profile with the new image URL
	  const updatedProfile = await Profile.findByIdAndUpdate(
		profileId,
		{ image: image.url },
		{ new: true }
	  );
  
	  res.send({
		success: true,
		message: "Image updated successfully",
		data: updatedProfile,
	  });
	} catch (error) {
	  return res.status(500).json({
		success: false,
		message: error.message,
	  });
	}
  };
  
export {updateProfile,deleteAccount,getAllUserDetails,updateDisplayPicture};
