import PropTypes from "prop-types";
import {
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { Clear, Done } from "@mui/icons-material";

const Row = ({ questionResult, isPublic }) => {
  return (
    <>
      <Typography fontWeight="700" pl={isPublic ? 3 : 0}>Câu trả lời:</Typography>
      <RadioGroup
        value={questionResult?.idAnswerChoosen || ""}
        name="radio-buttons-group"
        disabled={true}
      >
        {questionResult?.question?.questionAnswers?.map((item, index) => {
          const correctAnswer = item.fraction == 1;

          return (
            <Grid container>
              {isPublic && (
                <Grid
                  item
                  width={"24px"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  {correctAnswer && item?.id != questionResult?.idAnswerChoosen && (
                    <Done color="success" />
                  )}
                </Grid>
              )}
              <Grid item xs={1}>
                <FormControlLabel
                  value={item?.id}
                  key={index}
                  control={
                    <Radio
                      color={
                        isPublic ? (correctAnswer ? "success" : "error") : ""
                      }
                    />
                  }
                  label={
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="body1">{item?.content}</Typography>
                    </div>
                  }
                />
              </Grid>
            </Grid>
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
