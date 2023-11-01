import PropTypes from "prop-types";
import { Container, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import { Clear, Done } from "@mui/icons-material";
import HeadQuestion from "@/sections/@dashboard/list/quizResponse/head-question";

const ResultQuestions = ({ questionResults }) => {
  return questionResults?.map((questionResult, index) => {
    const QuestionResultRow = dynamic(() =>
      import(
        `@/sections/@dashboard/list/quizResponse/${questionResult?.question?.questionsType}/row`
      )
    );

    return (
      <Stack display="flex" flexDirection="row">
        <Stack>
          {questionResult?.status && questionResult.status == "Right" ? (
            <Done color="success" />
          ) : (
            <Clear color="error" />
          )}
        </Stack>

        <Stack
          sx={{
            mb: 3,
            width: "100%",
          }}
        >
          <HeadQuestion
            indexQuestion={index + 1}
            question={questionResult?.question}
            mark={questionResult?.mark}
          />
          <Stack pl={5}>
            <QuestionResultRow
              questionResult={questionResult}
            />
          </Stack>
        </Stack>
      </Stack>
    );
  });
};

ResultQuestions.propTypes = {
  questionReults: PropTypes.array,
};

export { ResultQuestions };
