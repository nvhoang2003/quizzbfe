import { DoQuizLayout } from '@/layouts/testquiz/DoQuizLayout';
import React from 'react'
import Countdown from 'react-countdown';
import Head from 'next/head';
import { Box, Stack, Container, Typography } from '@mui/material';

// Random component
const Completionist = () => <span>You are good to go!</span>;

const TestQuiz = (props) => {
  return (
    <>
      <Head>
        <title>Kiểm Tra</title>
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
              justifyContent="space-between"
              spacing={4}
              sx={{
                px: 1,
              }}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  <Box sx={{ textTransform: "uppercase" }}>
                    <Countdown date={Date.now() + 5000}>
                      <Completionist />
                    </Countdown>
                  </Box>
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>

    </>
  );
};


TestQuiz.getLayout = (page) =>
  <DoQuizLayout>
    {page}
  </DoQuizLayout>


export default TestQuiz;
