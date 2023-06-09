export const fields = [
  [
    {
      name: "id",
      type: "textfield",
      defaultValue: "",
      placeholder: "Search order by id",
      initShow: true,
    },
    {
      name: "searchOrder",
      type: "button",
      text: "Search",
      submit: true,
      initShow: true,
    },
  ],
  [
    {
      name: "name",
      type: "textfield",
      disabled: true,
    },
    {
      name: "address",
      type: "textfield",
      disabled: true,
    },
  ],
  [
    {
      name: "city",
      type: "textfield",

      disabled: true,
    },
    {
      name: "country",
      type: "textfield",

      disabled: true,
    },
  ],
  [
    {
      name: "currency",
      type: "select",
      options: ["$"],
      disabled: true,
    },
    {
      name: "products",
      type: "autocomplete",
      disabled: true,
    },
  ],
  [
    {
      name: "email",
      type: "textfield",
      disabled: true,
    },
  ],
];
