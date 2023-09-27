import React, { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs, { Dayjs } from "dayjs";
import { Scrollbar } from "@/components/scrollbar/scrollbar";
import RHFTextField from "@/components/form/RHFTextField";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import FormProvider from "@/components/form/FormProvider";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import RHFSwitch from "@/components/form/RHFSwitch";
import { Close, KeyboardDoubleArrowRight } from "@mui/icons-material";
import RHFNumberInput from "@/components/form/RHFNumberInput";
import RHFDateTimePicker from "@/components/form/RHFDateTimePicker";

QuizForm.propTypes = {
  isEdit: PropTypes.bool,
  currentLevel: PropTypes.object,
};

export default function QuizForm({ isEdit = false, currentLevel }) {
  const router = useRouter();

  const switchToIndexPage = () => {
    router.push("/quiz");
  };
  const switchToAddQuestionPage = () => {
    router.push("/quiz/add_question");
  };

  const defaultValues = useMemo(
    () => ({
      name: currentLevel?.name || "",
      timeOpen: null,
      timeClose: null,
      // timeOpen: currentLevel?.timeOpen ? dayjs(currentLevel.timeOpen) : null,
      // timeClose: currentLevel?.timeClose ? dayjs(currentLevel.timeClose) : null,
      timeLimit: currentLevel?.timeLimit || 0,
      pointToPass: currentLevel?.pointToPass || 0,
      isPublic: currentLevel?.isPublic == 1 ? true : false,
    }),
    [currentLevel]
  );

  const validationSchema = Yup.object().shape({
    quizName: Yup.string().trim().required("Tên đề thi không được để trống"),
    timeOpen: Yup.date().required("Giờ mở đề không được để trống"),
    timeClose: Yup.date().required("Giờ đóng đề không được để trống"),
    timeLimit: Yup.number()
      .required("Giới hạn thời gian không được để trống")
      .min(0.1, "Giới hạn thời gian phải lớn hơn hoặc bằng 0,1"),
    pointToPass: Yup.number()
      .required("Điểm đạt không được để trống")
      .min(0.1, "Điểm đạt phải lớn hơn hoặc bằng 0,1"),
  });

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    values: defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isValidating, isSubmitting },
  } = methods;

  const fetchUpdate = async (data) => {};

  const createNew = async (data) => {};

  const onSubmit = (async (data) => {
    console.log(data);
  });

  return (
    <Stack sx={{ px: 3, py: 2, minWidth: "270px" }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack
          display="flex"
          flexWrap="wrap"
          direction="column"
          justifyContent="space-between"
          spacing={4}
          sx={{
            px: 1,
          }}
        >
          <Stack>
            <Typography
              variant="subtitle1"
              fontWeight="700"
              sx={{ opacity: 0.7 }}
            >
              Thông tin đề thi
            </Typography>
          </Stack>
          <Container maxWidth="xl">
            <Stack display="flex" flexWrap="wrap" direction="column" gap={2}>
              <RHFTextField name="name" id="name" label="Tên đề thi" />
              <RHFDateTimePicker
                name="timeOpen"
                id="timeOpen"
                label="Giờ mở đề thi"
                sx={{
                  width: "100%",
                }}
              />
              <RHFDateTimePicker
                name="timeClose"
                id="timeClose"
                label="Giờ đóng đề thi"
                sx={{
                  width: "100%",
                }}
              />
              <RHFNumberInput
                name="timeLimit"
                id="timeLimit"
                label="Giới hạn thời gian (giờ)"
                inputProps={{
                  step: "0.1",
                  min: 0,
                }}
              />
              <Tooltip title="ex: 5đ" placement="top-start">
                <Stack width={1}>
                  <RHFNumberInput
                    name="pointToPass"
                    id="pointToPass"
                    label="Điểm đạt"
                    inputProps={{
                      step: "0.1",
                      min: 0,
                    }}
                  />
                </Stack>
              </Tooltip>
              <RHFSwitch
                name="isPublic"
                label={
                  <Typography sx={{ fontWeight: 500 }}>Công khai</Typography>
                }
                labelPlacement="start"
                sx={{
                  mx: 1,
                  width: 1,
                  justifyContent: "start",
                }}
                onClick={(event) => {
                  event.target.value = !event.target.value;
                }}
              />
            </Stack>
          </Container>
        </Stack>
        <Stack
          display="flex"
          flexWrap="wrap"
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          sx={{
            px: 2,
            gap: 1,
          }}
        >
          <Button
            color="inherit"
            startIcon={
              <SvgIcon>
                <Close />
              </SvgIcon>
            }
            onClick={() => {
              switchToIndexPage();
            }}
            variant="text"
          >
            Hủy
          </Button>
          <LoadingButton
            color="primary"
            startIcon={
              <SvgIcon>
                <KeyboardDoubleArrowRight />
              </SvgIcon>
            }
            variant="contained"
            type="submit"
            loading={isValidating || isSubmitting}
          >
            Tiếp tục
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Stack>
  );
}
