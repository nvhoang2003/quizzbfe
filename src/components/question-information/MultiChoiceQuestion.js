import { Typography, Box, FormGroup, FormControlLabel, Checkbox, Stack } from '@mui/material'
import React from 'react'

export default function MultiChoiceQuestion(props) {
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
    }}
    >
      <Box sx={{ py: 3, width: 1 }}>
        <Typography sx={{ fontWeight: 'bold' }}>Câu Hỏi {numberQuestion}: {question?.question?.content}</Typography>
        <Typography sx={{ fontSize: '12px' }}>Chọn Nhiều Đáp Án</Typography>

        <FormGroup sx={{ py: 3 }}>
          {question?.questionAnswer?.map((item, index) => (
            <FormControlLabel key={index} control={<Checkbox />} label={item?.content} />
          ))}
        </FormGroup>
      </Box>
    </Box>
  )
}
