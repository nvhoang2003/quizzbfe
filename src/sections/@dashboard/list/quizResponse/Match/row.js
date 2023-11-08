import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import React from "react";

const Row = ({ questionResult, isPublic }) => {
  return (
    <>
      {questionResult?.question?.matchSubQuestions &&
      questionResult?.question?.matchSubQuestions?.length > 0 ? (
        <Grid>
          <Grid container my={1}>
            <Grid item xs={3}>
              <Typography fontWeight="700" noWrap>
                Câu hỏi
              </Typography>
            </Grid>
            <Grid item>
              <Typography fontWeight="700" noWrap>
                Câu trả lời
              </Typography>
            </Grid>
          </Grid>
          {questionResult?.question?.matchSubQuestions?.map((item, index) => {
            if (item && item.questionText) {
              const answerTextChoosen =
                questionResult?.matchSubQuestionChoosen?.find(
                  (matchSub) =>
                    matchSub.questionText.trim() == item?.questionText?.trim()
                )?.answerText;
              const correctAnswer = item.answerText == answerTextChoosen;

              return (
                <Grid
                  key={index}
                  container
                  sx={{
                    color: isPublic
                      ? correctAnswer
                        ? "#2FAE03"
                        : "#E45858"
                      : "",
                  }}
                >
                  <Grid item xs={3}>
                    <Typography fontWeight="600" noWrap>
                      {item.questionText}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography noWrap>
                      {answerTextChoosen || "Chưa chọn đáp án"}
                    </Typography>
                  </Grid>
                </Grid>
              );
            } else {
              return <React.Fragment key={index}></React.Fragment>;
            }
          })}
        </Grid>
      ) : (
        <></>
      )}
    </>
  );
};

Row.propTypes = {
  questionReult: PropTypes.object,
  isPublic: PropTypes.bool,
};

export default Row;
