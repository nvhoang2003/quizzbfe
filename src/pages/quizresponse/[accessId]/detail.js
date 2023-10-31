const { Typography, Stack, Box, Container } = require("@mui/material");
import { DetailResponse } from "@/sections/@dashboard/detail/quizresponse/DetailResponse";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Detail = (props) => {
  const {
    query: { accessId },
  } = useRouter();

  const [data, setData] = useState({
    userDoQuizz: {
      id: 2,
      userName: "string",
      fullName: "No Name",
      firstname: "No",
      lastname: "Name",
      dob: "2023-07-19T08:00:10",
      address: "string",
      phone: "0123456789",
      roleId: 1,
      isDeleted: 0,
      gender: 0,
      email: "user@example.com",
    },
    course: {
      id: 5,
      createBy: null,
      updateBy: null,
      createDate: null,
      updateDate: null,
      isDeleted: 0,
      fullName: "Lop hoc demo",
      shortName: "DemoClass",
      startDate: "2023-08-12T17:00:00",
      endDate: "2026-08-12T17:00:00",
      description: "Demo cho khach hang test quiz",
    },
    quiz: {
      id: 5,
      isValid: false,
      createDate: null,
      updateDate: "2023-10-28T00:00:00",
      courseid: 5,
      name: "private quiz",
      description: null,
      timeOpen: "2023-09-27T09:13:59",
      timeClose: "2023-09-27T09:13:59",
      timeLimit: "45",
      overduehanding: " ",
      preferedBehavior: " ",
      pointToPass: 6,
      maxPoint: 10,
      naveMethod: " ",
      isPublic: 0,
    },
    quizzAccess: {
      id: 13,
      status: "Wait",
      quiz: {
        id: 5,
        isValid: false,
        createDate: null,
        updateDate: "2023-10-28T00:00:00",
        courseid: 5,
        name: "private quiz",
        description: null,
        timeOpen: "2023-09-27T09:13:59",
        timeClose: "2023-09-27T09:13:59",
        timeLimit: "45",
        overduehanding: " ",
        preferedBehavior: " ",
        pointToPass: 6,
        maxPoint: 10,
        naveMethod: " ",
        isPublic: 0,
      },
      createDate: "2023-10-17T00:00:00",
      updateDate: "2023-10-31T00:00:00",
      userId: 2,
      quizId: 5,
      timeStartQuiz: null,
    },
    totalPoint: 3.333333,
    status: "Failed",
    questionReults: [
      {
        question: {
          id: 132,
          name: "Số ?",
          content: "4m 4dm = ...... dm",
          questionsType: "ShortAnswer",
          generalFeedback: "4m 4dm = 40 dm + 4 dm = 44 dm",
          authorId: 4,
          isShuffle: 1,
          defaultMark: 1,
          createBy: 4,
          matchSubQuestions: [],
          questionAnswers: [
            {
              id: 183,
              questionId: 132,
              content: "44",
              fraction: 1,
              feedback: null,
              systemFile: null,
              imageUrl: null,
            },
          ],
          systemFile: null,
          imageUrl: null,
        },
        mark: 1,
        status: "Right",
        idAnswerChoosen: null,
        shortAnswerChoosen: "44",
        matchSubQuestionChoosen: null,
      },
      {
        question: {
          id: 226,
          name: "Nối để có những câu trả lời đúng",
          content: "Hãy nối những câu hỏi với câu trả lời sao cho đúng.",
          questionsType: "Match",
          generalFeedback: "cũng không có gì",
          authorId: 2,
          isShuffle: 1,
          defaultMark: 1,
          createBy: 2,
          matchSubQuestions: [
            {
              id: 74,
              questionId: 226,
              questionText: "Chí Phèo ",
              answerText: "Nam Cao",
              systemFile: null,
              imageUrl: null,
            },
            {
              id: 75,
              questionId: 226,
              questionText: "Tây Tiến ",
              answerText: "Quang Dũng",
              systemFile: null,
              imageUrl: null,
            },
            {
              id: 76,
              questionId: 226,
              questionText: "Đồng Chí ",
              answerText: "Chính Hữu",
              systemFile: null,
              imageUrl: null,
            },
            {
              id: 77,
              questionId: 226,
              questionText: null,
              answerText: "Nguyễn Trãi",
              systemFile: null,
              imageUrl: null,
            },
            {
              id: 78,
              questionId: 226,
              questionText: null,
              answerText: "Trần Quốc Tuấn ",
              systemFile: null,
              imageUrl: null,
            },
          ],
          mark: 0.333333,
          status: "Wrong",
          questionAnswers: [],
          systemFile: null,
          imageUrl: null,
        },
        idAnswerChoosen: null,
        shortAnswerChoosen: null,
        matchSubQuestionChoosen: [
          {
            answerText: "Nam Cao",
            questionText: "Chí Phèo",
          },
        ],
      },
      {
        question: {
          id: 235,
          name: "Chọn đáp án đúng",
          content: "Quan sát hình vẽ. Góc đối đỉnh với góc xEm  là:",
          questionsType: "MultiChoice",
          generalFeedback:
            "Hai góc đối đỉnh là hai góc mà mỗi cạnh của góc này là tia đối của một cạnh của góc kia.",
          authorId: 2,
          isShuffle: 1,
          defaultMark: 1,
          createBy: 2,
          matchSubQuestions: [],
          questionAnswers: [
            {
              id: 362,
              questionId: 235,
              content: "mEy",
              fraction: 0,
              feedback: null,
              systemFile: null,
              imageUrl: null,
            },
            {
              id: 363,
              questionId: 235,
              content: "mEx",
              fraction: 0,
              feedback: null,
              systemFile: null,
              imageUrl: null,
            },
            {
              id: 364,
              questionId: 235,
              content: "nEy",
              fraction: 1,
              feedback: null,
              systemFile: null,
              imageUrl: null,
            },
            {
              id: 365,
              questionId: 235,
              content: "mEx và nEy",
              fraction: 0,
              feedback: null,
              systemFile: null,
              imageUrl: null,
            },
          ],
          systemFile: {
            id: 18,
            nameFile: "738f0008-62ec-4383-939d-15fca77f44a9_hinhhoc.png",
          },
          imageUrl:
            "http://103.161.178.66:8098/Images/738f0008-62ec-4383-939d-15fca77f44a9_hinhhoc.png",
        },
        mark: 1,
        status: "Right",
        idAnswerChoosen: [364],
        shortAnswerChoosen: null,
        matchSubQuestionChoosen: null,
      },
      {
        question: {
          id: 247,
          name: "Demo True False Question",
          content: "Chọn đúng hoặc sai cho phép tính sau:",
          questionsType: "TrueFalse",
          generalFeedback: "Đáp án của phép tính là 14/15",
          authorId: 2,
          isShuffle: 1,
          defaultMark: 1,
          createBy: 2,
          matchSubQuestions: [],
          questionAnswers: [
            {
              id: 383,
              questionId: 247,
              content: "Đúng",
              fraction: 0,
              feedback: null,
              systemFile: null,
              imageUrl: null,
            },
            {
              id: 384,
              questionId: 247,
              content: "Sai",
              fraction: 1,
              feedback: null,
              systemFile: null,
              imageUrl: null,
            },
          ],
          systemFile: {
            id: 33,
            nameFile: "f13f40f6-540d-4a0a-8633-efcaff90d54a_congphanso.png",
          },
          imageUrl:
            "http://103.161.178.66:8098/Images/f13f40f6-540d-4a0a-8633-efcaff90d54a_congphanso.png",
        },
        mark: 1,
        status: "Right",
        idAnswerChoosen: [384],
        shortAnswerChoosen: null,
        matchSubQuestionChoosen: null,
      },
    ],
  });

  async function fetchQuizResponseById(accessId) {}

  useEffect(() => {
    if (accessId) {
      fetchQuizResponseById(accessId);
    }
  }, [accessId]);

  return (
    <>
      <Head>
        <title>Chi tiết đề thi</title>
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
                  <Box sx={{ textTransform: "uppercase" }}>Chi tiết đề thi</Box>
                </Typography>
              </Stack>
            </Stack>

            <DetailResponse data={data} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Detail.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Detail;
