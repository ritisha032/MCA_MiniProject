import mongoose from "mongoose";
const { Schema } = mongoose;

const complaintSchema = new mongoose.Schema({
    name: String,
    roomNumber: String,
    complaintType: {
      type: String,
      enum: ["food", "staff", "other"]
    },
    complaintText: String,
    messId: String, // Assuming messId is a String, change it to the appropriate type if necessary
    status: {
      type: String,
      enum: ["unresolved", "resolved"],
      default: "unresolved"
    }
});

const Complaint = mongoose.model('Complaint', complaintSchema);

export default Complaint;
