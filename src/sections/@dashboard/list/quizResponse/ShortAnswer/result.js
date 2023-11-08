import PropTypes from "prop-types";
import { Card, Stack, Typography } from "@mui/material";

const Result = ({ questionResult }) => {
  const correctAnswer = questionResult?.question?.questionAnswers[0];

  return questionResult?.question?.questionAnswers &&
    questionResult?.question?.questionAnswers.length > 0 ? (
    <Card
      sx={{
        px: 5,
        py: 3,
        backgroundColor: "#c8e6c9",
      }}
    >
      <Stack display="flex" flexDirection="row" alignItems="end">
        <Typography fontWeight={700}>Đáp án của câu hỏi là : </Typography>
        <Typography ml={1}>{correctAnswer?.content}</Typography>
      </Stack>
      <Stack display="flex" flexDirection="row" alignItems="end">
        <Typography fontWeight={700}>Giải thích đáp án : </Typography>
        <Typography ml={1}>
          {correctAnswer?.feedback ??
            "Hiện tại chưa có giải thích cho đáp án này"}
        </Typography>
      </Stack>
    </Card>
  ) : (
    <></>
  );
};

Result.propTypes = {
  questionReult: PropTypes.object,
};

export default Result;
