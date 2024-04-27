import mess from "../models/mess.js";

const addMess = async (req, res) => {
  try {
    const {messName,messEmail,messId,password} = req.body;
    console.log("req ki body= ", req.body);

    // Check if mess already exists
    const existingMess = await mess.findOne({messEmail});
    if (existingMess) {
      return res.status(400).json({ message: "A mess with this email or ID already exists" ,mess:existingMess});
    }

    // Create a new mess entity
    const newMess = await mess.create({messName:messName,messEmail:messEmail,messId,password});
    console.log("new Mess= ", newMess);

    res.status(201).json({ message: "Mess created successfully", mess: newMess });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

  
const getMess=async(req,res)=>{
  try {
    // Fetch all messes from the database
    const messes = await mess.find({}, 'messName'); // Only fetch 'messName' field

    // Send the messes as a response
    res.status(200).json(messes);
  } catch (error) {
    console.error('Error fetching messes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
const deleteMess = async (req, res) => {
  try {
    const messID = req.params.id;

    // Find the mess by ID and delete it
    const deletedMess = await messModel.findByIdAndDelete(messID);

    if (!deletedMess) {
      return res.status(404).json({ message: "Mess not found" });
    }

    res
      .status(200)
      .json({ message: "Mess deleted successfully", mess: deletedMess });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete mess", error: error.message });
  }
};

export  { addMess,deleteMess,getMess }
