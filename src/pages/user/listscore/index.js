import React from 'react';
import { Layout as DashboardLayout } from '@/layouts/dashboard/layout';
import Head from 'next/head';
import { Box, Stack, Container } from '@mui/material';

const list_score = () => {
  return (
    <>
      <Head>
        <title>
          DANH SÁCH KẾT QUẢ THI
        </title>
      </Head>
      <Box component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}>
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
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  )
};

list_score.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default list_score;
