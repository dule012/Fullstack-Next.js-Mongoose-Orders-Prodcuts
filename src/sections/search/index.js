import { useMemo, useCallback, useState } from "react";
import { styled } from "@mui/material/styles";
import { TextField, Autocomplete, Select, MenuItem, Chip } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import useRequest from "@/utils/dataRequest";
import { fields } from "@/constants/home";
import axios from "@/utils/axios";

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
  const [notFound, setNotFound] = useState();
  const { data: productsData } = useRequest("/api/products");

  const { control, getValues, handleSubmit } = useForm({});

  const options = useMemo(() => ({ products: productsData }), [productsData]);

  const searchOrder = useCallback(async (data) => {
    const res = await axios.get("/api/orders", data);
  }, []);

  const fieldByType = useMemo(
    () => ({
      textfield: (fieldData, field) => (
        <TextField
          fullWidth
          {...field}
          disabled
          label={
            fieldData.name.slice(0, 1).toUpperCase() + fieldData.name.slice(1)
          }
          placeholder={fieldData.placeholder || ""}
        />
      ),
      select: (fieldData, field) => (
        <Select
          {...field}
          disabled
          fullWidth
          label={
            fieldData.name.slice(0, 1).toUpperCase() + fieldData.name.slice(1)
          }
        />
      ),
      autocomplete: (fieldData, field) => (
        <Autocomplete
          {...field}
          multiple
          fullWidth
          disabled
          options={options[fieldData.name] || fieldData.options || []}
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
