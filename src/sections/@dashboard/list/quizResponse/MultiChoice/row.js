import PropTypes from "prop-types";
import {
  Checkbox,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";

const Row = ({ questionResult }) => {

  const isMultiRightAnswer = (currentQuestion) => {
    const totalRightAnswers = currentQuestion?.questionAnswers?.reduce((total, item) => {
      return total + (item.fraction > 0 ? 1 : 0);
    }, 0);
    return totalRightAnswers > 1;
  }

  return (
    <>
      <Typography fontWeight="700">Câu trả lời:</Typography>
      <RadioGroup
        value={questionResult?.idAnswerChoosen || ""}
        name="radio-buttons-group"
        disabled={true}
      >
        {questionResult?.question?.questionAnswers?.map((item, index) => (
          <FormControlLabel
            value={item?.id}
            key={index}
            control={
              isMultiRightAnswer(questionResult?.question) ?
                <Checkbox
                  checked={questionResult?.idAnswerChoosen?.includes(item?.id)}
                // disabled={true}
                />
                :
                <Radio
                  // disabled={true}
                  checked={questionResult?.idAnswerChoosen?.includes(item?.id)}
                />




            }

            label={
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1">{item?.content}</Typography>
              </div>
            }
          />
        ))}
      </RadioGroup>
    </>
  );
};

Row.propTypes = {
  questionReult: PropTypes.object,
};

export default Row;
