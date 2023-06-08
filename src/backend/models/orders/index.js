import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const productsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const schema = new mongoose.Schema({
  delivery: {
    type: deliverySchema,
    required: true,
  },
  products: {
    type: [productsSchema],
    default: [],
  },
  total: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Orders
  ? mongoose.model("Orders")
  : mongoose.model("Orders", schema);
