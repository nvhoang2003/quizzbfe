import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

// ----------------------------------------------------------------------

RHFCheckbox.propTypes = {
  name: PropTypes.string,
};

export function RHFCheckbox({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) =>
        <FormControlLabel
          control={<Checkbox {...field} checked={field.value} />}
          {...other} />
      }
    />
  );
}

// ----------------------------------------------------------------------

RHFMultiCheckbox.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
};

export function RHFMultiCheckbox({ name, options, ...other }) {
  const { control } = useFormContext();
  console.log(options);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        console.log(field);
        // const onSelected = (option) =>
        //   field.value.includes(option) ? field.value.filter((value) => value !== option) : [...field.value, option];
        // const onSelected = (option) => {
        //   if (Array.isArray(field.value)) {
        //     return field.value.includes(option)
        //       ? field.value.filter((value) => value !== option)
        //       : [...field.value, option];
        //   } else {
        //     return [option];
        //   }
        // };
        return (
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    // checked={field.value.includes(option.value)}
                    // checked={Array.isArray(field.value) && field.value.includes(option.value)}
                    // onChange={() => field.onChange(onSelected(option.value))}
                  />
                }
                label={option.label}
                {...other}
              />
            ))}
          </FormGroup>
        );
      }}
    />
  );
}
