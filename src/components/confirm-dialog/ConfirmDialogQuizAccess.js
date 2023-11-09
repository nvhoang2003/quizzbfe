import PropTypes from 'prop-types';
import { Dialog, Button, DialogTitle, DialogActions, DialogContent, Stack, Icon } from '@mui/material';
import FormProvider from '../form/FormProvider';
import { use, useEffect, useId, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getAllCourse } from '@/dataProvider/courseApi';
import snackbarUtils from '@/utils/snackbar-utils';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import RHFTextField from '../form/RHFTextField';
import RHFSelect from '../form/RHFSelect';
import { LoadingButton } from '@mui/lab';
import { getAllUser } from '@/dataProvider/userApi';
import { getAllQuiz } from '@/dataProvider/quizApi';
import { addQuizAccess, updStatusQuizAccess } from '@/dataProvider/quizAccess';
import { useRouter } from 'next/navigation';

// ----------------------------------------------------------------------

ConfirmDialogQuizAccess.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.node,
  action: PropTypes.node,
  onClose: PropTypes.func,
  isEdit: PropTypes.bool,
  content: PropTypes.object
};

export default function ConfirmDialogQuizAccess({ title, action, open, onClose, isEdit, content, ...other }) {
  const router = useRouter();
  const [courseId, setCourseId] = useState();
  const [quizId, setQuizId] = useState();
  const [userId, setUserId] = useState();
  const [course, setCourse] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [reRender, setReRender] = useState([]);
  const [status, setStatus] = useState(['Wait', 'Doing', 'Done']);
  const validationSchema = Yup.object().shape({
  });
  const [user, setUser] = useState([]);

  const defaultValues = useMemo(
    () => ({
      courseId: content?.courseId || "",
      userId: content?.userId || "",
      status: content?.status || "",
      quizId: content?.quizId || ""
    }),
    [content]
  );

  useEffect(() => {
    if (isEdit && content) {
      setCourseId(content?.courseId);
      setUserId(content?.userId);
      setQuizId(content?.quizId);
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, content]);


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
  const handlerStudentChange = (event, index) => {
    setUserId(parseInt(event.target.value));
    setValue(event.target.name, event.target.value);
    setReRender({ [event.target.name]: event.target.value });
  };
  const handlerQuizzChange = (event, index) => {
    setQuizId(parseInt(event.target.value));
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

  useEffect(() => {
    async function fetchAllUserByCourse(courseId) {
      const data = {
        courseId: courseId,
      }
      const res = await getAllUser(data);
      if (res.status < 400) {
        const transformData = res.data.data.map((cate) => {
          return {
            id: cate.id,
            name: cate.fullName,
          };
        });
        setUser(transformData);
      } else {
        return res;
      }
    }
    if (courseId) {
      fetchAllUserByCourse(courseId);
    } else {
      setUser([]);
    }
  }, [courseId]);
  useEffect(() => { }, [user]);

  useEffect(() => {
    async function fetchAllQuizByCourse(courseId) {
      const data = {
        isPublic: `false`,
        courseId: courseId,
      }
      const res = await getAllQuiz(data);
      if (res.status < 400) {
        const transformData = res.data.data;
        transformData.map((cate) => {
          return {
            id: cate.id,
            name: cate.name,
          };
        });
        setQuiz(transformData);
      } else {
        return res;
      }
    }
    if (courseId) {
      fetchAllQuizByCourse(courseId);
    } else {
      setQuiz([]);
    }
  }, [courseId]);
  useEffect(() => { }, [quiz]);

  async function createNew(data) {
    
    const transformData = {
      userId: data.userId,
      quizId: data.quizId,
      status: "Wait"
    }
    try {
      const res = await addQuizAccess(transformData);
      if (res?.data?.status === true) {
        snackbarUtils.success(res?.data?.message);
        onClose();
        router.push(`/quizAccess`);
        
      } else {
        snackbarUtils.error(res?.response?.data?.title);
      }
    } catch (error) {
      snackbarUtils.error(error);

    }

  }
  async function fetchUpdate(data) {
    const transformData = {
      userId: data.userId,
      quizId: data.quizId,
      status: data.status
    }
    try {
      const res = await updStatusQuizAccess(content?.id, transformData);
      if (res.data.status === true) {
        snackbarUtils.success(res.data.message);
        onClose();
        router.push(`/quizAccess`);
        
      } else {
        snackbarUtils.error(res.data.message);
      }
    } catch (error) {
      snackbarUtils.error(error);
    }
  }


  const onSubmit = async (data) => {
    if (!isEdit) {
      createNew(data);
    } else {
      fetchUpdate(data);
    }
  };


  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
      <DialogTitle textAlign='center' variant='h5' sx={{ pb: 2 }}>{title}</DialogTitle>
      <Stack
        justifyContent="center"
        alignItems="stretch"
        paddingTop='20px'
        paddingBottom='20px'
        paddingLeft='20px'
        paddingRight='20px'
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}  >
          <Stack
            spacing={3}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <RHFSelect name="userId" placeholder="Tên học sinh" onChange={handlerStudentChange} fullWidth>
                <option value="">Học sinh</option>
                {!_.isEmpty(user) &&
                  user?.map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.name}
                    </option>
                  ))}
              </RHFSelect>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <RHFSelect name="quizId" placeholder="Quizz" onChange={handlerQuizzChange} fullWidth>
                <option value="">Quizz</option>
                {!_.isEmpty(quiz) &&
                  quiz?.map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.name}
                    </option>
                  ))}
              </RHFSelect>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <RHFTextField
                name="status"
                label="Status"
                id="status"
                value={content ? content?.status : "Wait"}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>

          </Stack>
          <Stack alignItems="flex-end" sx={{ mt: 3 }} spacing={2} direction="row" justifyContent="flex-end">
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {!isEdit ? "Tạo Mới" : "Cập Nhật"}
            </LoadingButton>
            <Button variant="outlined" color="inherit" onClick={onClose} sx={{ border: 0.5 }}>
              Hủy bỏ
            </Button>
          </Stack>
        </FormProvider>
      </Stack>
    </Dialog>
  );
}
