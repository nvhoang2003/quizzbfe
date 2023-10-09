import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Close, KeyboardDoubleArrowRight } from "@mui/icons-material";
import Head from "next/head";
import QuizForm from "@/sections/@dashboard/form/quiz/form";

const QuizCreate = (props) => {
  const showBreadCrumbs = (status) => {
    props.changeBreadCrumbsStatus(status);
  };
  useEffect(() => {
    showBreadCrumbs(true);
  }, []);

  return (
    <>
      <Head>
        <title>Đề thi - Tạo đề</title>
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
                  <Box sx={{ textTransform: "uppercase" }}>Tạo đề thi</Box>
                </Typography>
              </Stack>
            </Stack>

            <QuizForm />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

QuizCreate.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default QuizCreate;
