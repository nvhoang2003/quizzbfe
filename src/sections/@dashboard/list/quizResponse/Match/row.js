import PropTypes from "prop-types";
import { Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";

const Row = ({ questionResult }) => {
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
              return (
                <Grid key={index} container>
                  <Grid item xs={3}>
                    <Typography fontWeight="600" noWrap>
                      {item.questionText}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography noWrap>
                      {questionResult?.matchSubQuestionChoosen?.find(
                        (matchSub) =>
                          matchSub.questionText.trim() ==
                          item?.questionText?.trim()
                      )?.answerText || "Chưa chọn đáp án"}
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
};

export default Row;
