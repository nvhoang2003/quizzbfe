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
import TagTable from "@/sections/@dashboard/list/tags/TagTable";

//----------------------------------------------------------------------------------------------



const List = (props) => {
  
  const router = useRouter();
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState({
    pageIndex: 1,
    pageSize: 10,
  });
  const [selectItem, setSelectItem] = useState([]);

  const switchToAddNew = () => {
    router.push("/tags/");
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
        <title>Danh sách danh mục </title>
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
                    Danh sách danh mục 
                  </Box>
                </Typography>
              </Stack>
              <Stack
                sx={{
                  ml: "auto",
                }}
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
              >
                <Button
                  color="primary"
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  sx={{ width: "150px" }}
                  size="small"
                  variant="contained"
                  onClick={switchToAddNew}
                >
                  Tạo mới danh mục
                </Button>

              </Stack>
            </Stack>
            <TagTable
              filter={filter}
              setFilter={setFilter}
              list={list}
              setList={setList}
              selectItem={selectItem}
              setSelectItem={setSelectItem}
            />


          </Stack>
        </Container>
      </Box>
    </>
  );
};

List.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default List;
