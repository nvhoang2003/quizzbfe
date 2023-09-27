import {
  Box,
  Divider,
  Drawer,
  Stack,
  Typography,
} from '@mui/material';

export const SideNav = (props) => {
  const { informationDoQuiz } = props;
  return (
    <Drawer
      anchor="left"
      open
      PaperProps={{
        sx: {
          backgroundColor: '#f2f4f7',
          color: '#000000',
          width: 280
        }
      }}
      sx={{ zIndex: - 100 }}
      variant="persistent"
    //variant="permanent"
    >
      <svg width="100px" height="100px" className='mt-150' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zM6.023 15.416C7.491 17.606 9.695 19 12.16 19c2.464 0 4.669-1.393 6.136-3.584A8.968 8.968 0 0 0 12.16 13a8.968 8.968 0 0 0-6.137 2.416zM12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        </g>
      </svg>
      <Box sx={{ mx: 'auto', fontWeight: 'bold' }}>
        <Typography >Họ Và Tên: {informationDoQuiz?.name}</Typography>
        <Typography >Khóa Học: {informationDoQuiz?.course}</Typography>
        <Typography>Đề Thi: {informationDoQuiz?.quiz}</Typography>
      </Box>
    </Drawer>
  );
};
