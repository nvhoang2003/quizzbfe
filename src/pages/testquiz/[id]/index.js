import { DoQuizLayout } from '@/layouts/testquiz/DoQuizLayout';
import Head from 'next/head';
import { Layout as DashboardLayout } from '@/layouts/dashboard/layout';
import { Box, Stack, Container, Typography, Grid, Button } from '@mui/material';
import PaginationQuestion from '@/components/list-question/PaginationQuestion';
import MultiChoiceQuestion from '@/components/question-information/MultiChoiceQuestion';
import OneChoiceQuestion from '@/components/question-information/OneChoiceQuestion';
import { React, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getQuizForTestID } from '@/dataProvider/quizApi';
import Countdown from 'react-countdown';
import CountdownTimer from '@/components/countdown-timer/CountDownTimer';
// import CountdownTimer from '@/components/countdown-timer/CountDownTimer';
// Random component

const Completionist = () => <span>You are good to go!</span>;

// Renderer callback with condition
// const renderer = ({ hours, minutes, seconds, completed }) => {
//   if (completed) {
//     // Render a completed state
//     return <Completionist />;
//   } else {
//     // Render a countdown
//     return <span>{hours}:{minutes}:{seconds}</span>;
//   }
// };

const TestQuiz = (props) => {
  const [data, setData] = useState({});
  const [curent, setCurrent] = useState(1);
  const [startValue, setStartValue] = useState(1);
  const [endValue, setEndValue] = useState();
  const [sumValue, setSumValue] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({});

  const setNewCurrentValue = (newValue) => {
    setCurrent(parseInt(newValue));
  };

  const isMultiRightAnswer = (currentQuestion) => {
    const totalRightAnswers = currentQuestion?.questionAnswer?.reduce((total, item) => {
      return total + (item.fraction > 0 ? 1 : 0);
    }, 0);
    return totalRightAnswers > 1;
  }

  const {
    query: { id }
  } = useRouter();

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

      setEndValue(sumValue > 10 ? 10 : sumValue);
      setData(transformData);
    } else {
      return res;
    }
  };

  useEffect(() => {
    if (curent > endValue) {
      setEndValue(endValue + 10 > sumValue ? sumValue : endValue + 10);
      setStartValue(startValue + 10 > sumValue ? startValue : startValue + 10);
    }

    if (curent < startValue) {
      setEndValue(endValue - 10 < 1 ? endValue : endValue - (endValue % 10 == 0 ? 10 : endValue % 10));
      setStartValue(startValue - 10 < 1 ? 1 : startValue - 10);
    }
    if (data.questionReults) {
      setCurrentQuestion(data?.questionReults[curent - 1]);
    }
  }, [curent, data]);

  useEffect(() => {
    if (id) {
      fetchQuizByID(id);
    }
  }, [id]);

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
                {/* <Countdown
                  date={Date.now() + 5000}
                  // renderer={renderer}
                /> */}
                <CountdownTimer initialTime={5000} />
              </Typography>
            </Stack>
            <Stack
              flexWrap="wrap"
              direction="row"
              className='center-item'
            >
              <PaginationQuestion startValue={startValue} endValue={endValue} currentValue={curent} changeCurrentValue={setNewCurrentValue} sumValue={sumValue} />
            </Stack>
            <Stack
              flexWrap="wrap"
              direction="row"
              className='center-item'
              sx={{ width: 1 }}
            >
              {isMultiRightAnswer(currentQuestion) ? <MultiChoiceQuestion question={currentQuestion} numberQuestion={curent} /> : <OneChoiceQuestion question={currentQuestion} numberQuestion={curent} />}
              <Button variant="contained">Submit</Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
};


TestQuiz.getLayout = (page) =>
  <DoQuizLayout>
    {page}
  </DoQuizLayout>


export default TestQuiz;
