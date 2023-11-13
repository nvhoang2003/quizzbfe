import {
  Typography,
  Stack,
  Box,
  Container,
  Button,
  SvgIcon,
} from "@mui/material";
import { getResponseByID } from "@/dataProvider/quizResponseApi";
import { DetailResponse } from "@/sections/@dashboard/detail/quizresponse/DetailResponse";
import { ArrowBack } from "@mui/icons-material";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Detail = (props) => {
  const router = useRouter();

  const {
    query: { accessId },
  } = router;

  const [data, setData] = useState({});

  const switchToHomePage = () => {
    router.push({
      pathname: `/home/client/course/[id]`,
      query: { id: 5 },
    });
  };

  async function fetchQuizResponseById(accessId) {
    const response = await getResponseByID(accessId);

    if (response.status < 400) {
      const quizResponse = response?.data?.data;
      quizResponse.isPublic = !!quizResponse.isPublic;

      setData(quizResponse);
    } else {
      return response;
    }
  }

  useEffect(() => {
    if (accessId) {
      fetchQuizResponseById(accessId);
    }
  }, [accessId]);

  return (
    <>
      <Head>
        <title>Chi tiết đề thi</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              display="flex"
              flexWrap="wrap"
              direction="row"
              sx={{
                px: 1,
              }}
            >
              <Stack spacing={1} mr={1}>
                <Typography variant="h4">
                  <Box sx={{ textTransform: "uppercase" }}>Chi tiết đề thi</Box>
                </Typography>
              </Stack>
              <Stack
                sx={{
                  ml: "auto",
                }}
              >
                <Button
                  color="inherit"
                  startIcon={
                    <SvgIcon fontSize="small">
                      <ArrowBack />
                    </SvgIcon>
                  }
                  variant="text"
                  onClick={switchToHomePage}
                >
                  Trở lại
                </Button>
              </Stack>
            </Stack>

            <DetailResponse data={data} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Detail.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Detail;
