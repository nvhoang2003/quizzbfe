import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useRouter } from "next/navigation";
import SearchQuestionBank from "@/components/search/search_questionBank";
import { styled } from '@mui/material/styles';
import { addMultiQuestions } from "@/dataProvider/questionApi";
import { enqueueSnackbar } from "notistack";
import QuestionTable from "@/sections/@dashboard/list/question/tableQuestionTable";
import SearchQuestion from "@/components/search/search_question";

//----------------------------------------------------------------------------------------------



const QuestionList = (props) => {
  const router = useRouter();
  const [listQuiz, setListQuiz] = useState([]);
  const [filter, setFilter] = useState({
    pageIndex: 1,
    pageSize: 10,
  });
  const [selectItem, setSelectItem] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpenClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const showBreadCrumbs = (status) => {
    props.changeBreadCrumbsStatus(status);
  };
  useEffect(() => {
    showBreadCrumbs(true);
  }, []);

  return (
    <>
      <Head>
        <title>Danh sách câu hỏi</title>
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
                  <Box sx={{ textTransform: "uppercase" }}>
                    Danh sách câu hỏi
                  </Box>
                </Typography>
              </Stack>
            </Stack>
            <SearchQuestion filter={filter} setListQuiz={setListQuiz} />
            <QuestionTable
              filter={filter}
              setFilter={setFilter}
              listQuiz={listQuiz}
              setListQuiz={setListQuiz}
              selectItem={selectItem}
              setSelectItem={setSelectItem}
            />

          </Stack>
        </Container>
      </Box>
    </>
  );
};

QuestionList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default QuestionList;
