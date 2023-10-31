import { Box, Container, Grid, Stack } from "@mui/material";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import OverviewQuizz from "../../overview/overview-quizz";
import { useRouter } from "next/router";
import { getAllQuiz } from "@/dataProvider/quizApi";

//----------------------------------------------------------



const Quizz = (props) => {
  const {
    query: { id }
  } = useRouter()
  const [paging, setPaging] = useState();
  const [list, setList] = useState([]);
//api/Quizz/getListAllQuizz?courseId=5

  const fetchQuiz = async (id) => {
    const res = await getAllQuiz();
    console.log(res);
    if (res.status < 400) {
      setPaging(JSON.parse(res.headers["x-pagination"]));
      setList(res.data.data);
    } else {
      console.log(res.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchQuiz(id);
    }
  }, [id]);
  
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
            {/* {
              list.map((list, index) => {
                return ( */}
                  {/* <React.Fragment key={index}> */}
                    <OverviewQuizz
                      products={list}
                      sx={{ height: '100%' }}
                    />
                  {/* </React.Fragment> */}
                {/* );
              })
            } */}

          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Quizz;