import { Box, Container, Grid, Stack } from "@mui/material";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import OverviewCourse from "../overview/overview-course";
import { getAllCourse } from "@/dataProvider/courseApi";

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
  }

  return (
    <>
      <Head>
        <title>
          Overview
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 2, sm: 4, md: 6 }}
          >
            {
              list.map((list, index) => {
                return (
                  <React.Fragment key={index}>
                    <OverviewCourse
                      products={list}
                      sx={{ height: '100%' }}
                    />
                  </React.Fragment>
                );
              })
            }

          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Course;