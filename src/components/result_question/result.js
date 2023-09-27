import { useMemo, useState, useEffect } from 'react';
import FormProvider from '@/components/form/FormProvider';
import RHFTextField from '@/components/form/RHFTextField';
import { Container, Button, Card, Divider, Grid, Stack, Typography, TextField } from '@mui/material'
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import PropTypes from 'prop-types';
import { ST } from 'next/dist/shared/lib/utils';
import { useRouter } from 'next/router';
//---------------------------------------------------

Result.propTypes = {
  // isEdit: PropTypes.bool,
  result_quiz: PropTypes.number,
};



//{ isEdit = false, currentLevel }
export default function Result({result_quiz ,status, id }) {
  
  const router = useRouter();
  const handleReStart = () =>{
    router.push(`/testquiz/` + id);
  }
  // const currentLevel = 1.3;
  // const [newData, setNewData] = useState([]);
  // const { push } = useRouter();
  // const { enqueueSnackbar } = useSnackbar();

  // const validationSchema = Yup.object().shape({
  //   name: Yup.string().trim().required('Tên Category không được trống'),
  //   //   description: Yup.string().trim().required('Tên Category không được trống'),
  // });


  // const defaultValues = useMemo(
  //   () => ({
  //     name: currentLevel?.name || '',
  //     description: currentLevel?.description || '',
  //   }),
  //   [currentLevel]
  // );




  // const methods = useForm({
  //   resolver: yupResolver(validationSchema),
  //   defaultValues,
  // });

  // const {
  //   reset,
  //   watch,
  //   control,
  //   setValue,
  //   handleSubmit,
  //   formState: { isSubmitting },
  // } = methods;

  // useEffect(() => {
  //   if (isEdit && currentLevel) {
  //     reset(defaultValues);
  //   }
  //   if (!isEdit) {
  //     reset(defaultValues);
  //   }
  // }, [isEdit, currentLevel]);


  // const onSubmit = async (data) => {
  //   if (!isEdit) {
  //   } else {
  //   }
  // };

  return (
    <Container maxWidth='100%'>
      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        <Grid item xs={10} >
          <Card sx={{ p: 5 }}>
            <Typography variant="h4" sx={{ color: '#2A2A2A', mb: 3, textAlign: 'center' }}>
              {status && status == "Pass" ? (
                " Chúc mừng bạn đã đạt được "
              ) : (
                "Bạn có thể thử lại một lần nữa"
              )}
            </Typography>
            <Typography variant="h6" sx={{ color: '#2A2A2A', mb: 3, textAlign: 'center' }}>
              Điểm của bạn là
            </Typography>
            <Typography variant="h4" sx={{ color: '#2A2A2A', mb: 3, textAlign: 'center' }}>
              {result_quiz}
            </Typography>
            <Stack alignItems={'center'} justifyContent={'center'} direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 2, sm: 3, md: 5 }}>
              <Button variant="outlined" onClick={handleReStart} size="medium">
                Thử làm lại
              </Button>
              <Button variant="outlined" href="#outlined-buttons" size="medium">
                Xem đáp án chi tiết
              </Button>
              <Button variant="outlined" href="#outlined-buttons" size="medium">
                Về trang chủ
              </Button>
            </Stack>
          </Card>


        </Grid>
      </Stack>

    </Container>
  );
};

Result.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

