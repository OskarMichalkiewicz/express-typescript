import mongoose from "mongoose";

const TeaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is mandatory"],
    trim: true,
    maxlength: [50, "name can not be longer than 50 characters"],
  },
  type: {
    type: String,
    required: [true, "type is mandatory"],
    enum: ["Oolong", "Yellow", "Green", "Black", "Pu-erh", "White", "Heicha"],
  },
  description: {
    type: String,
    maxlength: [255, "description can not be longer than 255 characters"],
  },
});

export default mongoose.model("Tea", TeaSchema);
