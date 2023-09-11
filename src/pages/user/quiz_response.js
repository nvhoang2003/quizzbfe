import React from 'react';
import { Layout as DashboardLayout } from '@/layouts/dashboard/layout';
import Head from 'next/head';
import { Box } from '@mui/material';

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
        }}>list_score</Box>
    </>
  )
};

list_score.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default list_score;
