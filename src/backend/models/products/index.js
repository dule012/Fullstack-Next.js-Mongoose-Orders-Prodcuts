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

const Products = mongoose.models.Products
  ? mongoose.model("Products")
  : mongoose.model("Products", schema);

Products.find({}).then(
  (docs) =>
    !docs.length &&
    Products.insertMany([
      new Products({ name: "Product1", price: 90 }),
      new Products({ name: "Product2", price: 80 }),
      new Products({ name: "Product3", price: 70 }),
    ])
);

export default Products;
