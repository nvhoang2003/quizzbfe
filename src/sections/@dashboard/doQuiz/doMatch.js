import React from 'react'
import { Box, FormControl, MenuItem, Select, Typography, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
//----------------------------------------------------

export default function DoMatch(props) {
  const {
    question,
    numberQuestion,
    answerResult,
    setAnswerResult,
    isSubmit
  } = props;

  const [matchAnswerChoose, setMatchAnswerChoose] = useState();
  const [listSubQuestion, setListSubQuestion] = useState();
  const [listSubAnswer, setListSubAnswer] = useState();

  const [oneSubQuestionPoint, setOneSubQuestionPoint] = useState(0);

  const shuffleArray = (arr) => {
    let newArr = [];
    while (arr.length) {
      let randomIndex = Math.floor(Math.random() * arr.length);
      newArr.push(arr[randomIndex]);
      arr.splice(randomIndex, 1);
    }
    return newArr;
  }


  const handleSelectChange = (event, subQuestion) => {
    const chooseAnswer = {
      questionText: subQuestion,
      answerText: event.target.value
    };
    const matchRemove = matchAnswerChoose.filter((question) => question.questionText !== subQuestion && question.questionText !== null);
    const newMatch = [...matchRemove, chooseAnswer];
    setMatchAnswerChoose(newMatch);

    checkRightAnswer(newMatch);
  };

  const checkRightAnswer = (newMatch) => {
    var newListAnswer = answerResult.filter(item => item.questionId !== question.id);

    setAnswerResult([...newListAnswer, {
      questionId: question.id,
      questionType: question.questionsType,
      matchSubQuestionChoosen: [
        ...newMatch
      ]
    }
    ]);
  }

  useEffect(() => {
    if (question?.matchSubQuestions?.length > 0) {
      setListSubQuestion(question.matchSubQuestions.map((item) => item.questionText).filter((item) => item !== ""));
      setListSubAnswer(shuffleArray(question.matchSubQuestions.map((item) => item.answerText)));
      setOneSubQuestionPoint(question?.defaultMark / question.matchSubQuestions.filter((item) => item.questionText !== "" && item?.questionText).length);
      setMatchAnswerChoose(question.matchSubQuestions.map((item) => ({ questionText: item.questionText, answerText: "" })).filter((item) => item.questionText !== ""));
    }
  }, [question]);

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

        {listSubQuestion?.map((subQuestion, quesIndex) => (
          <Stack direction="row" spacing={3} key={quesIndex} sx={{ my: 3 }}>
            <Typography sx={{ fontWeight: 'bold', m: 3 }}> {subQuestion}</Typography>

            {subQuestion && subQuestion !== null && (
              <>
                <FormControl sx={{ minWidth: 120 }}>
                  <Select
                    id={subQuestion}
                    label="Câu trả lời"
                    onChange={(event) => handleSelectChange(event, subQuestion)}
                    value={matchAnswerChoose?.filter((item) => item.questionText === subQuestion)?.map((item) => item.answerText) || ' '}
                    disabled={isSubmit}
                  >

                    <MenuItem value="" name="answer">Vui lòng chọn câu trả lời</MenuItem>
                    {listSubAnswer?.map((subAnswer, answerIndex) => (
                      <MenuItem key={answerIndex} value={subAnswer} name="answer">{subAnswer}</MenuItem>
                    ))}



                  </Select>
                </FormControl>
              </>
            )}
          </Stack>
        ))}
      </Box>
    </Box>
  )
}
