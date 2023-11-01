import { DoQuizLayout } from '@/layouts/testquiz/DoQuizLayout';
import Head from 'next/head';
import { Layout as DashboardLayout } from '@/layouts/dashboard/layout';
import { Box, Stack, Container, Typography, Grid, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import PaginationQuestion from '@/components/list-question/PaginationQuestion';
import { React, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getQuizForTestID, submitQuiz } from '@/dataProvider/quizApi';
import ConfirmDialog from '@/components/confirm-dialog/ConfirmDialog';
import { useSelector } from '@/redux/store';
import CountdownTimer from '@/components/countdown-timer/CountDownTimer';
import DoShortQuestion from '@/sections/@dashboard/doQuiz/doShortAnswerQuestion';
import DoMultiChoiceQuestion from '@/sections/@dashboard/doQuiz/doMultiChoiceQuestion';
import DoMatchQuestion from '@/sections/@dashboard/doQuiz/doMatchQuestion';
import DoTrueFalseQuestion from '@/sections/@dashboard/doQuiz/doTrueFalseQuestion';
import DoDragAndDropQuestion from '@/sections/@dashboard/doQuiz/doDragAndDropIntoText/doDragAndDrop';
import { useForm } from 'react-hook-form';
import FormProvider from '@/components/form/FormProvider';
import { LoadingButton } from '@mui/lab';

//-----------------------------------------------------------------------
const Completionist = () => <span>You are good to go!</span>;

const TestQuiz = (props) => {
  const {
    query: { id }
  } = useRouter();

  const [data, setData] = useState({});
  const router = useRouter();
  const [curent, setCurrent] = useState(1);
  const [startValue, setStartValue] = useState(1);
  const [endValue, setEndValue] = useState();
  const [sumValue, setSumValue] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [timeLimit, setTimeLimit] = useState();
  const [shortAnswer, setShortAnswer] = useState([]);
  const [multiChoice, setMultiChoice] = useState([]);
  const [truefalse, setTruefalse] = useState([]);
  const [match, setMatch] = useState([]);
  const [drag, setDrag] = useState([]);
  const [quizSubmit, setQuizSubmit] = useState([]);

  const [openConfirm, setOpenConfirm] = useState(false);

  const methods = useForm({
  });

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

  const listQuestionResult = useSelector(state => state.quizResult.value);

  const handleSubmitConfirm = async () => {
    const number =parseInt(id);
    const transformData = {
      accessId: 17,
      quizId: data?.quiz?.id,
      listQuestionSubmit: quizSubmit
    }
    try {
      const res = await submitQuiz(transformData);
      if (res.data.status === true) {
         router.push(`/ortherpage/` + id);
      }

    } catch (error) {

    }

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
    // if (curent > endValue) {
    //   setEndValue(endValue + 10 > sumValue ? sumValue : endValue + 10);
    //   setStartValue(startValue + 10 > sumValue ? startValue : startValue + 10);
    // }

    // if (curent < startValue) {
    //   setEndValue(endValue - 10 < 1 ? endValue : endValue - (endValue % 10 == 0 ? 10 : endValue % 10));
    //   setStartValue(startValue - 10 < 1 ? 1 : startValue - 10);
    // }
    // if (data.questionReults) {
    //   setCurrentQuestion(data?.questionReults[curent - 1]);
    // }
  }, [curent, quizSubmit]);

  useEffect(() => {
    if (id) {
      fetchQuizByID(id);
    }
  }, [id, sumValue]);

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
                  {timeLimit
                    ? <>
                      <CountdownTimer initialTime={timeLimit} question={curent} sum={sumValue} />
                    </>
                    : <></>}

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
                  {data?.questionReults && data.questionReults.map((item, index) => {
                    switch (item.questionsType) {
                      case 'ShortAnswer':
                        return <DoShortQuestion key={index} currentLevel={item} quizSubmit={quizSubmit} setQuizSubmit={setQuizSubmit} number={index + 1} />;
                      case 'Match':
                        return <DoMatchQuestion key={index} currentLevel={item} quizSubmit={quizSubmit} setQuizSubmit={setQuizSubmit} number={index + 1} />;
                      case 'TrueFalse':
                        return <DoTrueFalseQuestion key={index} currentLevel={item} quizSubmit={quizSubmit} setQuizSubmit={setQuizSubmit} number={index + 1} />;
                      case 'MultiChoice':
                        return <DoMultiChoiceQuestion key={index} currentLevel={item} quizSubmit={quizSubmit} setQuizSubmit={setQuizSubmit} number={index + 1} />;
                      case 'DragAndDropIntoText':
                        return <DoDragAndDropQuestion key={index} currentLevel={item} drag={drag} setDrag={setDrag} numbers={index + 1} />;
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
