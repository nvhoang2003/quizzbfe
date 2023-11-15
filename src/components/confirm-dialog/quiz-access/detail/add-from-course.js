import PropTypes from "prop-types";
import {
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  Stack,
  Icon,
  Typography,
  Tooltip,
} from "@mui/material";
import FormProvider from "@/components/form/FormProvider";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { getAllCourse } from "@/dataProvider/courseApi";
import snackbarUtils from "@/utils/snackbar-utils";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import RHFSelect from "@/components/form/RHFSelect";
import { LoadingButton } from "@mui/lab";
import { addToCourse } from "@/dataProvider/quizAccess";
import { useRouter } from "next/navigation";
import { Done, HourglassTop, TimerOutlined } from "@mui/icons-material";

// ----------------------------------------------------------------------

AddFromCourse.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.node,
  action: PropTypes.node,
  onClose: PropTypes.func,
  content: PropTypes.object,
};

export default function AddFromCourse({
  title,
  action,
  open,
  onClose,
  content,
  ...other
}) {
  const router = useRouter();
  const [courseId, setCourseId] = useState();
  const [course, setCourse] = useState([]);
  const [reRender, setReRender] = useState([]);
  const [status, setStatus] = useState({
    wait: {
      name: "Wait",
      icon: <TimerOutlined color="warning"></TimerOutlined>,
    },
    doing: {
      name: "Doing",
      icon: <HourglassTop color="primary"></HourglassTop>,
    },
    done: { name: "Done", icon: <Done color="success"></Done> },
  });
  const validationSchema = Yup.object().shape({});

  const defaultValues = useMemo(
    () => ({
      courseId: content?.courseId || 0,
      status: content?.status || "",
    }),
    [content]
  );

  useEffect(() => {
    if (content) {
      setCourseId(content?.courseId);
      reset(defaultValues);
    }

    reset(defaultValues);
  }, [content]);

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

  async function fetchAllQuestionCourse() {
    const res = await getAllCourse();
    if (res.status < 400) {
      const transformData = res.data.data.map((type) => {
        return {
          name: type.fullName,
          id: type.id,
        };
      });
      setCourse(transformData);
    } else {
      return res;
    }
  }

  useEffect(() => {
    fetchAllQuestionCourse();
  }, []);

  const createNew = async (data) => {
    const transformData = {
      courseId: data.courseId,
      quizId: content?.quizId,
      timeStartQuiz: null,
      status: "Wait",
    };
    try {
      const res = await addToCourse(transformData);
      if (res?.data?.status === true) {
        snackbarUtils.success(res?.data?.message);
        onClose();
      } else {
        snackbarUtils.error(res?.response?.data?.title);
      }
    } catch (error) {
      snackbarUtils.error(error);
    }
  };

  const onSubmit = async (data) => {
    createNew(data);
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
      <DialogTitle
        textAlign="center"
        variant="h5"
        sx={{ pb: 2, whiteSpace: "nowrap" }}
      >
        {title}
      </DialogTitle>
      <Stack
        justifyContent="center"
        alignItems="stretch"
        paddingTop="20px"
        paddingBottom="20px"
        paddingLeft="20px"
        paddingRight="20px"
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <RHFSelect
                name="courseId"
                placeholder="Course"
                onChange={handlerCourseChange}
              >
                <option value="">Course</option>
                {!_.isEmpty(course) &&
                  course.map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.name}
                    </option>
                  ))}
              </RHFSelect>
            </div>

            <Stack
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap={1}
              px={1}
            >
              <Typography fontWeight={600}>Status: </Typography>
              <Tooltip title={status.wait.name}>{status.wait.icon}</Tooltip>
            </Stack>
          </Stack>
          <Stack
            alignItems="flex-end"
            sx={{ mt: 3 }}
            spacing={2}
            direction="row"
            justifyContent="flex-end"
          >
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Lưu
            </LoadingButton>
            <Button
              variant="outlined"
              color="inherit"
              onClick={onClose}
              sx={{ border: 0.5, whiteSpace: "nowrap" }}
            >
              Hủy bỏ
            </Button>
          </Stack>
        </FormProvider>
      </Stack>
    </Dialog>
  );
}
