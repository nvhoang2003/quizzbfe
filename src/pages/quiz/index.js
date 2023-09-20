import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useRouter } from "next/navigation";
import QuizTable from "@/sections/@dashboard/list/quiz/QuizTable";

const QuizList = (props) => {
  props.changeBreadCrumbsStatus(true);

  const router = useRouter();

  const [listQuiz, setListQuiz] = useState([]);
  const [filter, setFilter] = useState({
    pageIndex: 1,
    pageSize: 10,
  });

  const switchToAddPage = () => {
    router.push("quiz/new_form");
  };

  return (
    <>
      <Head>
        <title>Danh sách đề thi</title>
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
                    Danh sách đề thi
                  </Box>
                </Typography>
              </Stack>
              <Stack>
                <Button
                  color="primary"
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={switchToAddPage}
                >
                  Tạo đề
                </Button>
              </Stack>
            </Stack>
            
            <QuizTable filter={filter} setFilter={setFilter} listQuiz={listQuiz} setListQuiz={setListQuiz} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

QuizList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default QuizList;
