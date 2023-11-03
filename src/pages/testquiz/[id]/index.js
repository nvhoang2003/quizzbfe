// import { DoQuizLayout } from '@/layouts/testquiz/DoQuizLayout';
// import Head from 'next/head';
// import { Layout as DashboardLayout } from '@/layouts/dashboard/layout';
// import { Box, Stack, Container, Typography, Grid, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
// import PaginationQuestion from '@/components/list-question/PaginationQuestion';
// import { React, useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import { getQuizForTestID, submitQuiz } from '@/dataProvider/quizApi';
// import ConfirmDialog from '@/components/confirm-dialog/ConfirmDialog';
// import CountdownTimer from '@/components/countdown-timer/CountDownTimer';
// import DoShortQuestion from '@/sections/@dashboard/doQuiz/doShortAnswerQuestion';
// import DoMultiChoiceQuestion from '@/sections/@dashboard/doQuiz/doMultiChoiceQuestion';
// import DoMatchQuestion from '@/sections/@dashboard/doQuiz/doMatchQuestion';
// import DoTrueFalseQuestion from '@/sections/@dashboard/doQuiz/doTrueFalseQuestion';
// import DoDragAndDropQuestion from '@/sections/@dashboard/doQuiz/doDragAndDropIntoText/doDragAndDrop';
// import { useForm } from 'react-hook-form';
// import FormProvider from '@/components/form/FormProvider';
// import { LoadingButton } from '@mui/lab';
// import { useSelector, useDispatch } from 'react-redux'
// import { changeQuizResult } from '@/redux/slice/quizResult';

