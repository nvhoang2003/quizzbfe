import { useMemo, useState, useEffect } from 'react';
import FormProvider from '@/components/form/FormProvider';
import RHFTextField from '@/components/form/RHFTextField';
import { Container, Button, Card, Divider, Grid, Stack, Typography, TextField } from '@mui/material'
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import PropTypes from 'prop-types';
import { ST } from 'next/dist/shared/lib/utils';
import { useRouter } from 'next/router';
import { addQuizAccess } from '@/dataProvider/quizAccess';
//---------------------------------------------------

Result.propTypes = {
  result_quiz: PropTypes.number,
};

export default function Result({ result_quiz, status, id }) {
  const router = useRouter();

  const urlParams = new URLSearchParams(window.location.search);

  const handleReStart = async (quizId) => {
    const dataAdd = {
      userId: localStorage.getItem("userId"),
      quizId: urlParams.get('quizId'),
      timeStartQuiz: new Date(),
      status: "Doing"
    }
    const res = await addQuizAccess(dataAdd);
    const accessId = res.data.data.id;
    router.push(`/testquiz/${accessId}`);
  }

  const handleRanking = () => {
    router.push(`/home/client/ranking/${urlParams.get("quizId")}`);
  }

  const handleGoHome = () => {
    router.push(`/home/client/`);
  }

  const handleShow = () => {
    router.push(`/quizresponse/${id}/detail`);
  }

  return (
    <Container maxWidth='100%'>
      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        <Grid item xs={10} >
          <Card sx={{ p: 5 }}>
            <Typography variant="h4" sx={{ color: '#2A2A2A', mb: 3, textAlign: 'center' }}>
              {status && status == "Pass" ? (
                " Chúc mừng bạn đã đạt được "
              ) : (
                "Bạn có thể thử lại một lần nữa"
              )}
            </Typography>
            <Typography variant="h6" sx={{ color: '#2A2A2A', mb: 3, textAlign: 'center' }}>
              Điểm của bạn là
            </Typography>
            <Typography variant="h4" sx={{ color: '#2A2A2A', mb: 3, textAlign: 'center' }}>
              {(Math.round(result_quiz * 2) / 2).toFixed(1)}
            </Typography>
            <Stack alignItems={'center'} justifyContent={'center'} direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 2, sm: 3, md: 5 }}>
              {urlParams.get("public") == 0 ? <Button variant="outlined" onClick={handleRanking} size="medium">
                Xem Thứ Hạng
              </Button> : <Button variant="outlined" onClick={handleReStart} size="medium">
                Thử làm lại
              </Button> }
              
              <Button variant="outlined" onClick={handleShow} size="medium">
                Xem đáp án chi tiết
              </Button>
              <Button variant="outlined" onClick={handleGoHome} size="medium">
                Về trang chủ
              </Button>
            </Stack>
          </Card>


        </Grid>
      </Stack>

    </Container>
  );
};

Result.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

