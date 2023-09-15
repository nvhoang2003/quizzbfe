import { Stack, Typography } from '@mui/material'
import Brightness1Icon from '@mui/icons-material/Brightness1';
import React from 'react'

export default function NoneChooseAnswerResponse(props) {
  return (
    <Stack direction='row' spacing={2}>
      <Brightness1Icon fontSize='medium' sx={{ color: props.answer.fraction > 0 ?"#009688" : "#000000" }} />
      <Typography variant="h7" gutterBottom>{props.answer.content}</Typography>
    </Stack>
  )
}