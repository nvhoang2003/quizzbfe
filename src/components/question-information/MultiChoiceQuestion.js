import { Typography, Box, FormGroup, FormControlLabel, Checkbox, Stack, Icon } from '@mui/material'
import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import CheckQuestion from './checkMultiquestion';
//-------------------------------------------------------------

export default function MultiChoiceQuestion(props) {

  const { question, numberQuestion, answerResult, setAnswerResult, isSubmit} = props;
  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const [questionResult, setQuestionResult] = useState({
    mark: 0,
    status: '',
    questionId: 0,
    answer: [],
  });
  const selectedCheckboxes = useRef([]);
  const listQuestionResult = useState([]);
  const [listIdSelected, setListIdSelected] = useState([]);
  const [select, setSelect] = useState(0);

  const [initialFraction, setInitialFraction] = useState(null);

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
        status: (checkHaveWrongAnswer(selectedCheckboxes.current) && (questionResult?.mark + item.fraction) === 1) ? 'Đúng' : 'Sai',
        questionId: question?.id,//question.question.id
        answer: [...prevResult?.answer, item]
      }));
      listIdSelected.push(item.id);
      setListIdSelected([...listIdSelected]);
      setInitialFraction(item.fraction);
    } else {
      selectedCheckboxes.current = selectedCheckboxes.current.filter(sel => sel.id !== item.id);
      setQuestionResult({
        mark: questionResult.mark - item.fraction,
        status: (checkHaveWrongAnswer(selectedCheckboxes.current) && questionResult.mark - item.fraction === 1) ? 'Đúng' : 'Sai',
        questionId: question?.id,//question.question.id
        answer: [...questionResult.answer.filter(sel => sel.id !== item.id)]
      })
      setListIdSelected(listIdSelected.filter(checkbox => checkbox !== item.id));
    }

  }
  useEffect(() => {
    setAnswerResult(questionResult);
  }, [questionResult, answerResult]);

  useEffect(() => {
    if (question, listQuestionResult) {
      const answer = listQuestionResult?.filter(item => item.questionId == question?.id);
      const ids = answer[0]?.answer?.map(i => i.id);
      if (ids) {
        if (typeof ids === 'Array') {
          setListIdSelected([...ids]);
        } else {
          setListIdSelected(ids);
        }
      }
      if (listQuestionResult?.filter(item => item.questionId == question?.id)[0]) {
        setQuestionResult(listQuestionResult.filter(item => item.questionId == question?.id)[0])
      }
    }
  }, [question]);


  useEffect(() => {
    setSelect(listIdSelected.length);
  }, [listIdSelected, select, initialFraction]);


  return (
    <Box sx={{
      display: 'flex',
      p: 1,
      m: 1,
      // bgcolor: 'background.paper',
      borderTop: 'solid 1px',
      width: 1
    }}
    >
      <Box sx={{ py: 3, width: 1 }} alignItems='center'>
        <Stack alignItems="flex-start" sx={{ paddingLeft: "50px" }}>
          <Typography variant="h5" >Câu Hỏi {numberQuestion}: {question?.content}</Typography>
          {question?.imageUrl && <img src={question.imageUrl} alt="Image" height="300" width="300" />}
          <Typography sx={{ paddingLeft: "20px" }} variant="subtitle2">Chọn Nhiều Đáp Án</Typography>
        </Stack>

        <FormGroup sx={{ py: 3 }}>
          <Stack direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}>
            {question?.answer_content?.map((item, index) => (
              
              <FormControlLabel key={index}
                sx={{ paddingLeft: "100px" }}
                control={<Checkbox disabled={isSubmit} checked={listIdSelected?.includes(item.id)} onChange={(event) => handleChange(event, item)} name="checked" />}
                label={

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {alphabet.map((item) => {
                      <Typography variant="body1" sx={{ paddingRight: "10px" }}>{item}</Typography>
                    })}
                    <Typography variant="body1">{item?.answer}</Typography>
                    <CheckQuestion questionResult={questionResult} listIdSelected={listIdSelected} isSubmit={isSubmit} item={item} />

                  </div>
                }
              />
            ))}
          </Stack>

        </FormGroup>
      </Box>
    </Box>
  )
}
// checked={listIdSelected?.includes(item.id)} 