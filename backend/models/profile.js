import mongoose from "mongoose";

const { Schema } = mongoose;

const profileSchema = new Schema(
  {
    image: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    dateOfBirth: {
      type: Date,
    },
    about: {
      type: String,
      trim: true,
    },
    contactNumber: {
      type: Number,
      trim: true,
      
    },
  },
  { versionKey: false }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
