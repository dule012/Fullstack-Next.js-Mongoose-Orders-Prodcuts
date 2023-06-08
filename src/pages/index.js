import { useMemo } from "react";
import { styled } from "@mui/material/styles";
import { TextField, Autocomplete, Select } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useRequest from "@/utils/dataRequest";
import { fields } from "@/constants/home";

const schema = Yup.object().shape({
  name: Yup.string().min(2, "Minimum 2 characters!").required("Required Field"),
  address: Yup.string()
    .min(4, "Minimum 4 characters!")
    .required("Required Field"),
  city: Yup.string().min(2, "Minimum 2 characters!").required("Required Field"),
  country: Yup.string()
    .min(4, "Minimum 4 characters!")
    .required("Required Field"),
  currency: Yup.string().required("Required Field"),
  products: Yup.array(),
});

const Home = () => {
  const { data: productsData } = useRequest("/api/products");

  const defaultValues = useMemo(
    () =>
      fields.reduce((state, val) => {
        val.forEach((item) => (state[item.name] = item.defaultValue));

        return state;
      }, {}),
    []
  );

  const options = { products: productsData };

  const field = {
    textfield: (data) => (
      <Controller
        name={data.name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label={data.name.slice(0, 1).toUpperCase() + data.name.slice(1)}
            error={!!error}
            helperText={error?.message || ""}
            placeholder={data.placeholder || ""}
          />
        )}
      />
    ),
  };

  const { control, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  return <main></main>;
};

export default Home;
