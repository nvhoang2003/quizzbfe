import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { use, useEffect, useState } from 'react';
//----------------------------------------------------------------------

export default function DoTrueFalse(props) {
  const { question, numberQuestion, answerResult, setAnswerResult, quiz, setQuiz } = props;
  
  const handleChange = (event, item) => {
    var newListAnswer = answerResult.filter(item => item.questionId !== question.id);
    setAnswerResult([...newListAnswer, {
      questionId: question.id,
      questionType: question.questionsType,
      idAnswerChoosen: [item.id]
    }
    ]);
  }

  return (
    <Box sx={{
      display: 'flex',
      p: 1,
      m: 1,
      bgcolor: 'background.paper',
      borderTop: 'solid 1px',
      width: 1
    }}>
      <Box sx={{ py: 3, }}>
        <Typography sx={{ fontWeight: 'bold' }}>Câu hỏi {numberQuestion} : {question?.content}</Typography>
        {question?.imageUrl && <img src={question.imageUrl} alt="Image" height="300" width="300" />}
        <Typography sx={{ fontSize: '12px' }}>Chọn Một Đáp Án</Typography>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          sx={{ py: 3 }}
          value={parseInt(quiz[0]?.idAnswerChoosen[0])}
        >
          {question?.questionAnswers?.map((item, index) => (
            <FormControlLabel
              value={item?.id}
              key={index}
              control={<Radio onChange={(event) => handleChange(event, item)} />}
              label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body1">{item?.content}</Typography>
                </div>
              }

            />
          ))}
        </RadioGroup>
      </Box>
    </Box>
  )
}
