import { useMemo, useState,useEffect } from 'react'; 
import FormProvider from '@/components/form/FormProvider';
import RHFTextField from '@/components/form/RHFTextField';
import { Container, Button, Card, Divider, Grid, Stack, Typography,TextField } from '@mui/material'
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import {createCate, updateCateByID} from '@/dataProvider/categoryApi';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
//---------------------------------------------------

Form.propTypes = {
    isEdit: PropTypes.bool,
    currentLevel: PropTypes.object
  };
  



export default function Form({ isEdit = false, currentLevel }) {
const [newData, setNewData] = useState([]);
const { push } = useRouter();
const { enqueueSnackbar } = useSnackbar();

const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required('Tên Category không được trống'),
//   description: Yup.string().trim().required('Tên Category không được trống'),
});


const defaultValues = useMemo(
    () => ({
        name: currentLevel?.name || '',
        description: currentLevel?.description || '',
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
        const res = await createCate({
          name : data.name,
          description: data.description
        });
        if (res.status < 400) {
            enqueueSnackbar(res.data.message , {variant: 'success'});
            push('/category');
        } else {
            enqueueSnackbar(res.res.data.title , { variant: 'error' });
        }
    } catch (error) {
        enqueueSnackbar(error, { variant: 'error' });
    }
};

async function fetchUpdateCateByID(data){
    try {
      const res = await updateCateByID(currentLevel.id, {
        name : data.name,
        description: data.description
      });
      if (res.status < 400) {
        push('/category');
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
        fetchUpdateCateByID(data);
    }
  };

      return (
        <Container maxWidth='100%'>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12} >
                    <Card sx={{ p: 5 }}>
                        <Typography variant="h4" sx={{ color: 'text.disabled', mb: 3 }}>
                        {!isEdit ? 'Tạo mới' : 'Cập nhật'}
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

