import { InferSchemaType, Schema, model } from "mongoose";

const ItemSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is mandatory"],
    trim: true,
    maxlength: [50, "Name can not be longer than 50 characters"],
  },
  description: {
    type: String,
    maxlength: [255, "Description can not be longer than 255 characters"],
  },
});

interface IItem extends InferSchemaType<typeof ItemSchema> {}

export default model<IItem>("Item", ItemSchema);
