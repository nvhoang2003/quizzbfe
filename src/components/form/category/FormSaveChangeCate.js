// import { TextField, Button, FormControl } from '@mui/material';
import RHFTextField from '../RHFTextField';
import { FormProvider } from 'react-hook-form';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Divider, Grid, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { createCate } from '@/dataProvider/categoryApi';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';


FormSaveChange.propTypes = {
  isEdit: PropTypes.bool,
  currentLevel: PropTypes.object,
};


export default function FormSaveChange({ isEdit = false, currentCus }) {
//   const validationSchema = Yup.object().shape({
//     name: Yup.string().trim().required('Tên Category không được trống'),
//     description: Yup.string().trim().required('Tên Category không được trống'),
//     });

// const defaultValues = useMemo(
//   () => ({
//     name: currentCus?.name || '',
//     description: currentCus?.description || '',
//   }),
//   [currentCus]
// );

// const methods = useForm({
//     resolver: yupResolver(validationSchema),
//     defaultValues,
//   });

  const { enqueueSnackbar } = useSnackbar(); 

  const {
    reset,
    // watch,
    // control,
    // setValue,
    handleSubmit,
    formState: { isSubmitting },
} = methods;

// useEffect(() => {
    
// //   if (isEdit && currentCus) {
// //       reset(defaultValues);
// //   }
// //   if (!isEdit) {
//       reset(defaultValues);
// //   }
// }, [currentCus]);


const onSubmit = async (data) => {
    try {
        const res = await createCate(data)
        if (res.status < 400) {
            reset();
            enqueueSnackbar('Thêm mới thành công');
            push('/category');
        } else {
            enqueueSnackbar('Đã có lỗi xảy ra', { variant: 'error' });
        }
    } catch (error) {
        enqueueSnackbar('Đã có lỗi xảy ra', { variant: 'error' });
    }
};

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Gọi hàm onSubmit và truyền giá trị của form
  //   onSubmit();
  // };

  return (

    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        
    <Grid container spacing={3}>
        <Grid item xs={12} >
            <Card sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
                    NewCate
                </Typography>
                <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
                    <Stack alignItems="flex-end" spacing={1.5}>
                        <Stack spacing={2} sx={{ width: 1 }}>
                            <RHFTextField
                                name="name"
                                required
                                label="Category Name"
                                id="name"
                            />
                            <RHFTextField
                                name="description"
                                label="Description"
                                id="description"
                            />
                        </Stack>
                        <Button
                            size="small"
                            color="error"
                            onClick={() => {
                                reset(defaultValues);
                            }}
                            //startIcon={<Iconify icon="eva:trash-2-outline" />}
                        >
                            Xóa
                        </Button>
                    </Stack>
                </Stack>
                <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

                <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                        {!isEdit ? 'Tạo mới' : 'Cập nhật'}
                    </LoadingButton>
                </Stack>
            </Card>
        </Grid>
    </Grid>
</FormProvider>
  );
};
