import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

// ----------------------------------------------------------------------

RHFDateTimePicker.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node,
};

export default function RHFDateTimePicker({ name, children, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <DateTimePicker
          {...field}
          {...other}
          renderInput={(inputProps) => (
            <TextField
              {...inputProps}
              onBlur={onBlur}
              value={field.value}
              fullWidth
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
      )}
    />
  );
}
