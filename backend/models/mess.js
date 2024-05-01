import mongoose from "mongoose";
const { Schema } = mongoose;

const messSchema = new mongoose.Schema(
  {
    messName: {
      type: String,
     required: true,
     
    },
    messEmail: {
      type: String,
      required: true
    },
    messId:{
      type:String,
    },
    password:{
      type:String,
    }
    
  },
  { timestamps: true }
);

const Mess = mongoose.model('mess', messSchema);
export default Mess;
