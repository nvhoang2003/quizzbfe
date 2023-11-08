import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import MatchAnswerResult from "@/sections/@dashboard/list/quizResponse/Match/result";

const ResultAnswer = ({ questionResult }) => {
  const AnswerResult = dynamic(() =>
    import(
      `@/sections/@dashboard/list/quizResponse/${questionResult?.question?.questionsType}/result`
    )
  );

  return <AnswerResult questionResult={questionResult} />;
};

ResultAnswer.propTypes = {
  questionResult: PropTypes.object,
};

export default ResultAnswer;
