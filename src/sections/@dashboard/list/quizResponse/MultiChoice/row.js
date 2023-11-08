import PropTypes from "prop-types";
import {
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

const Row = ({ questionResult, isPublic }) => {
  const isMultiRightAnswer = (currentQuestion) => {
    const totalRightAnswers = currentQuestion?.questionAnswers?.reduce(
      (total, item) => {
        return total + (item.fraction > 0 ? 1 : 0);
      },
      0
    );
    return totalRightAnswers > 1;
  };

  return (
    <>
      <Typography fontWeight="700">Câu trả lời:</Typography>
      <RadioGroup
        value={questionResult?.idAnswerChoosen || ""}
        name="radio-buttons-group"
        disabled={true}
      >
        {questionResult?.question?.questionAnswers?.map((item, index) => {
          const correctAnswer =
            item.fraction > 0 ? (item.fraction == 1 ? 1 : 2) : 0;
          const colorAnswer = isPublic
            ? correctAnswer != 0
              ? correctAnswer == 1
                ? "success"
                : "warning"
              : "error"
            : "";

          return (
            <FormControlLabel
              value={item?.id}
              key={index}
              control={
                isMultiRightAnswer(questionResult?.question) ? (
                  <Checkbox
                    color={colorAnswer}
                    checked={questionResult?.idAnswerChoosen?.includes(
                      item?.id
                    )}
                  />
                ) : (
                  <Radio
                    color={colorAnswer}
                    checked={questionResult?.idAnswerChoosen?.includes(
                      item?.id
                    )}
                  />
                )
              }
              label={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body1">{item?.content}</Typography>
                </div>
              }
            />
          );
        })}
      </RadioGroup>
    </>
  );
};

Row.propTypes = {
  questionReult: PropTypes.object,
  isPublic: PropTypes.bool,
};

export default Row;
