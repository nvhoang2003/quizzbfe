import React, { useCallback, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
  colors,
} from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import { useSnackbar } from "notistack";
import { axiosError } from "src/dataProvider/baseApi";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const [message, setMessage] = useState("");
  const [method, setMethod] = useState("login");
  const { enqueueSnackbar } = useSnackbar();
  const searchParams = useSearchParams();
  const continueUrl = searchParams.get("continueUrl");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      submit: null,
    },
    validationSchema: Yup.object({
      username: Yup.string().max(255).required("Tên tài khoản chưa được nhập"),
      password: Yup.string().max(255).required("Mật khẩu chưa được nhập"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const response = await auth.signIn(values.username, values.password);
        console.log(response);
        if (response.status < 400) {
          if (continueUrl && continueUrl != null && continueUrl != "") {
            router.push(continueUrl);
          } else {
            router.push("/home/client");
          }
        } else {
          setMessage(response.response?.data?.title);
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMethodChange = useCallback((event, value) => {
    setMethod(value);
  }, []);

  const handleSkip = useCallback(() => {
    auth.skip();
    router.push("/");
  }, [auth, router]);

  return (
    <>
      <Head>
        <title>Đăng nhập</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Đăng Nhập</Typography>
              <Typography color="text.secondary" variant="body2">
                Chưa có tài khoản ?
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Đăng ký
                </Link>
              </Typography>
            </Stack>
            <Tabs onChange={handleMethodChange} sx={{ mb: 3 }} value={method}>
              <Tab label="Login" value="login" />
            </Tabs>

            {message && message != null && message != "" && (
              <Stack spacing={1} sx={{ mb: 3 }}>
                <Alert
                  severity="error"
                  sx={{
                    bgcolor: "#fdeded",
                    color: "#5f2120",
                  }}
                >
                  {message}
                </Alert>
              </Stack>
            )}

            {method === "login" && (
              <form noValidate onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    error={
                      !!(formik.touched.username && formik.errors.username)
                    }
                    fullWidth
                    helperText={
                      formik.touched.username && formik.errors.username
                    }
                    label="Tên tài khoản"
                    name="username"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.username}
                  />
                  <TextField
                    error={
                      !!(formik.touched.password && formik.errors.password)
                    }
                    fullWidth
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    label="Mật khẩu"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip
                            title={showPassword ? "Đang ẩn" : "Đang hiện"}
                            placement="right"
                            arrow
                          >
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                    value={formik.values.password}
                  />
                </Stack>
                {formik.errors.submit && (
                  <Typography color="error" sx={{ mt: 3 }} variant="body2">
                    {formik.errors.submit}
                  </Typography>
                )}
                <LoadingButton
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                  loadingIndicator="Đang đăng nhập..."
                  loading={formik.isValidating || formik.isSubmitting}
                >
                  Đăng nhập
                </LoadingButton>
              </form>
            )}
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default Page;
