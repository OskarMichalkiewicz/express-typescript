import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is mandatory"],
    trim: true,
    maxlength: [50, "name can not be longer than 50 characters"],
  },
  description: {
    type: String,
    maxlength: [255, "description can not be longer than 255 characters"],
  },
});

export default mongoose.model("Item", ItemSchema);
