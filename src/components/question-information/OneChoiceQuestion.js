import { changeQuizResult } from '@/redux/slice/quizResult';
import { useDispatch, useSelector } from '@/redux/store';
import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CheckQuestion from './checkquestion';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
//----------------------------------------------------------------------

export default function OneChoiceQuestion(props) {
  const { question, numberQuestion, answerResult, setAnswerResult, isSubmit } = props;
  const [questionResult, setQuestionResult] = useState({
    mark: 0,
    status: '',
    questionId: 0,
    answer: [],
  });
  const [idAnswerChoose, setIdAnswerChoose] = useState();

  const listQuestionResult = useState([]);

  const handleChange = (event, item) => {
    setQuestionResult({
      mark: item.fraction,
      status: item.fraction == 1 ? 'right' : 'wrong',
      questionId: question.question?.id,
      answer: item,
    })
  }
  useEffect(() => {
    const answerChoosen = listQuestionResult.filter(item => item.questionId === question.question?.id);
    setIdAnswerChoose(answerChoosen[0]?.answer?.id);
  }, [question]);

  useEffect(() => {
    setAnswerResult(questionResult);
  }, [questionResult]);

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
        <Typography sx={{ fontWeight: 'bold' }}>Câu Hỏi: {question?.content}</Typography>
        <Typography sx={{ fontSize: '12px' }}>Chọn Một Đáp Án</Typography>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={idAnswerChoose || ''}
          onChange={(event, value) => setIdAnswerChoose(value)}
          name="radio-buttons-group"
          sx={{ py: 3 }}
        >
          {question?.answer_content?.map((item, index) => (
            <FormControlLabel
              value={item?.id}
              key={index}
              control={<Radio disabled={isSubmit} onChange={(event) => handleChange(event, item)} />}
              // label={item?.answer} 
              label={

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body1">{item?.answer}</Typography>
                  {isSubmit === true &&
                    idAnswerChoose == item.id &&
                    questionResult.answer && (
                      <span>
                        {item.fraction === questionResult.answer.fraction && questionResult.answer.fraction === 1 ? (
                          <span key={index}><DoneIcon /></span>
                        ) : (
                          <span key={index}> <ClearIcon /></span>
                        )}
                      </span>
                    )
                  }
                </div>
              }

            />
          ))}
        </RadioGroup>
      </Box>
    </Box>
  )
}