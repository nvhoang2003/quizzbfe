import React, { useEffect, useState } from 'react';
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import YourRankingDetail from '@/sections/@dashboard/detail/ranking/YourRankingDetail';
import { getRanking } from '@/dataProvider/rankingApi';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Stack, Box, Container, Typography, Button, SvgIcon } from '@mui/material';
import snackbarUtils from '@/utils/snackbar-utils';
import ClientRankingTable from '@/sections/@dashboard/list/ranking/ClientRankingTable';
import { ArrowBack } from "@mui/icons-material";

export default function index() {
  const router = useRouter();

  const {
    query: { id }
  } = router;

  const [params, setParams] = useState({
    pageIndex: 1,
    pageSize: 10,
  });
  const [data, setData] = useState({});

  async function fetchRanking(id, params) {
    const res = await getRanking(id, params);
    if (res.status < 400) {
      setData(res.data.data);
    } else {
      snackbarUtils.error(res.data.message);
    }
  }

  useEffect(() => {
    if (id) {
      fetchRanking(id, params);
    }
  }, [id]);

  const switchToHomePage = () => {
    router.push({
      pathname: `/home/client/course/[id]`,
      query: { id: 5 },
    });
  }

  return (
    <>
      <Head>
        <title>Top 10</title>
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
            <Stack spacing={1} mr={1}>

              <Box className="center-item">
                <Typography variant="h4" sx={{ textTransform: "uppercase", textAlign: "center" }}>
                  Bảng Xếp Hạng Top 10 {data.quizName}
                </Typography>
              </Box>
            </Stack>

            <Stack
              display="flex"
              flexWrap="wrap"
              direction="row"
              sx={{
                px: 1,
              }}
              className="center-item"
            >
              {data.yourRank ? <YourRankingDetail data={data.yourRank} /> : <></>}
            </Stack>
            <Stack>
              <Box sx={{ minWidth: 345, my: 3 }} className='center-item'>
                <Typography variant="h6">
                  Xếp Hạng Học Sinh
                </Typography>
              </Box>

              <ClientRankingTable ranking={data.listRanking} />
            </Stack>
          </Stack>
          <Stack alignItems={'right-item '} justifyContent={'right-item '} direction={{ xs: 'column', sm: 'row'}}
            spacing={{ xs: 2, sm: 3, md: 5 }}
            sx={{my: 3}}
            className="right-item"  
          >
            <Button
               color="primary"
               startIcon={
                 <SvgIcon fontSize="small">
                   <ArrowBack />
                 </SvgIcon>
               }
               variant="contained"
               onClick={switchToHomePage}
            >
              Trở Lại
            </Button>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

index.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
