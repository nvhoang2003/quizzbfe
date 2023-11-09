import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { TextField, DatePicker } from "@mui/material";

// ----------------------------------------------------------------------

RHFDatePicker.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
};

export default function RHFDatePicker({ name, label, control, isError, errorMessage,...other }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
        <DatePicker
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
