import Orders from "@/backend/models/orders";

const createOrder = async (req, res) => {
  try {
    let {
      body: { products, name, address, city, country, currency },
    } = req;

    products = products
      .map((item, index) => {
        const found = products
          .slice(0, index)
          .find(
            (productItem) =>
              productItem.name === item.name && productItem.price === item.price
          );
        if (found) return;

        const quantity = products.reduce(
          (state, val) =>
            val.name === item.name && val.price === item.price
              ? ++state
              : state,
          0
        );

        return { name: item.name, price: item.price, quantity };
      })
      .filter((item) => item);

    const total = products.reduce(
      (state, val) => val.quantity * +val.price + state,
      0
    );

    const order = new Orders({
      delivery: { name, address, city, country },
      products,
      total,
      currency,
    });
    await order.save();

    res.status(200).json({
      error: false,
      message: "Successfully created order.",
      data: {
        delivery: { name, address, city, country },
        products,
        total,
        currency,
      },
    });
  } catch (error) {
    throw error;
  }
};

export default createOrder;
