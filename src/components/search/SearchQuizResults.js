import { useMemo, useState, useEffect, useCallback } from "react";
import FormProvider from "@/components/form/FormProvider";
import RHFTextField from "@/components/form/RHFTextField";
import {
  Container,
  Button,
  Card,
  Divider,
  Grid,
  Stack,
  Typography,
  TextField,
  SvgIcon,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import RHFSelect from "@/components/form/RHFSelect";
import _ from "lodash";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
import snackbarUtils from "@/utils/snackbar-utils";
import { getListResponseForPeopleDoQuiz } from "@/dataProvider/quizResponseApi";
import { getAllQuiz } from "@/dataProvider/quizApi";
import { getAllCourse } from "@/dataProvider/courseApi";
import { RotateLeft, Search } from "@mui/icons-material";
import { TablePaginationCustom } from "../table";

export default function SearchQuizResults({ handleSearchSubmit, ...prop }) {
  const { filter, setFilter, listScore, setListScore } = prop;

  const [pagingQuiz, setPagingQuiz] = useState({});
  const [filterQuiz, setFilterQuiz] = useState({
    pageIndex: 1,
    pageSize: 1000,
  });
  const [listQuiz, setListQuiz] = useState([]);

  const [pagingCourse, setPagingCourse] = useState({});
  const [filterCourse, setFilterCourse] = useState({
    pageIndex: 1,
    pageSize: 100,
  });
  const [listCourse, setListCourse] = useState([]);

  const defaultValues = useMemo(
    () => ({
      quizId: filter?.quizId || 0,
      courseId: filter?.courseId || 0,
    }),
    [filter]
  );
  const validationSchema = Yup.object().shape({});
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
    formState: { isValidating, isSubmitting },
  } = methods;
  const [reRender, setReRender] = useState([]);

  useEffect(() => {
    fetchListScoreForPepleDoQuiz();
  }, []);

  const fetchListScoreForPepleDoQuiz = async (filter) => {
    const res = await getListResponseForPeopleDoQuiz(filter);

    if (res.status < 400) {
      setListScore(res.data.data);
    } else {
      console.log(res.message);
    }
  };

  useEffect(() => {
    fetchListQuiz();
  }, [filterQuiz]);

  const fetchListQuiz = async () => {
    const res = await getAllQuiz();

    if (res.status < 400) {
      setPagingQuiz(JSON.parse(res.headers["x-pagination"]));
      setListQuiz(res.data.data);
    } else {
      console.log(res.message);
    }
  };
  const handlePageQuizChange = useCallback(
    (event, pageIndex) => {
      setFilterQuiz({ ...filterQuiz, pageIndex: pageIndex });
    },
    [filterQuiz]
  );

  const handleRowsPerPageQuizChange = useCallback(
    (event) => {
      setFilterQuiz({ ...filterQuiz, pageSize: event.target.value });
    },
    [filterQuiz]
  );

  useEffect(() => {
    fetchListCourse();
  }, [filterCourse]);

  const fetchListCourse = async () => {
    const res = await getAllCourse();

    if (res.status < 400) {
      setPagingCourse(JSON.parse(res.headers["x-pagination"]));
      setListCourse(res.data.data);
    } else {
      console.log(res.message);
    }
  };
  const handlePageCourseChange = useCallback(
    (event, pageIndex) => {
      setFilterCourse({ ...filterCourse, pageIndex: pageIndex });
    },
    [filterCourse]
  );

  const handleRowsPerPageCourseChange = useCallback(
    (event) => {
      setFilterCourse({ ...filterCourse, pageSize: event.target.value });
    },
    [filterCourse]
  );

  const handlerSelectChange = useCallback(
    (event, index) => {
      setValue(event.target.name, event.target.value);
      setReRender({ [event.target.name]: event.target.value });
    },
    [defaultValues]
  );

  const onSubmit = async (data) => {
    await fetchListScoreForPepleDoQuiz(data);
  };

  const onReset = async () => {
    reset(defaultValues);
    await fetchListScoreForPepleDoQuiz(defaultValues);
  }

  return (
    <Stack sx={{ bgcolor: "#f2f4f7", py: 2, my: 2 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack
          display="flex"
          direction="column"
          sx={{
            px: 1,
            gap: 1,
          }}
        >
          <Stack
            display="flex"
            flexWrap="wrap"
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            sx={{
              gap: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "250px",
              }}
            >
              <RHFSelect
                label="Quiz"
                name="quizId"
                placeholder="Quiz"
                onChange={handlerSelectChange}
              >
                <option value="">---Quiz---</option>
                {!_.isEmpty(listQuiz) &&
                  listQuiz.map((option, index) => (
                    <option key={option.name} value={option.id}>
                      {option.name}
                    </option>
                  ))}
              </RHFSelect>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "250px",
              }}
            >
              <RHFSelect
                label="Course"
                name="courseId"
                placeholder="Course"
                onChange={handlerSelectChange}
              >
                <option value="">---Course---</option>
                {!_.isEmpty(listCourse) &&
                  listCourse.map((option, index) => (
                    <option key={index} value={option.id}>
                      {option.fullName}
                    </option>
                  ))}
              </RHFSelect>
            </div>
          </Stack>

          <Stack
            display="flex"
            flexWrap="wrap"
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            sx={{
              px: 3,
              gap: 1,
            }}
          >
            <Button
              size="small"
              color="primary"
              startIcon={
                <SvgIcon fontSize="small">
                  <Search />
                </SvgIcon>
              }
              type="submit"
              variant="contained"
              disabled={isValidating || isSubmitting}
            >
              Tìm kiếm
            </Button>
            <Button
              size="small"
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
      </FormProvider>
    </Stack>
  );
}
