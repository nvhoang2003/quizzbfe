import { changeQuizResult } from '@/redux/slice/quizResult';
import { useDispatch, useSelector } from '@/redux/store';
import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export default function OneChoiceQuestion(props) {
  const { question, numberQuestion } = props;
  const [questionResult, setQuestionResult] = useState({
    mark: 0,
    status: '',
    questionId: 0,
    answer: [],
  });
  const [idAnswerChoose, setIdAnswerChoose] = useState();

  const listQuestionResult = useSelector(state => state.quizResult.value);

  const dispatch = useDispatch();

  const handleChange = (event, item) => {
    console.log(item);
    setQuestionResult({
      mark: item.fraction,
      status: item.fraction == 1 ? 'Right' : 'Wrong',
      questionId: question.question.id,
      answer: item,
    })
  }
  useEffect(() => {
    const answerChoosen = listQuestionResult.filter(item => item.questionId === question.question?.id);
    setIdAnswerChoose(answerChoosen[0]?.answer?.id);
  }, [question]);

  useEffect(() => {
    if (questionResult.questionId !== 0) {
      dispatch(changeQuizResult(questionResult));
    }
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
        <Typography sx={{ fontWeight: 'bold' }}>Câu Hỏi {numberQuestion}: {question?.question?.content}</Typography>
        <Typography sx={{ fontSize: '12px' }}>Chọn Một Đáp Án</Typography>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={idAnswerChoose || ''}
          onChange={(event, value) => setIdAnswerChoose(value)}
          name="radio-buttons-group"
          sx={{ py: 3 }}
        >
          {question?.questionAnswer?.map((item, index) => (
            <FormControlLabel value={item?.id} key={index} control={<Radio onChange={(event) => handleChange(event, item)} />} label={item?.content} />
          ))}
        </RadioGroup>
      </Box>
    </Box>
  )
}
