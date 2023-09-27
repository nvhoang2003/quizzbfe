import React, { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import { Box, Button, Card, Container, Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useRouter } from 'next/router';
import Result from '@/components/result_question/result';
import { getResponseByID } from '@/dataProvider/quizResponseApi';
//--------------------------------------------------------------------
// OtherPage.propTypes = {
//   result_quiz: PropTypes.number,
// };

const OtherPage = () => {
  const {
    query: { id }
  } = useRouter();
  // const point = 6;
  const [point, setPoint] = useState();
  const [status, setStatus] = useState();

  async function fetchQuizResponseByID() {
    const res = await getResponseByID(id);
    if (res.status < 400) {
      const quizResponse = res.data.data;
      setPoint(quizResponse.totalPoint);
      setStatus(quizResponse.status);
    } else {
      return res;
    }
  };

  useEffect(() => {
    if (id) {
      fetchQuizResponseByID(id);
    }
  }, [id,point]);

  return (
    <>
      <Head>
        <title>
          Question
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Grid item xs={12}>
            <Card sx={{ p: 5 }}>
              <Result result_quiz={point} status={status} id={id}/>
            </Card>

          </Grid>


        </Container>
      </Box>
    </>
  );
};

OtherPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default OtherPage;
