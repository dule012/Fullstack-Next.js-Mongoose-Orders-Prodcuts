export const fields = [
  [
    { name: "name", type: "textfield", defaultValue: "" },
    { name: "address", type: "textfield", defaultValue: "" },
  ],
  [
    { name: "city", type: "textfield", defaultValue: "" },
    { name: "country", type: "textfield", defaultValue: "" },
  ],
  [
    { name: "currency", type: "select", defaultValue: "$", options: ["$"] },
    { name: "products", type: "autocomplete", defaultValue: [] },
  ],
];
