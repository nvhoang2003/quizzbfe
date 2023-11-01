import { ResultQuestions } from "@/sections/@dashboard/list/quizResponse/result-questions";

const { Container, Stack, Typography, Box } = require("@mui/material");

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
        <span>
          Họ và tên học sinh:{" "}
          {data.userDoQuizz?.firstname + data.userDoQuizz?.lastname}
        </span>
        <span>Khóa học: {data.course?.fullName}</span>
        <span>Tên đề thi: {data.quiz?.name}</span>
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
            data.totalPoint >= data.quiz?.pointToPass ? "#2FAE03" : "#E45858"
          }
        >
          {data.totalPoint}/{data.quiz?.maxPoint}
        </Box>
      </Typography>
    </Stack>
  );
};

const DetailResponse = ({ data }) => {
  return (
    <Container maxWidth="xl">
      <Head data={data} />
      <ResultQuestions questionResults={data.questionReults} />
    </Container>
  );
};

export { DetailResponse };
