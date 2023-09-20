import React from 'react';
import { Card, CardContent, Stack, Typography, Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import ChooseAnswerResponse from './ChooseAnswerResponse';
import NoneChooseAnswerResponse from './NoneChooseAnswerResponse';

export default function MultiQuestionResponse(props) {
  const { questionData, index } = props;

  console.log(questionData)

  return (
    <Card sx={{ minWidth: 500, backgroundColor: "#f2f4f7", mx: 20, mb: 10 }} >
      <CardContent>
        <Stack direction='row' spacing={2}>
          <CheckIcon fontSize='medium' sx={{ color: "#2FAE03", fornWeight: 'bold' }} />
          <Typography variant="h7" gutterBottom>Câu {index} {questionData?.question?.content}</Typography>
        </Stack>
        <Box display="flex" justifyContent="flex-end" sx={{ fornWeight: 'bold' }}>
          <Typography variant="h7" gutterBottom>{questionData?.question?.defaultMark} Điểm</Typography>
        </Box>
        {questionData.questionAnswer.map((item, index) => (
          item && item.isChosen === true ? <ChooseAnswerResponse answer={item} /> : <NoneChooseAnswerResponse answer={item} />
        ))}
      </CardContent>
    </Card>
  );
}
