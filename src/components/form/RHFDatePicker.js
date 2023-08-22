import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, DatePicker } from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// ----------------------------------------------------------------------

RHFDatePicker.propTypes = {
    name: PropTypes.string,
    children: PropTypes.node,
    onChange: PropTypes.func,
};

export default function RHFDatePicker({ name, children, onChange,...other }) {
    const { control } = useFormContext();
    const [selectedDate, setSelectedDate] = useState(Date);

    useEffect(() => {
        if (value) {
        setSelectedDate(dayjs(value, 'DD/MM/YYYY').toDate());
        }
    }, [value]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        if (onChange) {
        onChange(dayjs(date).format('DD/MM/YYYY'));
        }
    };


    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
            control={control}
            name="date"
            // rules={{
            //     validate: {
            //         min: (date) => isFuture(date) || "Please, enter a future date"
            //     }
            // }}
            render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
                <DatePicker
                    {...field}
                    inputRef={ref}
                    label="Date"
                    value={selectedDate || null} // Truyền selectedDate làm giá trị
                    onChange={handleDateChange}
                    renderInput={(inputProps) => (
                        <TextField
                            {...inputProps}
                            onBlur={onBlur}
                            name={name}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                    
                />
            )}
        />
        </LocalizationProvider>
        
    );
}
