import { useMemo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import {
  TextField,
  Autocomplete,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  MenuItem,
  Chip,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useRequest from "@/utils/dataRequest";
import { fields } from "@/constants/home";
import axios from "@/utils/axios";

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
  products: Yup.array().min(1),
});

const StyledRoot = styled("main")(({ theme }) => ({
  paddingTop: "5rem",
  width: "50%",
  margin: "auto",
  minWidth: "320px",

  "> form": {
    display: "flex",
    flexFlow: "column",
    rowGap: "1rem",

    "> div:not(.sendBtn)": {
      display: "flex",
      justifyContent: "center",
      columnGap: "1rem",
    },
    ".sendBtn": {
      backgroundColor: "blue",
      color: "white",
      borderRadius: "12px",
      textAlign: "center",
      padding: "7px 0",
      cursor: "pointer",
      fontSize: "15px",
    },
  },
  ".MuiAutocomplete-root": {
    ".MuiInputBase-root": {
      height: "56px",
      overflow: "auto",
    },
  },
}));

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

  const { control, setValue, getValues, reset, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const options = { products: productsData };

  const handleMultiSelect = useCallback(
    (name, val) => setValue(name, val),
    [setValue]
  );

  const handleSelect = useCallback(
    (name, val) => setValue(name, val),
    [setValue]
  );

  const createOrder = useCallback(
    async (data) => {
      const res = await axios.post("/api/orders", data);
      if (res.status === 200) reset(() => ({}));
    },
    [reset]
  );

  const fieldByType = {
    textfield: (fieldData, field, fieldState) => (
      <TextField
        fullWidth
        {...field}
        label={
          fieldData.name.slice(0, 1).toUpperCase() + fieldData.name.slice(1)
        }
        error={!!fieldState.error}
        helperText={fieldState.error?.message || ""}
        placeholder={fieldData.placeholder || ""}
      />
    ),
    select: (fieldData, field, fieldState) => (
      <FormControl fullWidth>
        <InputLabel>
          {fieldData.name.slice(0, 1).toUpperCase() + fieldData.name.slice(1)}
        </InputLabel>
        <Select
          {...field}
          fullWidth
          onChange={(e) => handleSelect(fieldData.name, e.target.value)}
          label={
            fieldData.name.slice(0, 1).toUpperCase() + fieldData.name.slice(1)
          }
        >
          {(options[fieldData.name] || fieldData.options).map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
        {fieldState.error && (
          <FormHelperText error={!!fieldState.error}>
            {fieldState.error.message}
          </FormHelperText>
        )}
      </FormControl>
    ),
    autocomplete: (fieldData, field, fieldState) => (
      <FormControl fullWidth>
        <Autocomplete
          {...field}
          multiple
          fullWidth
          options={options[fieldData.name] || fieldData.options || []}
          onChange={(e, newValue) => {
            handleMultiSelect(fieldData.name, newValue);
          }}
          getOptionLabel={({ name, price }) =>
            name && price ? name + "   " + price + getValues("currency") : ""
          }
          renderTags={(tagValue, getTagProps) =>
            tagValue.map(({ name, price }, index) => (
              <Chip
                label={
                  name && price
                    ? name + "   " + price + getValues("currency")
                    : ""
                }
                {...getTagProps({ index })}
                key={index}
              />
            ))
          }
          isOptionEqualToValue={(option, value) => option._id === value._id}
          renderInput={(params) => (
            <TextField
              {...params}
              label={
                fieldData.name.slice(0, 1).toUpperCase() +
                fieldData.name.slice(1)
              }
            />
          )}
        />
        {fieldState.error && (
          <FormHelperText error={!!fieldState.error}>
            {fieldState.error.message}
          </FormHelperText>
        )}
      </FormControl>
    ),
  };

  return (
    <StyledRoot>
      <form onSubmit={handleSubmit(createOrder)}>
        {fields.map((item, index) => (
          <div key={index}>
            {item.map((fieldItem) => (
              <div
                key={fieldItem.name}
                style={{
                  width: `calc(100% / ${item.length})`,
                }}
              >
                <Controller
                  name={fieldItem.name}
                  control={control}
                  render={({ field, fieldState }) =>
                    fieldByType[fieldItem.type](fieldItem, field, fieldState)
                  }
                />
              </div>
            ))}
          </div>
        ))}
        <button className="sendBtn" type="submit">
          Create
        </button>
      </form>
    </StyledRoot>
  );
};

export default Home;
