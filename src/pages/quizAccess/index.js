import React, { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Icon,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useRouter } from "next/navigation";
import SearchQuizzAccess from "@/components/search/searchQuizAccess";
import QuizAccessTable from "@/sections/@dashboard/list/quizAccess/QuizAccessTable";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import FormProvider from "@/components/form/FormProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import RHFTextField from "@/components/form/RHFTextField";
import RHFSelect from "@/components/form/RHFSelect";
import _ from "lodash";
import { LoadingButton } from "@mui/lab";
import { getAllCourse } from "@/dataProvider/courseApi";
import ConfirmDialog from "@/components/confirm-dialog/ConfirmDialog";
import ConfirmDialogQuizAccess from "@/components/confirm-dialog/ConfirmDialogQuizAccess";
//----------------------------------------------------------------------------------------------



const QuestionAccessList = (props) => {
  const router = useRouter();
  const [listQuiz, setListQuiz] = useState([]);
  const [filter, setFilter] = useState({
    pageIndex: 1,
    pageSize: 10,
  });
  const [selectItem, setSelectItem] = useState([]);

  const [isOpen, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState();


  const handleOpenClick = () => {
    setOpen(true);
    setIsEdit(false);
  };

  const handleClose = () => {
    setOpen(false);
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
        <title>Danh sách QuestionAccess</title>
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
                    Danh sách QuestionAccess
                  </Box>
                </Typography>
              </Stack>
              <Stack
                sx={{
                  ml: "auto",
                }}
                direction={{ sm: 'row' }}
                spacing={{ sm: 1, md: 2 }}
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
                  onClick={handleOpenClick}
                >
                  Tạo mới QuizAccess
                </Button>
                <ConfirmDialogQuizAccess
                  open={isOpen}
                  onClose={handleClose}
                  isEdit={isEdit}
                  title={"Tạo mới QuizAccess"}
                />
              </Stack>
            </Stack>
            <SearchQuizzAccess filter={filter} setListQuiz={setListQuiz} />
            <QuizAccessTable
              filter={filter}
              setFilter={setFilter}
              listQuiz={listQuiz}
              setListQuiz={setListQuiz}
              selectItem={selectItem}
              setSelectItem={setSelectItem}
            />

          </Stack>
        </Container>
      </Box>
    </>
  );
};

QuestionAccessList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default QuestionAccessList;
