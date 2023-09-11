import React, { useCallback } from "react";
import Head from "next/head";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useRouter } from "next/navigation";
import { Scrollbar } from "@/components/scrollbar/scrollbar";
import FormProvider from "@/components/form/FormProvider";
import { RotateLeft, Search } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import TableSearch from "@/components/table/searchTable";

const Page = (props) => {
  const router = useRouter();

  const formikSearch = useFormik({
    initialValues: {
      quizzName: "",
      timeOpen: "",
      timeClose: "",
      isPublic: 0,
      submit: null,
    },

    validationSchema: Yup.object({}),
    onSubmit: async (values, helpers) => {
      try {
        const response = await auth.signIn(values.username, values.password);

        if (response.status < 400) {
        } else {
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  const switchToAddPage = () => {
    router.push("quiz/new_form");
  };

  return (
    <>
      <Head>
        <title>Danh sách đề thi</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">
                  <Box sx={{ textTransform: "uppercase" }}>
                    Danh sách đề thi
                  </Box>
                </Typography>
              </Stack>
              <Stack>
                <Button
                  color="primary"
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={switchToAddPage}
                >
                  Tạo đề
                </Button>
              </Stack>
            </Stack>

            <TableSearch
              formikSearch={formikSearch}
              fields={
                <TextField
                  error={
                    !!(
                      formikSearch.touched.quizzName &&
                      formikSearch.errors.quizzName
                    )
                  }
                  helperText={
                    formikSearch.touched.quizzName &&
                    formikSearch.errors.quizzName
                  }
                  onBlur={formikSearch.handleBlur}
                  onChange={formikSearch.handleChange}
                  value={formikSearch.values.quizzName}
                  label="Tên Đề"
                  name="quizzName"
                />
              }
            ></TableSearch>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
