import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

// ----------------------------------------------------------------------

RHFDateTimePicker.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
};

export default function RHFDateTimePicker({ name, label, control, isError, errorMessage, ...other }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
        <DateTimePicker
          {...field}
          {...other}
          label={label}
          slotProps={{
            textField: {
              fullWidth: true,
              onBlur: onBlur,
              name: name,
              error: !!fieldState.error || isError,
              helperText: fieldState.error?.message || errorMessage,
            },
          }}
        />
      )}
    />
  );
}
