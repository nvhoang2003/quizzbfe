import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
//----------------------------------------------------------------------

export default function TrueFalseQuestion(props) {
  const { question, numberQuestion, answerResult, setAnswerResult, isSubmit } = props;

  const [questionResult, setQuestionResult] = useState({
    mark: 0,
    status: '',
    questionId: 0,
    answer: null,
    fraction: 0,
  });

  const [idAnswerChoose, setIdAnswerChoose] = useState();

  const listQuestionResult = useState([]);

  const handleChange = (event, item) => {

    setQuestionResult({
      mark: item.fraction,
      status: item.fraction == 1 ? 'Đúng' : 'Sai',
      questionId: question.question?.id,
      answer: item.answer,
      fraction: item.fraction
    })
  }

  useEffect(() => {
    const answerChoosen = listQuestionResult.filter(item => item.questionId === question.question?.id);
    {
      answerResult.id === "undefined" ? setIdAnswerChoose(answerResult.id) :

        setIdAnswerChoose(answerChoosen[0]?.answer?.id);
    }
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
        <Typography sx={{ fontWeight: 'bold' }}>Câu Hỏi {numberQuestion}: {question?.content}</Typography>
        <Typography sx={{ fontSize: '12px' }}>Chọn Một Đáp Án</Typography>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={idAnswerChoose || ''}
          onChange={(event, value) => setIdAnswerChoose(value)}
          name="radio-buttons-group"
          sx={{ py: 3 }}
        >
          {question?.answers?.map((item, index) => (
            <FormControlLabel
              value={item?.id}
              key={index}
              control={<Radio disabled={isSubmit} onChange={(event) => handleChange(event, item)} />}
              label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body1">{item?.answer}</Typography>
                  {isSubmit === true &&
                    idAnswerChoose == item.id &&
                    questionResult.answer && (
                      <span>
                        {item.fraction === questionResult.fraction && questionResult.fraction === 1 ? (
                          <span key={index}><DoneIcon color='success' /></span>
                        ) : (
                          <span key={index}> <ClearIcon color='error' /></span>
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
