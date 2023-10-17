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
import QuestionBankTable from "@/sections/@dashboard/list/questionbank/QuestionBankTable";
import SearchQuestionBank from "@/components/search/search_questionBank";
import { styled } from '@mui/material/styles';
import { addMultiQuestions } from "@/dataProvider/questionApi";
import { enqueueSnackbar } from "notistack";

//----------------------------------------------------------------------------------------------



const links = [
  { label: 'Multichoice', href: '/questionbank/MultiChoice/create' },
  { label: 'ShortAnswer', href: '/questionbank/ShortAnswer/create' },
  { label: 'DragAndDrop', href: '/questionbank/DragAndDropIntoText/create' },
  { label: 'Matching', href: '/questionbank/Match/create' },
  { label: 'TrueFalse', href: '/questionbank/TrueFalseQuestion/create' },
];

const item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Item({ children }) {
  return (
    <Box sx={{ border: '1px', p: [2], m: 2, padding: '5px' }}>
      {children}
    </Box>
  );
}





const QuizList = (props) => {
  
  const router = useRouter();
  const [listQuiz, setListQuiz] = useState([]);
  const [filter, setFilter] = useState({
    pageIndex: 1,
    pageSize: 10,
  });
  const [selectItem, setSelectItem] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpenClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const switchToAddNew = () => {
    router.push("/question/create");
  };

  async function switchToAddQuestion() {

    console.log(selectItem);
    if (selectItem.length !== 0) {
      const res = await addMultiQuestions(selectItem);
      if (res.status < 400) {
        enqueueSnackbar("Action success", { variant: "success" });
      }
      return;
    }
    enqueueSnackbar("Bạn cần chọn câu hỏi trong ngân hàng câu hỏi trước khi thêm vào câu hỏi !!!!!", { variant: "error" });
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
        <title>Danh sách ngân hàng câu hỏi</title>
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
                    Danh sách ngân hàng câu hỏi
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
                  onClick={switchToAddQuestion}
                >
                  Thêm mới vào câu hỏi
                </Button>

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
                  Tạo mới câu hỏi
                </Button>


                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle id="responsive-dialog-title">
                  </DialogTitle>
                  <DialogContent>
                    <Grid container >
                      <Typography content='center' textAlign='center' id="modal-modal-title" variant="h6" component="h2" paddingBottom='10px'>
                        Chọn loại câu hỏi bạn muốn tạo mới
                      </Typography>
                      <Grid container spacing={2}>
                        {links.map((link, index) => (
                          <Grid item xs={6} key={index} md={4}>
                            <Button href={link.href}>
                              <Item>{link.label}</Item>
                            </Button>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </DialogContent>
                </Dialog>

              </Stack>
            </Stack>
            <SearchQuestionBank filter={filter} setListQuiz={setListQuiz} />
            <QuestionBankTable
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

QuizList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default QuizList;
