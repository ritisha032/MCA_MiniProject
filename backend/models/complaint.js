import mongoose from "mongoose";
const { Schema } = mongoose;

const complaintSchema = new mongoose.Schema({
    name: String,
    roomNumber: String,
    complaintType: {
      type: String,
      enum: ["food", "staff", "other"]
    },
    complaintText: String
  });
const complaintModel = mongoose.model('Complaint', complaintSchema);

export default complaintModel;
