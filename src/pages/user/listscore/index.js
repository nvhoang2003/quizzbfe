import React, { useState } from "react";
import { Layout as DashboardLayout } from "@/layouts/dashboard/layout";
import Head from "next/head";
import { Box, Stack, Container, Typography } from "@mui/material";
import ScoreTable from "@/sections/@dashboard/list/score/ScoreTable";
import SearchQuizResults from "@/components/search/SearchQuizResults";

const ListScore = (props) => {
  props.changeBreadCrumbsStatus(true);
  const [filter, setFilter] = useState({
    pageIndex: 1,
    pageSize: 10,
    quizId: null,
    courseId: null
  });

  const [listScore, setListScore] = useState([]);
  return (
    <>
      <Head>
        <title>Danh sách kết quả thi</title>
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
                    Danh sách kết quả thi
                  </Box>
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <SearchQuizResults filter={filter} setFilter={setFilter} listScore={listScore} setListScore={setListScore} />
          <ScoreTable filter={filter} setFilter={setFilter} listScore={listScore} setListScore={setListScore} />
        </Container>
      </Box>
    </>
  );
};

ListScore.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ListScore;
