import React from 'react';
import Head from 'next/head';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

import { useRouter } from 'next/navigation';
import QuestionBankTable from './questionbank_table';

const Page = () => {
  const router = useRouter();
  const handleAddClick = () => {
    router.push('questionbank/new');
  };
  return (
    <>
      <Head>
        <title>
          QuestionBank
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
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Question Bank
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >

                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={handleAddClick}
                >
                  Add
                </Button>
              </div>
            </Stack>
            <QuestionBankTable />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
