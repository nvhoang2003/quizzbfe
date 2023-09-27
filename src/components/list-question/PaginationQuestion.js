import React from 'react'
import { Button } from '@mui/material';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { merge } from '@mui/system';

export default function PaginationQuestion(props) {
  const { startValue, endValue, sumValue, currentValue } = props;
  const range = [];

  for (let i = startValue; i <= endValue; i++) {
    range.push(i);
  }

  const handleQuestionNumberClick = (event) => {
    props.changeCurrentValue(event.target.value);
  }

  const handleNextQuestionClick = () => {
    if (currentValue < sumValue) {
      props.changeCurrentValue(currentValue + 1);
    } else {
      props.changeCurrentValue(1);
    }
  }

  const handleLastQuestionClick = () => {
    props.changeCurrentValue(sumValue);
  }

  const handleFirstQuestionClick = () => {
    props.changeCurrentValue(1);
  }

  const handlePreviousQuestionClick = () => {
    if (currentValue > 1) {
      props.changeCurrentValue(currentValue - 1);
    }
  }

  const sxCurrentQuestion = {
    minWidth: 0,
    borderRadius: '50%',
    width: 24,
    mx: 1,
    color: "#FFFFFF",
    backgroundColor: "#2777C1"
  }

  const sxNormalQuestion = {
    minWidth: 0,
    borderRadius: '50%',
    width: 24,
    mx: 1,
    backgroundColor: "#FFFFFF",
    color: "#2777C1"
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleFirstQuestionClick} sx={sxNormalQuestion}><FastRewindIcon /></Button>
      <Button variant="outlined" onClick={handlePreviousQuestionClick} sx={sxNormalQuestion}><SkipPreviousIcon /></Button>
      {range.map((item) => (
        item == currentValue ? <Button key={item} variant="outlined" disabled sx={sxCurrentQuestion}>{item} </Button> :
          <Button key={item} value={item} variant="outlined" onClick={handleQuestionNumberClick} sx={sxNormalQuestion}>{item}</Button>
      ))}
      <Button variant="outlined" onClick={handleNextQuestionClick} sx={sxNormalQuestion}><SkipNextIcon /></Button>
      <Button variant="outlined" onClick={handleLastQuestionClick} sx={sxNormalQuestion}><FastForwardIcon /></Button>
    </div>
  )
}
