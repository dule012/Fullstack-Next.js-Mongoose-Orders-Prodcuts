import Products from "@/backend/models/products";

const getProducts = async (req, res) => {
  try {
    const products = await Products.find({});

    res.status(200).json({
      error: false,
      message: "Successfully returned products.",
      data: products,
    });
  } catch (error) {
    throw error;
  }
};

export default getProducts;
