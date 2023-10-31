import PropTypes from "prop-types";
import { Container, Grid, Stack, Typography } from "@mui/material";

const Row = ({ questionResult }) => {
  return (
    <>
      {questionResult?.question?.matchSubQuestions &&
      questionResult?.question?.matchSubQuestions?.length > 0 ? (
        <Grid>
          <Grid container my={1}>
            <Grid item xs={1}></Grid>
            <Grid item xs={5}>
              <Typography fontWeight="700" noWrap>
                Câu hỏi
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography fontWeight="700" noWrap>
                Câu trả lời
              </Typography>
            </Grid>
          </Grid>
          {questionResult?.question?.matchSubQuestions?.map((item, index) => {
            if (item && item.questionText) {
              return (
                <Grid key={index} container>
                  <Grid item xs={1}>
                    <Typography fontWeight="600">{index + 1}.</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography fontWeight="600" noWrap>
                      {item.questionText}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
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
              return <></>;
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
