import { Typography, Box, FormGroup, FormControlLabel, Checkbox, Stack } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { changeQuizResult } from '@/redux/slice/quizResult';
import React, { useRef } from 'react';
import { useState, useEffect } from 'react';

export default function MultiChoiceQuestion(props) {
  const { question, numberQuestion } = props;
  const dispatch = useDispatch();
  const [questionResult, setQuestionResult] = useState({
    mark: 0,
    status: '',
    questionId: 0,
    answer: [],
  });
  const selectedCheckboxes = useRef([]);
  const listQuestionResult = useSelector(state => state.quizResult.value);
  const [listIdSelected, setListIdSelected] = useState([]);
  const checkHaveWrongAnswer = (value) => {
    if (value.length == 0) {
      return false;
    }
    value.map((item) => {
      if (item.fraction == 0) {
        return false;
      }
    });
    return true;
  }

  const handleChange = (event, item) => {
    if (event.target.checked) {
      selectedCheckboxes.current = [...selectedCheckboxes.current, item];
      setQuestionResult(prevResult => ({
        mark: prevResult?.mark + item.fraction,
        status: (checkHaveWrongAnswer(selectedCheckboxes.current) && (questionResult?.mark + item.fraction) === 1) ? 'Right' : 'Wrong',
        questionId: question.question.id,
        answer: [...prevResult?.answer, item]
      }));
      console.log(questionResult);
      listIdSelected.push(item.id);
      setListIdSelected([...listIdSelected]);
    } else {
      selectedCheckboxes.current = selectedCheckboxes.current.filter(sel => sel.id !== item.id);
      setQuestionResult({
        mark: questionResult.mark - item.fraction,
        status: (checkHaveWrongAnswer(selectedCheckboxes.current) && questionResult.mark - item.fraction === 1) ? 'Right' : 'Wrong',
        questionId: question.question.id,
        answer: [...questionResult.answer.filter(sel => sel.id !== item.id)]
      })
      setListIdSelected(listIdSelected.filter(checkbox => checkbox !== item.id));
    }
  }

  useEffect(() => {
    if (question, listQuestionResult) {
      const answer = listQuestionResult.filter(item => item.questionId == question.question.id);
      const ids = answer[0]?.answer?.map(i => i.id);
      if (ids) {
        if (typeof ids === 'Array') {
          setListIdSelected([...ids]);
        } else {
          setListIdSelected(ids);
        }
      }
      console.log(listQuestionResult.filter(item => item.questionId == question.question.id)[0])
      if (listQuestionResult.filter(item => item.questionId == question.question.id)[0]) {
        setQuestionResult(listQuestionResult.filter(item => item.questionId == question.question.id)[0])
      }
    }
  }, [question]);


  useEffect(() => {
    if (questionResult.questionId !== 0) {
      dispatch(changeQuizResult(questionResult));
    }
  }, [listIdSelected]);


  return (
    <Box sx={{
      display: 'flex',
      p: 1,
      m: 1,
      bgcolor: 'background.paper',
      borderTop: 'solid 1px',
      width: 1
    }}
    >
      <Box sx={{ py: 3, width: 1 }}>
        <Typography sx={{ fontWeight: 'bold' }}>Câu Hỏi {numberQuestion}: {question?.question?.content}</Typography>
        <Typography sx={{ fontSize: '12px' }}>Chọn Nhiều Đáp Án</Typography>

        <FormGroup sx={{ py: 3 }}>
          {question?.questionAnswer?.map((item, index) => (
            <FormControlLabel key={index} control={<Checkbox checked={listIdSelected?.includes(item.id)} onChange={(event) => handleChange(event, item)} name="checked" />} label={item?.content} />
          ))}
        </FormGroup>
      </Box>
    </Box>
  )
}
// checked={listIdSelected?.includes(item.id)} 