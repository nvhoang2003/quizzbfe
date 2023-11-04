import ListCourse from "@/sections/@dashboard/list/course/list";
import { Box, Container, Grid } from "@mui/material";
import Head from "next/head";
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

//----------------------------------------------------------
const HomePage = (props) => {

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
          <Grid
            xs={12}
            item
          >
            <ListCourse />
          </Grid>
        </Container>
      </Box>
    </>
  );
};

HomePage.getLayout = (page) => (
  <DashboardLayout showBreadCrumbs={false}>
    {page}
  </DashboardLayout>
);

export default HomePage;
