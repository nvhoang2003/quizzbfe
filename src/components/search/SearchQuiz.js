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

export default function SearchQuiz({ handleSearchSubmit, ...prop }) {
  const { filter, setListQuiz } = prop;

  const [pagingCourse, setPagingCourse] = useState({});
  const [filterCourse, setFilterCourse] = useState({
    pageIndex: 1,
    pageSize: 100,
  });
  const [listCourse, setListCourse] = useState([]);

  const defaultValues = useMemo(
    () => ({
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
    fetchListQuiz();
  }, []);

  const fetchListQuiz = async () => {
    const res = await getAllQuiz(filter);

    if (res.status < 400) {
      setListQuiz(res.data.data);
    } else {
      console.log(res.message);
    }
  };

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
    await fetchListQuiz(data);
  };

  const onReset = async () => {
    reset(defaultValues);
    await fetchListQuiz(defaultValues);
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
