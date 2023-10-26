import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField,  } from '@mui/material';

// ----------------------------------------------------------------------

RHFSelect.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node,
};
// children,
export default function RHFSelect({ name, isError, errorMessage, children,...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          SelectProps={{ native: true }}
          error={!!error || isError}
          helperText={error?.message || errorMessage}
              {...other} 
        >
          {children}
        </TextField>
      )}
    />
  );
}
