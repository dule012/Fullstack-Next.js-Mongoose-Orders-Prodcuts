import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.Products
  ? mongoose.model("Products")
  : mongoose.model("Products", schema);
