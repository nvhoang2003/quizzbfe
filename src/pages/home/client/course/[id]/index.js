import React, { useState, useEffect } from "react";
import ListPublicQuizForClient from "@/sections/@dashboard/list/list-quiz-for-client/ListPublicQuizForClient";
import ListPrivateQuizForClient from "@/sections/@dashboard/list/list-quiz-for-client/ListPrivateQuizForClient";
import { Tabs, Tab, Box, Stack, Container } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useRouter } from "next/router";
import { getAllQuiz } from "@/dataProvider/quizApi";
import { getListExamForStudent } from "@/dataProvider/quizAccess";
import Head from "next/head";
import snackbarUtils from "@/utils/snackbar-utils";

export default function Course() {
  const [value, setValue] = useState(0);
  const [listPublicQuiz, setListPublicQuiz] = useState([]);
  const [listPrivateQuiz, setListPrivateQuiz] = useState([]);

  const [paging, setPaging] = useState();

  const {
    query: { id },
  } = useRouter();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchPrivateQuiz = async (id) => {
    const data = {
      userDoQuizId: localStorage.getItem("userId"),
      courseId: id,
      status: "Wait",
    };
    const res = await getListExamForStudent(data);
    if (res.status < 400) {
      setListPrivateQuiz(res.data.data);
    } else {
      snackbarUtils(res?.message);
    }
  };

  const fetchPublicQuiz = async (id) => {
    const data = {
      isPublic: true,
      courseId: id,
    };
    const res = await getAllQuiz(data);
    if (res.status < 400) {
      setPaging(JSON.parse(res.headers["x-pagination"]));
      setListPublicQuiz(res.data.data);
    } else {
      snackbarUtils(res?.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPublicQuiz(id);
      fetchPrivateQuiz(id);
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>Thông tin khóa học</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
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
                    label="Bài Tập Ôn Luyện"
                    sx={{ px: 2 }}
                    style={{ margin: 0 }}
                  />
                  <Tab
                    label="Bài Kiểm Tra"
                    sx={{ px: 2 }}
                    style={{ margin: 0 }}
                  />
                </Tabs>
                {value === 0 && (
                  <ListPublicQuizForClient quizzes={listPublicQuiz} />
                )}
                {value === 1 && (
                  <ListPrivateQuizForClient quizzes={listPrivateQuiz} />
                )}
              </Box>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

Course.getLayout = (page) => (
  <DashboardLayout showBreadCrumbs={false}>{page}</DashboardLayout>
);
