import { ResultQuestions } from "@/sections/@dashboard/list/quizResponse/result-questions";
import { Container, Stack, Typography, Box } from "@mui/material";

const Head = ({ data }) => {
  return (
    <Stack
      display="flex"
      flexWrap="wrap"
      direction="row"
      alignItems={"end"}
      justifyContent={"space-between"}
      sx={{
        pb: 1,
      }}
    >
      <Typography
        display="flex"
        flexWrap="wrap"
        flexDirection="column"
        fontWeight={700}
        sx={{
          pb: 1,
          pr: 1,
        }}
      >
        <span>Họ và tên học sinh: {data.userName}</span>
        <span>Khóa học: {data.courseName}</span>
        <span>Tên đề thi: {data.quizName}</span>
      </Typography>
      <Typography
        display="flex"
        flexWrap="wrap"
        flexDirection="row"
        variant="h5"
        sx={{
          pt: 1,
        }}
      >
        <Box mr={1}>Tổng điểm:</Box>
        <Box
          color={
            data.totalPoint?.toFixed(1) >= data.pointToPass
              ? "#2FAE03"
              : "#E45858"
          }
        >
          {(Math.round(data.totalPoint * 2) / 2).toFixed(1)}/{data.maxPoint}
        </Box>
      </Typography>
    </Stack>
  );
};

const DetailResponse = ({ data }) => {
  return (
    <Container maxWidth="xl">
      <Head data={data} />
      <ResultQuestions
        questionResults={data.questionReults}
        isPublic={data.isPublic}
      />
    </Container>
  );
};

export { DetailResponse };
