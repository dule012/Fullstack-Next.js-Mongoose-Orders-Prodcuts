const createOrderSchema = {
  type: "object",
  properties: {
    delivery: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        address: {
          type: "string",
        },
        city: {
          type: "string",
        },
        country: {
          type: "string",
        },
      },
      required: ["name", "address", "city", "country"],
    },
    products: {
      type: "array",
      items: [
        {
          type: "object",
          properties: { name: { type: "string" }, price: { type: "integer" } },
        },
      ],
      minItems: 1,
    },
    total: {
      type: "integer",
    },
    currency: {
      type: "string",
    },
  },
};

export default createOrderSchema;
