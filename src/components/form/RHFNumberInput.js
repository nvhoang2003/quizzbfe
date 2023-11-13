import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { TextField } from "@mui/material";

// ----------------------------------------------------------------------

RHFNumberInput.propTypes = {
  name: PropTypes.string,
};

export default function RHFNumberInput({ name, isError, errorMessage,  ...other }) {
  const { control } = useFormContext();
  const validate = (value) => {
    const matches = value.match(
      /^(?:0\.(?:0[0-9]|[0-9]\d?)|[0-9]\d*(?:\.\d{1,2})?)(?:e[+-]?\d+)?$/
    );
    return matches?.length > 0 || "It is not a number";
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{ validate }}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          onChange={field.onChange}
          value={field.value}
          fullWidth
          type="number"
          error={!!error || isError}
          helperText={error?.message || errorMessage}
          {...other}
        />
      )}
    />
  );
}
