import React from 'react'
import { Box, FormControl, MenuItem, Select, Typography, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

export default function MatchQuestion(props) {
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
  const [questionResult, setQuestionResult] = useState({
    mark: 0,
    status: 'Đúng',
    questionId: 0,
    answer: [],
  });
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

    const matchRemove = matchAnswerChoose.filter((question) => question.questionText !== subQuestion);
    const newMatch = [...matchRemove, chooseAnswer];
    setMatchAnswerChoose(newMatch);

    checkRightAnswer(newMatch);
  };

  const checkRightAnswer = (newMatch) => {
    var response = true;
    var mark = 0;
    newMatch?.map(oneMatch => {
      if (question?.matchSubQuestionBanks?.find((rightAnswer) => rightAnswer.questionText === oneMatch.questionText && rightAnswer.answerText === oneMatch.answerText)) {
        mark += oneSubQuestionPoint;
      }
    })

    const status = mark == question?.defaultMark ? "Đúng" : "Sai";

    setQuestionResult({
      mark: mark,
      status: status,
      questionId: question?.id,
      answer: [...newMatch],
    })
  }

  useEffect(() => {
    if (question?.matchSubQuestionBanks?.length > 0) {
      setListSubQuestion(question.matchSubQuestionBanks.map((item) => item.questionText).filter((item) => item !== ""));
      setListSubAnswer(shuffleArray(question.matchSubQuestionBanks.map((item) => item.answerText)));
      // setListRightResult(question.matchSubQuestionBanks);
      setOneSubQuestionPoint(question?.defaultMark / question.matchSubQuestionBanks.filter((item) => item.questionText !== "" && item?.questionText).length);
      setMatchAnswerChoose(question.matchSubQuestionBanks.map((item) => ({ questionText: item.questionText, answerText: "" })).filter((item) => item.questionText !== ""));
    }
  }, [question]);

  useEffect(() => {
    setAnswerResult(questionResult);
  }, [questionResult, answerResult]);

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
        <Typography sx={{ fontWeight: 'bold' }}>Câu Hỏi {numberQuestion}: {question?.content}</Typography>

        {listSubQuestion?.map((subQuestion, quesIndex) => (
          <Stack direction="row" spacing={3} key={quesIndex} sx={{ my: 3 }}>
            <Typography sx={{ fontWeight: 'bold', m: 3 }}>{subQuestion}</Typography>

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
