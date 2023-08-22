import { useMemo, useState,useEffect } from 'react'; 
import FormProvider from '@/components/form/FormProvider';
import RHFTextField from '@/components/form/RHFTextField';
import { Container, Button, Card, Divider, Grid, Stack, Typography,TextField } from '@mui/material'
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { create, updateCourseByID } from '@/dataProvider/courseApi';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
//---------------------------------------------------

Form.propTypes = {
    isEdit: PropTypes.bool,
    currentLevel: PropTypes.object
  };
  



export default function Form({ isEdit = false, currentLevel }) {
const [newData, setNewData] = useState([]);
const { push } = useRouter();
const { enqueueSnackbar } = useSnackbar();
const [startDate, setTodate] = useState(Date);
const [endDate, setFromdate] = useState(Date);

const validationSchema = Yup.object().shape({
    shortname: Yup.string().trim().required('Tên ngắn không được để trống'),
    fullname: Yup.string().trim().required('Tên đầy đủ không được trống'),
    description: Yup.string().trim().required('Mô tả  không được trống'),
    // startDate: Yup.date().required('Ngày bắt đầu không được để trống'),
    // endDate: Yup.date().required('Ngày kết thúc không được để trống'),

});


const defaultValues = useMemo(
    () => ({
        fullname: currentLevel?.fullname || '',
        description: currentLevel?.description || '',
        shortname: currentLevel?.shortname || '',
        // startDate: startDate,
        // endDate: endDate
    }),
    [currentLevel]
);




const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
});

const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
} = methods;


const handleDateChange = (date) => {
    setValue('selectedDate', date); // Cập nhật giá trị của picker trong react-hook-form
  };

useEffect(() => {
    if (isEdit && currentLevel) {
        reset(defaultValues);
    }
    if (!isEdit) {
        reset(defaultValues);
    }
}, [isEdit, currentLevel]);



async function createNew(data){
    try {
        console.log(data);
        const res = await create({
          shortname:data.shortname,
          startDate: dayjs(data.startDate).format('DD/MM/YYYY'),
          endDate:dayjs(data.endDate).format('DD/MM/YYYY'),
          fullname : data.fullname,
          description: data.description
        });
        console.log(res);

        if (res.status < 400) {
            enqueueSnackbar(res.data.message , {variant: 'success'});
            push('/course');
        } else {
            enqueueSnackbar(res.res.data.title , { variant: 'error' });
        }
    } catch (error) {
        enqueueSnackbar(error, { variant: 'error' });
    }
};

async function fetchUpdateByID(data){
    try {
      const res = await updateCourseByID(currentLevel.id, {
        fullname : data.fullname,
        shortname: data.shortname,
        startDate: data.startDate,
        endDate: data.endDate,
        description: data.description
      });
      if (res.status < 400) {
        push('/course');
        enqueueSnackbar(res.data.message, { variant: 'success' });
      } else {
        enqueueSnackbar(res.res.data.title , { variant: 'error' });
      }
    } catch (error) {

      enqueueSnackbar(error, { variant: 'error' });    }
    
  }




const onSubmit = async (data) => {
    if(!isEdit){
        createNew(data);
    }else{
        fetchUpdateByID(data);
    }
  };

      return (
        <Container maxWidth='100%'>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12} >
                    <Card sx={{ p: 5 }}>
                        <Typography variant="h4" sx={{ color: 'text.disabled', mb: 3 }}>
                        {!isEdit ? 'Tạo mới Khóa học ' : 'Cập nhật Khóa học'}
                        </Typography>
                        <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
                            <Stack alignItems="flex-end" spacing={1.5}>
                                <Stack spacing={2} sx={{ width: 1 }}>
                                    <RHFTextField
                                        name="fullname"
                                        required
                                        label="Full Name"
                                        id="fullname"
                                    />
                                    <RHFTextField
                                        name="shortname"
                                        required
                                        label="Short Name"
                                        id="shortname"
                                    />
                                    <RHFTextField
                                        name="description"
                                        label="Description"
                                        id="description"
                                    />

                                        <div style={{ display: 'flex'}}>
                                            <span style={{ fontSize: '0.875rem', fontWeight: 400, width: '200px' }}>Ngày bắt đầu</span>
                                            <Controller
                                                control={control}
                                                name="startDate"
                                                
                                                render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
                                                    
                                                    <DatePicker
                                                        {...field}
                                                        label="Ngày bắt đầu"
                                                        value={selectedDate || null}
                                                        onChange={handleDateChange}
                                                        renderInput={(inputProps) => (
                                                            <TextField
                                                                {...inputProps}
                                                                onBlur={onBlur}
                                                                name={startDate}
                                                                error={!!fieldState.error}
                                                                helperText={fieldState.error?.message}
                                                                fullWidth
                                                            />
                                                        )}
                                                    />
                                                )}
                                            />
                                        </div>

                                        <div style={{ display: 'flex'}}>
                                            <span style={{ fontSize: '0.875rem', fontWeight: 400, width: '200px' }}>Ngày kết thúc</span>
                                            <Controller
                                                control={control}
                                                name="endDate"
                                                render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
                                                    <DatePicker
                                                        {...field}
                                                        label="Ngày kết thúc"
                                                        renderInput={(inputProps) => (
                                                            <TextField
                                                                {...inputProps}
                                                                onBlur={onBlur}
                                                                name={endDate}
                                                                // error={!!fieldState.error}
                                                                helperText={fieldState.error?.message}
                                                                fullWidth
                                                            />
                                                        )}
                                                    />
                                                )}
                                            />
                                        </div>
                                </Stack>

                                <Button
                                    size="small"
                                    color="error"
                                    onClick={() => {
                                        reset(defaultValues);
                                    }}
                                    //startIcon={<Iconify icon="eva:trash-2-outline" />}
                                >
                                    xóa
                                </Button>
                            </Stack>
                        </Stack>
                        <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

                        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                {!isEdit ? 'Create New' : 'Update'}
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>


            </FormProvider>
        </Container>
      );
};

Form.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

