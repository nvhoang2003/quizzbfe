import { Card, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

//---------------------------------------------------

export default function ResultTruFalseQuestion(props) {
  const { questionResult, isSubmit, answerResult } = props;

  return (

    <Stack spacing={3} sx={{ paddingTop: '20px' }} >
      {isSubmit === true ? <Card sx={{ p: 5, backgroundColor: '#FCEEEE' }} >

        {answerResult.status ? (
          <span>Câu trả lời của bạn  {answerResult.status}.</span>
        ) : (
          <span>Bạn cần chọn câu trả lời trước.</span>
        )}

        <br />
        <span>Đáp án của câu hỏi là : </span>
        {questionResult.answers.map((item, index) => {
          if (item.fraction > 0) {
            return <span key={index} style={{ paddingLeft: '30px' }}>{item.answer}<br /></span>;
          }
        })}


      </Card> : <Card></Card>}
    </Stack>
  )

}




