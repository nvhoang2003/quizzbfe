import PropTypes from "prop-types";
import {
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";

const Row = ({ questionResult }) => {
  return (
    <>
      <Typography fontWeight="700">Câu trả lời:</Typography>
      <RadioGroup name="radio-buttons-group">
        {questionResult?.question?.questionAnswers?.map((item, index) => (
          <FormControlLabel
            value={item?.id}
            key={index}
            control={
              <Radio
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
