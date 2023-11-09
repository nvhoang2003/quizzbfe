import { useMemo, useState, useEffect } from 'react';
import FormProvider from '@/components/form/FormProvider';
import RHFTextField from '@/components/form/RHFTextField';
import { Container, Button, Card, Divider, Grid, Stack, Typography, TextField, SvgIcon } from '@mui/material'
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/navigation';
import RHFSelect from '@/components/form/RHFSelect';
import _ from 'lodash';
import { Icon } from '@iconify/react';
import snackbarUtils from '@/utils/snackbar-utils';
import { RotateLeft } from "@mui/icons-material";
import { getAllCourse } from '@/dataProvider/courseApi';
import { getAll } from '@/dataProvider/quizAccess';
//--------------------------------------------------

const SearchQuizzAccess = ({ handleSearchSubmit, ...prop }) => {
  const { setListQuiz, filter } = prop;
  const { push } = useRouter();
  const router = useRouter();
  const [courseId, setCourseId] = useState(0);
  const [course, setCourse] = useState([]);
  const [reRender, setReRender] = useState([]);

  const validationSchema = Yup.object().shape({
  });
  const [status, setStatus] = useState(['Wait', 'Doing', 'Done']);
  const [isPublic, setIsPublic] = useState(
    [
      { id: true, name: 'Đề ôn luyện' },
      { id: false, name: 'Đề kiểm tra' }
    ]);


  const defaultValues = useMemo(
    () => ({
      courseId: '',
      student: '',
      status: ''
    }),
    [filter]
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

  const handlerCourseChange = (event, index) => {
    setCourseId(parseInt(event.target.value));
    setValue(event.target.name, event.target.value);
    setReRender({ [event.target.name]: event.target.value });
  };
  const handlerStatusChange = (event, index) => {
    // setStatus(parseInt(event.target.value));
    setValue(event.target.name, event.target.value);
    setReRender({ [event.target.name]: event.target.value });
  };

  async function fetchAllQuestionCourse() {
    const res = await getAllCourse();
    if (res.status < 400) {
      const transformData = res.data.data.map((type) => {
        return {
          name: type.fullName,
          id: type.id
        };
      });
      setCourse(transformData);
    } else {
      return res;
    }
  }
  useEffect(() => {
    fetchAllQuestionCourse()
  }, []);

  const fetchCourse = async (data) => {
    const d = {
      studentName: data?.student,
      status: data?.status,
      courseId: data?.courseId,
      isPublic: data?.isPublic
    }
    const res = await getAll(d);
    if (res.status < 400) {
      const quizResponse = res.data.data;
      setListQuiz(quizResponse);
    } else {
      return res;
    }
  };




  const onSubmit = async (data) => {
    try {
      fetchCourse(data);
    } catch (error) {
      snackbarUtils.error(error);
    }
  };
  const onReset = async () => {
    reset(defaultValues);
    fetchCourse(defaultValues);
  }

  return (
    <Container maxWidth='100%' sx={{ paddingTop: "20px" }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ p: 5 }}>
              <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
                <Stack alignItems="flex-end" spacing={1.5}>
                  <Stack direction="row" spacing={2} sx={{ width: 1 }}>
                    <RHFTextField
                      name="student"
                      label="Tên học sinh"
                      id="student"
                      sx={{ width: '200px' }}
                    />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '200px' }}>
                      <RHFSelect name="status" placeholder="Status" onChange={handlerStatusChange}>
                        <option value="">Status</option>
                        {!_.isEmpty(status) &&
                          status.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                      </RHFSelect>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '200px' }}>
                      <RHFSelect name="courseId" placeholder="Course" onChange={handlerCourseChange}>
                        <option value="">Course</option>
                        {!_.isEmpty(course) &&
                          course.map((option, index) => (
                            <option key={index} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                      </RHFSelect>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '200px' }}>
                      <RHFSelect name="isPublic" placeholder="Public" onChange={handlerCourseChange}>
                        {!_.isEmpty(isPublic) &&
                          isPublic.map((option, index) => (
                            <option key={index} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                      </RHFSelect>
                    </div>
                  </Stack>




                  <Stack alignItems="flex-end" sx={{ mt: 3 }} spacing={2} direction="row" justifyContent="flex-end">
                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}
                      startIcon={<Icon icon="ion:search" />}
                    >
                      Tìm kiếm
                    </LoadingButton>
                    <Button
                      color="error"
                      startIcon={
                        <SvgIcon fontSize="small">
                          <RotateLeft />
                        </SvgIcon>
                      }
                      variant="contained"
                      onClick={onReset}
                    >
                      Xóa
                    </Button>

                  </Stack>
                </Stack>
              </Stack >
              <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
};
export default SearchQuizzAccess;
