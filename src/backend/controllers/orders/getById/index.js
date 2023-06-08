import Orders from "@/backend/models/orders";

const getByIdOrder = async (req, res) => {
  try {
    const {
      query: { id },
    } = req;

    const order = await Orders.findOne({ _id: id });

    res.status(order ? 200 : 404).json({
      error: !!order,
      message: order ? "Successfully returned order." : "Not found order.",
      data: order,
    });
  } catch (error) {
    throw error;
  }
};

export default getByIdOrder;
