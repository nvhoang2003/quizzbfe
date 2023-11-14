import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Box, Container, Stack, Tab, Tabs, Typography } from "@mui/material";
import Head from "next/head";
import { getQuizById } from "@/dataProvider/quizApi";
import Topic from "../topic";
import ListStudentInQuiz from "../listStudentInQuiz";
import ListRankStudentInQuiz from "../listRankByCourse";

const QuizDetail = (props) => {
  const {
    query: { quizId },
  } = useRouter();
  const [value, setValue] = useState(0);
  const [editData, setEditData] = useState();
  const [listQuestion, setListQuestion] = useState([]);

  async function fetchQuizById(quizId) {
    const res = await getQuizById(quizId);
    console.log(res);
    if (res.status < 400) {
      const q = res.data.data;
      const transformData = {
        id: q.id,
        name: q.name,
        timeOpen: q.timeOpen,
        timeClose: q.timeClose,
        timeLimit: q.timeLimit,
        description: q.description,
        pointToPass: q.pointToPass,
        maxPoint: q.maxPoint,
        isPublic: q.isPublic,
        isValid: q.isValid,
        courseid: q.courseid
      };
      setListQuestion(q.listQuestion);

      setEditData(transformData);
      props.changeLastPath(transformData.name);
      props.changeBreadCrumbsStatus(true);
    } else {
      return res;
    }
  }

  useEffect(() => {
    if (quizId) {
      fetchQuizById(quizId);
    }
  }, [quizId]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 4, md: 6 }}
          >
            <Box sx={{ width: "100%", marginRight: "30px" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  sx={{ backgroundColor: "#d3d3d3" }}
                >
                  <Tab
                    label="Đề bài "
                    sx={{ px: 2 }}
                    style={{ margin: 0 }}
                  />
                  <Tab
                    label="Danh sách học sinh"
                    sx={{ px: 2 }}
                    style={{ margin: 0 }}
                  />
                  <Tab
                    label="Danh sách xếp hạng"
                    sx={{ px: 2 }}
                    style={{ margin: 0 }}
                  />
                </Tabs>
                {value === 0 && (
                  <Topic listQuiz={listQuestion}/>
                )}
                {value === 1 && (
                  <ListStudentInQuiz quizId = {quizId}/>
                )}
                {value === 2 && (
                 <ListRankStudentInQuiz quizId = {quizId}/>
                )}
              </Box>
            </Box>
          </Stack>
        </Container>

      </Box>
    </>
  );
};

QuizDetail.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default QuizDetail;
