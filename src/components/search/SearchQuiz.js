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
import RHFSelect from "@/components/form/RHFSelect";
import _ from "lodash";
import { getListResponseForPeopleDoQuiz } from "@/dataProvider/quizResponseApi";
import { getAllQuiz } from "@/dataProvider/quizApi";
import { RotateLeft, Search } from "@mui/icons-material";
import { DateTimePicker } from "@mui/x-date-pickers";
import RHFSwitch from "../form/RHFSwitch";
import { Scrollbar } from "../scrollbar/scrollbar";
import RHFDatePicker from "../form/RHFDatePicker";
import RHFDateTimePicker from "../form/RHFDateTimePicker";
import snackbarUtils from "@/utils/snackbar-utils";

export default function SearchQuiz({ handleSearchSubmit, ...prop }) {
  const { filter, setListQuiz } = prop;

  const validationSchema = Yup.object().shape({});

  const defaultValues = useMemo(
    () => ({
      name: "",
      timeStart: null,
      timeEnd: null,
      isPublic: false,
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
    formState: { isValidating, isSubmitting },
  } = methods;

  const fetchListQuiz = async (data) => {
    const res = await getAllQuiz(data);

    if (res.status < 400) {
      setListQuiz(res.data.data);
    } else {
      snackbarUtils(res?.message);
    }
  };

  const onSubmit = async (data) => {
    await fetchListQuiz(data);
  };

  const onReset = async () => {
    reset(defaultValues);
    await fetchListQuiz(defaultValues);
  };

  return (
    <Stack sx={{ bgcolor: "#f2f4f7", p: 1, my: 2 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack
          display="flex"
          direction="row"
          flexWrap="wrap"
          sx={{
            px: 1,
            gap: 1,
          }}
        >
          <Stack overflow="unset" width={"100%"}>
            <Scrollbar>
              <Stack
                display="flex"
                direction="row"
                pb={2}
                sx={{
                  gap: 1,
                  my: "auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    minWidth: "250px",
                  }}
                >
                  <RHFTextField name="name" id="name" label="Tên Đề" />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    minWidth: "250px",
                  }}
                >
                  <RHFDateTimePicker
                    name="timeStart"
                    id="timeStart"
                    label="Giờ Mở Đề"
                    control={control}
                    sx={{
                      width: 1,
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    minWidth: "250px",
                  }}
                >
                  <RHFDateTimePicker
                    name="timeEnd"
                    id="timeEnd"
                    label="Giờ Đóng Đề"
                    control={control}
                    sx={{
                      width: 1,
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    minWidth: "150px",
                  }}
                >
                  <RHFSwitch
                    name="isPublic"
                    label={
                      <Typography sx={{ fontWeight: 500 }}>
                        Công khai
                      </Typography>
                    }
                    labelPlacement="start"
                    sx={{
                      mx: 1,
                      width: 1,
                      justifyContent: "start",
                    }}
                  />
                </div>
              </Stack>
            </Scrollbar>
          </Stack>
          <Stack
            display="flex"
            flexWrap="wrap"
            direction="row"
            sx={{
              px: 2,
              gap: 1,
              ml: "auto",
            }}
          >
            <LoadingButton
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
      </FormProvider>
    </Stack>
  );
}
