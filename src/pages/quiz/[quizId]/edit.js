import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Close, KeyboardDoubleArrowRight } from "@mui/icons-material";
import Head from "next/head";
import QuizForm from "@/sections/@dashboard/form/quiz/QuizForm";

const QuizEdit = (props) => {
  const {
    query: { quizId },
  } = useRouter();

  const [editData, setEditData] = useState();

  async function fetchQuizById(quizId) {
    const res = await getQuestionBankByID(quizId);
    if (res.status < 400) {
      const q = res.data.data;
      const transformData = {
        id: q.id,
        name: q.name,
        timeOpen: q.generalfeedback,
        timeClose: q.content,
        timeLimit: q.defaultMark,
        description: q.categoryId,
        pointToPass: [],
        maxPoint: [],
        isPublic: q.isPublic,
        isValid: q.isValid,
        courseid: q.courseid,
        listQuestion: q.listQuestion
      };

      setEditData(transformData);
      props.changeLastPath(transformData.name);
    } else {
      return res;
    }
  }

  useEffect(() => {
    if (quizId) {
      fetchQuizById(quizId);
    }
  }, [quizId]);

  return (
    <>
      <Head>
        <title>Đề thi - Tạo đề</title>
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
                  <Box sx={{ textTransform: "uppercase" }}>Sửa đề thi</Box>
                </Typography>
              </Stack>
            </Stack>

            <QuizForm isEdit={true} currentLevel={editData} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

QuizEdit.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default QuizEdit;
