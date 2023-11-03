import { Box, Container, Grid, Stack } from "@mui/material";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import OverviewCourse from "../overview/overview-course";
import { getAllCourse } from "@/dataProvider/courseApi";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

//----------------------------------------------------------

const Course = (props) => {
  const [paging, setPaging] = useState();
  const [list, setList] = useState([]);

  const fetchQuiz = async () => {
    const res = await getAllCourse();
    if (res.status < 400) {
      setPaging(JSON.parse(res.headers["x-pagination"]));
      setList(res.data.data);
    } else {
      console.log(res.message);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);
  console.log(list);

  const handleShowQuiz = (item) => {
    console.log(item);
  };

  return (
    <>
      <Head>
        <title>Overview</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0
        }}
      >
        <Stack display="flex" flexWrap="wrap" pt="1.5rem">
          {list.map((course, index) => {
            return (
              <OverviewCourse
                key={index}
                product={course}
                sx={{ display: "flex", flexDirection: "column", height: "18.375rem", width: "18.75rem", mb: "1.5rem", mr: "1.5rem" }}
              />
            );
          })}
        </Stack>
      </Box>
    </>
  );
};

Course.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Course;
