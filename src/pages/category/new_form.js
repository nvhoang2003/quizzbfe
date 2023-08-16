import { useMemo, useState } from 'react'; 
import FormProvider from '@/components/form/FormProvider';
import RHFTextField from '@/components/form/RHFTextField';
import { Container, Button, Card, Divider, Grid, Stack, Typography,TextField } from '@mui/material'
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import {createCate} from '@/dataProvider/categoryApi';
import { useRouter } from 'next/navigation';

//---------------------------------------------------
export default function NewForm() {
const [newData, setNewData] = useState([]);
const { enqueueSnackbar } = useSnackbar();
const router = useRouter();

  // const validationSchema = Yup.object().shape({
  //   name: Yup.string().trim().required('Tên Category không được trống'),
  //   description: Yup.string().trim().required('Description Category không được trống'),
  //   });

  //   const defaultValues = useMemo(
  //     () => ({
  //       name: currentCus?.name || '',
  //       description: currentCus?.description || '',
  //     }),
  //     [currentCus]
  //   );

  // const methods = useForm({
  //       resolver: yupResolver(validationSchema),
  //       defaultValues,
  //     });


//   const {
//     reset,
//     // watch,
//     control,
//     // setValue,
//     handleSubmit
//     // formState: { isSubmitting },
// } = methods;

const handleChange = (e) => {
  const { name, value } = e.target;
  setNewData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

async function createNew(){
    try {
      console.log(newData);
        const res = await createCate({
          name : newData.name,
          description: newData.description
        });

        // console.log(res.status);
        if (res.status < 400) {
          // console.log(res.status);
            enqueueSnackbar(res.data.message , {variant: 'success'});
            router.push('/category');
        } else {
            enqueueSnackbar(res.res.data.title , { variant: 'error' });
        }
    } catch (error) {
      console.log(error);
        enqueueSnackbar(error, { variant: 'error' });
    }
};

const handleSave = () => {
createNew();
 // window.location.reload();
};




      return (
        <Container maxWidth='100%'>
            {/* <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}> */}
            <Grid container spacing={3}>
                <Grid item xs={12} >
                    <Card sx={{ p: 5 }}>
                        <Typography variant="h4" sx={{ color: 'text.disabled', mb: 3 }}>
                            NewCate
                        </Typography>
                        <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
                            <Stack alignItems="flex-end" spacing={1.5}>
                                <Stack spacing={2} sx={{ width: 1 }}>
                                    <TextField
                                        name="name"
                                        required
                                        label="Category Name"
                                        id="name"
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        name="description"
                                        label="Description"
                                        id="description"
                                        onChange={handleChange}
                                    />
                                </Stack>
                                {/* <Button
                                    size="small"
                                    color="error"
                                    onClick={() => {
                                        reset(defaultValues);
                                    }}
                                    //startIcon={<Iconify icon="eva:trash-2-outline" />}
                                >
                                    Xóa
                                </Button> */}
                            </Stack>
                        </Stack>
                        <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

                        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                        <Button onClick={handleSave} variant="contained" color="primary">
                          New
                        </Button>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>


            {/* </FormProvider> */}
        </Container>
      );
};
NewForm.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
