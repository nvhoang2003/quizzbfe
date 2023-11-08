import PropTypes from "prop-types";
import { Card, Typography } from "@mui/material";

const Result = ({ questionResult }) => {
  return questionResult?.question?.matchSubQuestions &&
    questionResult?.question?.matchSubQuestions.length > 0 ? (
    <Card
      sx={{
        px: 5,
        py: 3,
        backgroundColor: "#c8e6c9",
      }}
    >
      <Typography fontWeight={700}>Đáp án của câu hỏi là : </Typography>

      {questionResult?.question?.matchSubQuestions.map(
        (item, index) =>
          item.questionText && (
            <span key={index} style={{ paddingLeft: "30px", display: "block" }}>
              {item.questionText} &rarr; {item.answerText}
            </span>
          )
      )}
    </Card>
  ) : (
    <></>
  );
};

Result.propTypes = {
  questionReult: PropTypes.object,
};

export default Result;
