import PropTypes from "prop-types";
import { Card, Stack, Typography } from "@mui/material";

const Result = ({ questionResult }) => {
  console.log(questionResult);
  return questionResult?.question?.questionAnswers &&
    questionResult?.question?.questionAnswers.length > 0 ? (
    <Card
      sx={{
        px: 5,
        py: 3,
        backgroundColor: "#c8e6c9",
      }}
    >
      <Typography fontWeight={700}>Đáp án của câu hỏi là : </Typography>
      {questionResult?.question?.questionAnswers.map((item, index) => {
        return (
          item.fraction > 0 && (
            <Stack
              display="flex"
              flexDirection="row"
              alignItems="end"
              pl={5}
              key={index}
            >
              <Typography>- {item?.content}</Typography>
              <Typography ml={1} fontWeight={600}>
                {`(${questionResult.mark * item?.fraction} điểm)`}
              </Typography>
              <Typography ml={1}>
                &rarr;{" "}
                {item?.feedback ?? "Hiện tại chưa có giải thích cho đáp án này"}
              </Typography>
            </Stack>
          )
        );
      })}
    </Card>
  ) : (
    <></>
  );
};

Result.propTypes = {
  questionReult: PropTypes.object,
};

export default Result;
