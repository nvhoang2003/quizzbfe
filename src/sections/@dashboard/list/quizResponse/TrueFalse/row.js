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
      <RadioGroup
        value={questionResult?.idAnswerChoosen || ""}
        name="radio-buttons-group"
        disabled={true}
      >
        {questionResult?.question?.questionAnswers?.map((item, index) => (
          <FormControlLabel
            value={item?.id}
            key={index}
            control={<Radio />}
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
