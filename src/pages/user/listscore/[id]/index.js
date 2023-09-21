import { React, useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import MultiQuestionResponse from '@/components/CardResponse/MuiMultiChoiceQuestionResponse/MultiQuestionResponse';
import { useRouter } from 'next/router';
import { getResponseByID } from '@/dataProvider/quizResponseApi';

const list_score = () => {
  const [data, setData] = useState({});
  const questionReultsRef = useRef([]);
  const {
    query: { id }
  } = useRouter();

  async function fetchQuizResponseByID() {
    const res = await getResponseByID(id);
    if (res.status < 400) {
      const quizResponse = res.data.data;
      const transformData = {
        userDoQuizz: quizResponse.userDoQuizz,
        course: quizResponse.course,
        quiz: quizResponse.quiz,
        quizzAccess: quizResponse.quizzAccess,
        totalPoint: quizResponse.totalPoint,
        status: quizResponse.status,
        questionReults: quizResponse.questionReults,
      };

      questionReultsRef.current = quizResponse.questionReults;
      
      setData(transformData);
    } else {
      return res;
    }
  };


  useEffect(() => {
    if (id) {
      fetchQuizResponseByID(id);
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>
          CHI TIẾT KẾT QUẢ THI
        </title>
      </Head>
      <Box component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}>
        <Container maxWidth="xl">
          <Stack spacing={3} className='ml-50' sx={{ paddingBottom: 10 }}>
            <Typography variant="h4" className='mb-3'>
              CHI TIẾT KẾT QUẢ THI
            </Typography>
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              p: 1,
              m: 1,
              bgcolor: 'background.paper',
              borderRadius: 1,
            }}>
              <Box>
                <Typography sx={{ fontWeight: 'bold' }}>
                  Họ Và Tên: {data.userDoQuizz?.fullName}
                </Typography>
                <Typography sx={{ fontWeight: 'bold' }}>
                  Khóa Học: {data.course?.fullName}
                </Typography>
                <Typography sx={{ fontWeight: 'bold' }}>
                  Đề Thi: {data.quiz?.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  p: 1,
                  m: 1,
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                }}
              >
                <Typography variant='h6' sx={{ fontWeight: 'bold', marginRight: 20 }}>
                  Tổng Điểm: {data.totalPoint}/{data.quiz?.maxPoint}
                </Typography>
              </Box>
            </Box>
          </Stack>
          {questionReultsRef.current.map((item, index) => (
            <MultiQuestionResponse questionData={item} index={index + 1} />
          ))}
        </Container>
      </Box >
    </>
  )
};

export default list_score;
