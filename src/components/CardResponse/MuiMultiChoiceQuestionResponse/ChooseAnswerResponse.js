import { Stack, Typography } from '@mui/material'
import Brightness1Icon from '@mui/icons-material/Brightness1';
import React from 'react'

export default function ChooseAnswerResponse(props) {
  return (
    <Stack direction='row' spacing={2}>
      <Brightness1Icon fontSize='medium' sx={{ color: props.answer.fraction > 0 ?"#2FAE03" : "#FF3333" }} />
      <Typography variant="h7" gutterBottom>{props.answer.content}</Typography>
    </Stack>
  )
}
