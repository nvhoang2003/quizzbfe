import { useMemo, useState, useEffect } from "react";
import {
  Container,
  Card,
  Divider,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { LoadingButton } from "@mui/lab";
import PropTypes from "prop-types";
import _ from "lodash";
import { Controller, useForm } from "react-hook-form";
import FormProvider from "@/components/form/FormProvider";
import MultiChoiceQuestion from "@/components/question-information/MultiChoiceQuestion";
import OneChoiceQuestion from "@/components/question-information/OneChoiceQuestion";
import { useRouter } from "next/router";
import MatchQuestion from "@/components/question-information/MatchQuestion";
import ResultMatchQuestion from "@/components/question-information/ResultMatchQuestion";
import DoMatch from "./doMatch";

// DoMatchQuestion.propTypes = {
//   currentLevel: PropTypes.object,
// };

export default function DoMatchQuestion(props) {
  //quizSubmit={quizSubmit} setQuizSubmit={setQuizSubmit}
  const { currentLevel, quizSubmit, setQuizSubmit, number } = props;
  const { push } = useRouter();
  const [submit, setSubmit] = useState(false);
  const [quiz, setQuiz] = useState([]);
  // console.log(quizSubmit);
  // console.log(currentLevel);
  useEffect(() => {
    const updatedQuiz = quizSubmit
      .filter((item) => item.questionId === currentLevel.id);
    // console.log(updatedQuiz);
    setQuiz(updatedQuiz);
  }, [quizSubmit]);

  useEffect(() => {
  }, [submit]);

  return (
    <Container maxWidth="100%">
      <Stack spacing={3}>
        <Card sx={{ p: 5 }}>
          <Box sx={{
            bgcolor: 'background.paper',
            borderTop: 'solid 1px',
            paddingTop: '30px',
          }}>
            <Stack
              spacing={3}
            >

              <Typography sx={{ fontWeight: 'bold' }}> Câu hỏi {number} : {currentLevel?.content}</Typography>
              <DoMatch
                question={currentLevel}
                numberQuestion={number}
                answerResult={quizSubmit}
                setAnswerResult={setQuizSubmit}
                isSubmit={submit}
                quiz={quiz}
              />

            </Stack>
          </Box>
        </Card>
      </Stack>

      {/* </FormProvider> */}
    </Container >
  )
}
