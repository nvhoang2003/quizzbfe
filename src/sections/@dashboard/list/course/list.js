import { Box, Container, Grid, Stack } from "@mui/material";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import OverviewCourse from "@/sections/@dashboard/list/course/item";
import { getAllCourse } from "@/dataProvider/courseApi";
import snackbarUtils from "@/utils/snackbar-utils";

//----------------------------------------------------------

const List = (props) => {
  const [paging, setPaging] = useState();
  const [list, setList] = useState([]);

  const fetchQuiz = async () => {
    const res = await getAllCourse();
    if (res.status < 400) {
      setPaging(JSON.parse(res.headers["x-pagination"]));
      setList(res.data.data);
    } else {
      snackbarUtils.error(res.message);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);


  return (
    <>
      <Head>
        <title>Overview</title>
      </Head>
      {/* <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0
        }}
      > */}
       <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={3}
            >
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
      {/* </Box> */}
    </>
  );
};

export default List;
