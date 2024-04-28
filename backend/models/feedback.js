import mongoose from "mongoose";
const { Schema } = mongoose;

// Define feedback schema
const feedbackSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  roomNumber: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  feedbackText: {
    type: String,
    required: true
  },
  messId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['read', 'unread'],
    default: 'unread'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create feedback model
const feedbackModel = mongoose.model('Feedback', feedbackSchema);

export default feedbackModel;
