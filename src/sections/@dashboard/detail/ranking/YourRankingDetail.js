import { Avatar, Card, CardHeader, Stack, Typography, Box, CardContent } from '@mui/material';
import React from 'react'

export default function YourRankingDetail(props) {
  const { data } = props;
  return (
    <Card sx={{ display: 'flex' }}>
      <Stack sx={{ maxWidth: 345, m: 5 }} spacing={2} className='center-item'>
        <Box sx={{ minWidth: 345, my: 3 }} className='center-item'>
          <Typography variant="h6">
            Thứ Hạng Của Bạn
          </Typography>
        </Box>

        < Box sx={{ minWidth: 345 }} className='center-item' >
          <Avatar sx={{
            bgcolor: "#0BD539",
            height: "65px",
            width: "70px",
            clipPath: 'polygon(50% 0%, 90% 25%, 90% 75%, 50% 100%, 10% 75%, 10% 25%)'
          }} variant="square">
            {data.rank}
          </Avatar>
        </Box >

        < Stack direction="row" sx={{ minWidth: 345 }} className='center-item' spacing={5}>
          <Stack alignItems="center">
            <Typography fontWeight="bold">Điểm Bạn Đạt Được</Typography>
            <Typography>{data.score}</Typography>
          </Stack>

          <Stack alignItems="center">
            <Typography fontWeight="bold">Thời Gian Làm Bài</Typography>
            <Typography>{data.timeDoQuiz}</Typography>
          </Stack>
        </Stack>
      </Stack >
    </Card>
  )
}
