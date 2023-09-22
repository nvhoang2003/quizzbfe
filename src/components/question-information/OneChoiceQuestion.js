import { Box, Typography, FormGroup, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'

export default function OneChoiceQuestion(props) {
  const { question, numberQuestion } = props;
  return (
    <Box sx={{
      display: 'flex',
      //justifyContent: 'space-between',
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
          //defaultValue="female"
          name="radio-buttons-group"
          sx={{ py: 3 }}
        >
          {question?.questionAnswer?.map((item, index) => (
            <FormControlLabel value={item?.id} key={index} control={<Radio />} label={item?.content} />
          ))}
        </RadioGroup>
      </Box>
    </Box>
  )
}
