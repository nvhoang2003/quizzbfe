const { Typography, Stack, Box, Container } = require("@mui/material");
import { getResponseByID } from "@/dataProvider/quizResponseApi";
import { DetailResponse } from "@/sections/@dashboard/detail/quizresponse/DetailResponse";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Detail = (props) => {
  const {
    query: { accessId },
  } = useRouter();

  const [data, setData] = useState({});

  async function fetchQuizResponseById(accessId) {
    const response = await getResponseByID(accessId);

    if (response.status < 400) {
      const quizResponse = response?.data?.data;

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