import { DoQuizLayout } from "@/layouts/testquiz/DoQuizLayout";
import Head from "next/head";
import { Layout as DashboardLayout } from "@/layouts/dashboard/layout";
import {
  Box,
  Stack,
  Container,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import PaginationQuestion from "@/components/list-question/PaginationQuestion";
import { React, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getQuizForTestID, submitQuiz } from "@/dataProvider/quizApi";
import ConfirmDialog from "@/components/confirm-dialog/ConfirmDialog";
import CountdownTimer from "@/components/countdown-timer/CountDownTimer";
import DoShortQuestion from "@/sections/@dashboard/doQuiz/doShortAnswerQuestion";
import DoMultiChoiceQuestion from "@/sections/@dashboard/doQuiz/doMultiChoiceQuestion";
import DoMatchQuestion from "@/sections/@dashboard/doQuiz/doMatchQuestion";
import DoTrueFalseQuestion from "@/sections/@dashboard/doQuiz/doTrueFalseQuestion";
import DoDragAndDropQuestion from "@/sections/@dashboard/doQuiz/doDragAndDropIntoText/doDragAndDrop";
import { useForm } from "react-hook-form";
import FormProvider from "@/components/form/FormProvider";
import { LoadingButton } from "@mui/lab";
import ConfirmDialogQuestion from "@/components/confirm-dialog/ConfirmDialogQuestion";
import { useSelector, useDispatch } from 'react-redux';
import { changeQuizResult } from '@/redux/slice/quizResult';
//-----------------------------------------------------------------------
const Completionist = () => <span>You are good to go!</span>;

const TestQuiz = (props) => {
  const {
    query: { id }
  } = useRouter();

  const [data, setData] = useState({});
  const router = useRouter();
  const [curent, setCurrent] = useState(1);
  const [sumValue, setSumValue] = useState(0);
  const [timeLimit, setTimeLimit] = useState();
  const [quizSubmit, setQuizSubmit] = useState([]);
  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);
  const [truefalse, setTruefalse] = useState([]);
  // console.log(quizSubmit);state => state?.quizSubmit?.value
  const listQuestionResult = useSelector(state => state.quizResult.value);

  const [openConfirm, setOpenConfirm] = useState(false);

  const methods = useForm({});

  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleSubmitConfirm = async () => {
    const number = parseInt(id);
    const transformData = {
      accessId: number,
      quizId: data?.quiz?.id,
      listQuestionSubmit: quizSubmit
    }
    try {
      const res = await submitQuiz(transformData);
      if (res.data.status === true) {
        setSubmit(true);
        router.push(`/ortherpage/${id}?quizId=${data?.quiz?.id}&public=${res?.data?.data?.quiz?.isPublic}`);
      }

    } catch (error) {

    }

    dispatch(changeQuizResult([]));
  }

  async function fetchQuizByID() {
    const res = await getQuizForTestID(id);
    if (res.status < 400) {
      const quizResponse = res.data.data;
      const transformData = {
        userDoQuizz: quizResponse.userName,
        courseName: quizResponse.courseName,
        quiz: quizResponse.quiz,
        questionReults: quizResponse.questionReults,
      };
      props.changeInfo(transformData.userDoQuizz, transformData.courseName, transformData.quiz?.name);
      setSumValue(transformData.questionReults.length);
      setTimeLimit(transformData?.quiz?.timeLimit);
      // setEndValue(sumValue > 10 ? 10 : sumValue);
      setData(transformData);
    } else {
      return res;
    }
  };

  useEffect(() => {
    setCurrent(quizSubmit?.length);
  }, [curent, quizSubmit]);

  useEffect(() => {
    if (id) {
      fetchQuizByID(id);
    }
  }, [id, sumValue]);

  useEffect(() => {
    // console.log(listQuestionResult);
    if (quizSubmit, listQuestionResult) {
      const answer = listQuestionResult.filter(item => item.questionId == data?.questionReults?.id);
      const ids = answer[0]?.answer?.map(i => i.id);
      if (ids) {
        if (typeof ids === 'Array') {
          setListIdSelected([...ids]);
        } else {
          setListIdSelected(ids);
        }
      }
      // console.log(listQuestionResult.filter(item => item.questionId == question.question.id)[0])
      if (listQuestionResult.filter(item => item.questionId == data?.questionReults?.id)[0]) {
        setQuizSubmit(listQuestionResult.filter(item => item.questionId == data?.questionReults?.id)[0])
      }
    }
  }, [listQuestionResult, quizSubmit]);

  useEffect(() => {
    if (quizSubmit.length !== 0) {
      dispatch(changeQuizResult(quizSubmit));
    }
  }, [quizSubmit]);

  const [openCountDownConfirm, setOpenCountDownConfirm] = useState(true);

  const handleCountDownCloseConfirm = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpenCountDownConfirm(true);
    }
  };
  const handleCountDownSubmit = () => {
    router.push(`/ortherpage/` + id);

  }

  // console.log(listQuestionResult);
  // console.log(quizSubmit);
  return (
    <>
      <Head>
        <title>Kiểm Tra</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Container maxWidth="xl">
          <FormProvider methods={methods} onSubmit={handleSubmit(handleOpenConfirm)}>
            <Stack spacing={3}>
              <Stack
                display="flex"
                flexWrap="wrap"
                direction="row"
                sx={{
                  px: 1,
                }}
                className='right-item'
              >
                <Typography variant='h4'>
                  {timeLimit && (
                    <>
                      <CountdownTimer
                        deadline={parseInt(timeLimit) * 60 * 1000}
                        completedCompoment={
                          <ConfirmDialogQuestion
                            open={openCountDownConfirm}
                            onClose={handleCountDownCloseConfirm}
                            title="Thời gian làm bài: "
                            content={
                              <h3>
                                Đã hết giờ bạn đã làm được {curent} / {sumValue}
                              </h3>
                            }
                            action={
                              <Button
                                variant="contained"
                                color="success"
                                onClick={() => {
                                  handleCountDownSubmit(id);
                                }}
                              >
                                Submit
                              </Button>
                            }
                          />
                        }
                        localVaraiableName="CD_TQ"
                      />
                    </>
                  )}

                </Typography>
              </Stack>
              <Stack
                className='center-item'
                spacing={3}
              >
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  {listQuestionResult && data?.questionReults && data.questionReults.map((item, index) => {
                    switch (item.questionsType) {
                      case 'ShortAnswer':
                        return <DoShortQuestion
                          key={index}
                          currentLevel={item}
                          quizSubmit={quizSubmit}
                          setQuizSubmit={setQuizSubmit}
                          number={index + 1} />;
                      case 'Match':
                        return <DoMatchQuestion
                          key={index}
                          currentLevel={item}
                          quizSubmit={quizSubmit}
                          setQuizSubmit={setQuizSubmit}
                          number={index + 1} />;
                      case 'TrueFalse':
                        return <DoTrueFalseQuestion
                          key={index}
                          currentLevel={item}
                          quizSubmit={quizSubmit}
                          setQuizSubmit={setQuizSubmit}
                          number={index + 1} />;
                      case 'MultiChoice':
                        return <DoMultiChoiceQuestion
                          key={index}
                          currentLevel={item}
                          quizSubmit={quizSubmit}
                          setQuizSubmit={setQuizSubmit}
                          number={index + 1} />;
                      // case 'DragAndDropIntoText':
                      //   return <DoDragAndDropQuestion key={index} currentLevel={item} drag={drag} setDrag={setDrag} numbers={index + 1} />;
                      default:
                        return null;
                    }
                  })}
                  <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      loading={isSubmitting}
                    >
                      Submit
                    </LoadingButton>
                  </Stack>
                </Stack>

                <ConfirmDialog
                  open={openConfirm}
                  onClose={handleCloseConfirm}
                  title=""
                  content={
                    <>
                      Bạn đã làm được {curent} / {sumValue} , bạn có chắc là muốn nộp bài không ?
                    </>
                  }
                  action={
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        handleSubmitConfirm(id);
                      }}
                    >
                      Submit
                    </Button>
                  }
                />
              </Stack>
            </Stack>
          </FormProvider>
        </Container>
      </Box >
    </>
  );
};


TestQuiz.getLayout = (page) =>
  <DoQuizLayout>
    {page}
  </DoQuizLayout>


export default TestQuiz;
