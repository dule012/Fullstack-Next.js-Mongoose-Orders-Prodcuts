import Orders from "@/backend/models/orders";
import sendEmail from "@/backend/utils/sendEmail";

const createOrder = async (req, res) => {
  try {
    let {
      body: { products, name, email, address, city, country, currency },
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
      delivery: { name, email, address, city, country },
      products,
      total,
      currency,
    });
    await order.save();

    await sendEmail({
      to: email,
      subject: "Order",
      text: `Dear ${name} your order:`,
      html: `<div>Dear ${name} your order:</div><div>${products
        .map((item) => item.name + " " + item.price + currency)
        .join(", ")}</div>`,
    });

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
