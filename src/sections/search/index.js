import { useMemo, useCallback, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  TextField,
  Autocomplete,
  Select,
  MenuItem,
  Chip,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useRequest from "@/utils/dataRequest";
import { fields } from "@/constants/search";
import axios from "@/utils/axios";

const schema = Yup.object().shape({
  id: Yup.string().min(20, "Minimum 20 characters!").required("Required Field"),
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

    "> div": {
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
      width: "100%",
      marginTop: "12px",
    },
  },
  ".MuiAutocomplete-root": {
    ".MuiInputBase-root": {
      height: "56px",
      overflow: "auto",
    },
  },
  ".notFound": {
    textAlign: "center",
  },
}));

const Home = () => {
  const [order, setOrder] = useState();

  const { data: productsData } = useRequest("/api/products");

  const defaultValues = useMemo(
    () =>
      fields.reduce((state, val) => {
        val.forEach((item) =>
          typeof item.defaultValue !== "undefined"
            ? (state[item.name] = item.defaultValue)
            : null
        );

        return state;
      }, {}),
    []
  );

  const { control, getValues, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const options = useMemo(() => ({ products: productsData }), [productsData]);

  const searchOrder = useCallback(
    async (data) => {
      const res = await axios.get(`/api/orders/${data.id}`).catch(() => {
        setOrder(null);
      });

      if (res?.data?.data) {
        setOrder(res.data.data);
        reset({
          name: res.data.data.delivery.name,
          address: res.data.data.delivery.address,
          city: res.data.data.delivery.city,
          country: res.data.data.delivery.country,
          email: res.data.data.delivery.email,
          currency: res.data.data.currency,
          products: res.data.data.products,
          id: getValues("id"),
        });
      }
    },
    [setOrder, reset, getValues]
  );

  const fieldByType = useMemo(
    () => ({
      textfield: (fieldData, field, fieldState) => (
        <TextField
          fullWidth
          {...field}
          disabled={!!fieldData.disabled}
          label={
            fieldData.name.slice(0, 1).toUpperCase() + fieldData.name.slice(1)
          }
          error={!!fieldState.error}
          helperText={fieldState.error?.message || ""}
          placeholder={fieldData.placeholder || ""}
        />
      ),
      select: (fieldData, field) => (
        <FormControl fullWidth>
          <InputLabel>
            {fieldData.name.slice(0, 1).toUpperCase() + fieldData.name.slice(1)}
          </InputLabel>
          <Select
            {...field}
            fullWidth
            disabled={!!fieldData.disabled}
            onChange={(e) => handleSelect(fieldData.name, e.target.value)}
            label={
              fieldData.name.slice(0, 1).toUpperCase() + fieldData.name.slice(1)
            }
          >
            {(options[fieldData.name] || fieldData.options).map(
              (item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      ),
      autocomplete: (fieldData, field) => (
        <FormControl fullWidth>
          <Autocomplete
            {...field}
            multiple
            fullWidth
            disabled={!!fieldData.disabled}
            options={options[fieldData.name] || fieldData.options || []}
            onChange={(e, newValue) => {
              handleMultiSelect(fieldData.name, newValue);
            }}
            getOptionLabel={({ name, price }) =>
              name + "   " + price + getValues("currency")
            }
            renderTags={(tagValue, getTagProps) =>
              tagValue.map(({ name, price }, index) => (
                <Chip
                  label={name + "   " + price + getValues("currency")}
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
        </FormControl>
      ),
      button: (fieldData) => (
        <button
          className="sendBtn"
          {...(fieldData.submit ? { type: "submit" } : {})}
        >
          {fieldData.text}
        </button>
      ),
    }),
    [getValues, options]
  );

  return (
    <StyledRoot>
      <form onSubmit={handleSubmit(searchOrder)}>
        {fields.map((item, index) => (
          <div key={index}>
            {item.map((fieldItem) => (
              <div
                key={fieldItem.name}
                style={{
                  width: `calc(100% / ${item.length})`,
                }}
              >
                {fieldItem.type === "button"
                  ? fieldItem.initShow && fieldByType[fieldItem.type](fieldItem)
                  : (fieldItem.initShow || order) && (
                      <Controller
                        name={fieldItem.name}
                        control={control}
                        render={({ field, fieldState }) =>
                          fieldByType[fieldItem.type](
                            fieldItem,
                            field,
                            fieldState
                          )
                        }
                      />
                    )}
              </div>
            ))}
          </div>
        ))}
      </form>
      {typeof order === "object" && !order && (
        <div className="notFound">Not found order.</div>
      )}
    </StyledRoot>
  );
};

export default Home;
