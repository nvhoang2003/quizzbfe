import React, { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs, { Dayjs } from "dayjs";
import { Scrollbar } from "@/components/scrollbar/scrollbar";
import RHFTextField from "@/components/form/RHFTextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
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
import {
  Close,
  DriveFileRenameOutline,
  KeyboardDoubleArrowRight,
  Save,
} from "@mui/icons-material";
import RHFNumberInput from "@/components/form/RHFNumberInput";
import RHFDateTimePicker from "@/components/form/RHFDateTimePicker";
import { postAddQuiz, putEditQuiz } from "@/dataProvider/quizApi";
import snackbarUtils from "@/utils/snackbar-utils";
import { enqueueSnackbar } from "notistack";

QuizForm.propTypes = {
  isEdit: PropTypes.bool,
  currentLevel: PropTypes.object,
};

export default function QuizForm({ isEdit = false, currentLevel }) {
  const router = useRouter();

  const switchToIndexPage = () => {
    router.push("/quiz");
  };

  const switchToAddQuestion = (id) => {
    router.push(`/quiz/${id}/add-question`);
  };

  const {
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required("Tên đề thi không được để trống"),
    timeOpen: Yup.date().required("Giờ mở đề không được để trống"),
    timeClose: Yup.date().required("Giờ đóng đề không được để trống"),
    timeLimit: Yup.number()
      .required("Giới hạn thời gian không được để trống")
      .min(0.1, "Giới hạn thời gian phải lớn hơn hoặc bằng 0,1"),
    description: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentLevel?.name || "",
      timeOpen: currentLevel?.timeOpen
        ? new Date(currentLevel?.timeOpen)
        : null,
      timeClose: currentLevel?.timeOpen
        ? new Date(currentLevel?.timeOpen)
        : null,
      timeLimit: currentLevel?.timeLimit || 0,
      description: currentLevel?.description || "",
      isPublic: currentLevel?.isPublic == 1 ? true : false,
    }),
    [currentLevel]
  );

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

  const convertToRequestData = (data) => {
    return {
      courseid: data.courseid ?? 5,
      name: data.name,
      description: data.description,
      timeOpen: data.timeOpen,
      timeClose: data.timeClose,
      timeLimit: data?.timeLimit?.toString(),
      naveMethod: "string",
      overduehanding: "string",
      preferedBehavior: "string",
      maxPoint: currentLevel?.maxPoint ?? 0,
      pointToPass: currentLevel?.pointToPass ?? 0,
      isPublic: data.isPublic ? 1 : 0,
    };
  };

  const fetchUpdate = async (data) => {
    const transformData = convertToRequestData(data);

    try {
      const res = await putEditQuiz(currentLevel?.id, transformData);
      
      if (res.status < 400 && res?.data?.status) {
        snackbarUtils.success(res?.data?.message || "Lưu Thành Công");
        switchToAddQuestion(res?.data?.data?.id);
      } else {
        const responseData = res?.response?.data;
        snackbarUtils.error(res?.data?.message || "Lưu Thất Bại");
        responseData?.errors &&
          Object.entries(responseData?.errors).forEach(
            ([fieldKey, errorMessage]) => {
              setError(fieldKey, {
                type: "manual",
                message: errorMessage,
              });
            }
          );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createNew = async (data) => {
    const transformData = convertToRequestData(data);

    try {
      const res = await postAddQuiz(transformData);

      if (res.status < 400) {
        snackbarUtils.success(res?.data?.message || "Lưu Thành Công");
        switchToAddQuestion(res?.data?.data?.id);
      } else {
        const responseData = res?.response?.data;
        snackbarUtils.error("Lưu Thất Bại");

        Object.entries(responseData?.errors).forEach(
          ([fieldKey, errorMessage]) => {
            setError(fieldKey, {
              type: "manual",
              message: errorMessage,
            });
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data) => {
    isEdit ? fetchUpdate(data) : createNew(data);
  };

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
          <Stack
            display="flex"
            flexWrap="wrap"
            direction="column"
            gap={2}
            pl={3}
          >
            <RHFTextField
              name="name"
              id="name"
              label="Tên đề thi"
              isError={errors.Name}
              errorMessage={errors.Name?.message}
            />
            <RHFDateTimePicker
              name="timeOpen"
              id="timeOpen"
              label="Giờ mở đề thi"
              control={control}
              sx={{
                width: "100%",
              }}
              isError={errors.TimeOpen}
              errorMessage={errors.TimeOpen?.message}
            />
            <RHFDateTimePicker
              name="timeClose"
              id="timeClose"
              label="Giờ đóng đề thi"
              control={control}
              sx={{
                width: "100%",
              }}
              isError={errors.TimeClose}
              errorMessage={errors.TimeClose?.message}
            />
            <RHFNumberInput
              name="timeLimit"
              id="timeLimit"
              label="Giới hạn thời gian (phút)"
              inputProps={{
                step: "0.1",
                min: 0,
              }}
              isError={errors.timeLimit}
              errorMessage={errors.timeLimit?.message}
            />
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
            <RHFTextField
              name="description"
              id="description"
              label="Mô tả"
              isError={errors.Description}
              errorMessage={errors.Description?.message}
            />
          </Stack>
        </Stack>
        <Stack
          display="flex"
          flexWrap="wrap"
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          sx={{
            px: 2,
            pt: 2,
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
                <Save />
              </SvgIcon>
            }
            variant="contained"
            type="submit"
            loading={isValidating || isSubmitting}
            onClick={() => clearErrors()}
          >
            Lưu
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Stack>
  );
}
