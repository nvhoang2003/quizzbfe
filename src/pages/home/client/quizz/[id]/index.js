import { Box, Container, Grid, Stack } from "@mui/material";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import OverviewQuizz from "../../overview/overview-quizz";
import { useRouter } from "next/router";
import { getAllQuiz } from "@/dataProvider/quizApi";
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { getAll } from "@/dataProvider/quizAccess";
import snackbarUtils from "@/utils/snackbar-utils";

//----------------------------------------------------------



const Quizz = (props) => {
  const {
    query: { id }
  } = useRouter();
  
  const [paging, setPaging] = useState();
  const [list, setList] = useState([]);

  const fetchQuiz = async (id) => {
    const res = await getAll(id);
    if (res.status < 400) {
      setList(res.data.data);
    } else {
      snackbarUtils(res?.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchQuiz(id);
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>
          Overview
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 2, sm: 4, md: 6 }}
          >
            <OverviewQuizz
              products={list}
              sx={{ height: '100%' }}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Quizz.getLayout = (page) => (
  <DashboardLayout showBreadCrumbs={false}>
    {page}
  </DashboardLayout>
);

export default Quizz;