import PropTypes from "prop-types";
import { Stack } from "@mui/material";
import dynamic from "next/dynamic";
import { Clear, Done } from "@mui/icons-material";
import HeadQuestion from "@/sections/@dashboard/list/quizResponse/head-question";
import ResultAnswer from "@/sections/@dashboard/list/quizResponse/result-answer";

const ResultQuestions = ({ questionResults, isPublic }) => {
  return questionResults?.map((questionResult, index) => {
    const QuestionResultRow = dynamic(() =>
      import(
        `@/sections/@dashboard/list/quizResponse/${questionResult?.question?.questionsType}/row`
      )
    );
    const AnswerResult = dynamic(() =>
      import(
        `@/sections/@dashboard/list/quizResponse/${questionResult?.question?.questionsType}/result`
      )
    );

    return (
      <Stack display="flex" flexDirection="row" key={index}>
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
            mark={questionResult?.question.defaultMark}
          />
          <Stack pl={0}>
            <QuestionResultRow
              questionResult={questionResult}
              isPublic={isPublic}
            />
          </Stack>
          {isPublic && (
            <Stack pt={2}>
              <ResultAnswer questionResult={questionResult} />
            </Stack>
          )}
        </Stack>
      </Stack>
    );
  });
};

ResultQuestions.propTypes = {
  questionReults: PropTypes.array,
  isPublic: PropTypes.bool,
};

export { ResultQuestions };
