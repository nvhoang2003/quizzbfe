import { useMemo, useState, useEffect } from "react";
import {
  Container,
  Card,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import _ from "lodash";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import DoOneChoice from "./doOneChoice";
import DoMultiChoice from "./doMultiChoice";

//---------------------------------------------------

export default function DoMultiChoiceQuestion(props) {
  const { currentLevel, quizSubmit, setQuizSubmit, number } = props;
  const { push } = useRouter();
  const [submit, setSubmit] = useState(false);

  const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    const updatedQuiz = quizSubmit
      .filter((item) => item.questionId === currentLevel.id);
    setQuiz(updatedQuiz);
  }, [quizSubmit]);


  const isMultiRightAnswer = (currentQuestion) => {
    const totalRightAnswers = currentQuestion?.questionAnswers?.reduce((total, item) => {
      return total + (item.fraction > 0 ? 1 : 0);
    }, 0);
    return totalRightAnswers > 1;
  }


  useEffect(() => {
  }, [submit]);



  return (
    <Container maxWidth="100%">
      <Stack spacing={3}>
        <Card sx={{ p: 5 }}>
          <Stack
            divider={<Divider variant="middle" />}//flexItem sx={{ borderStyle: "dashed" }}  //, backgroundColor: '#EEFCEE'
            spacing={3}
          >
            {isMultiRightAnswer(currentLevel) ?
              <DoMultiChoice
                question={currentLevel}
                numberQuestion={number}
                answerResult={quizSubmit}
                setAnswerResult={setQuizSubmit}
                quiz={quiz}
                isSubmit={submit} /> //

              : <DoOneChoice
                question={currentLevel}
                numberQuestion={number}
                answerResult={quizSubmit}
                setAnswerResult={setQuizSubmit}
                quiz={quiz}
                isSubmit={submit} />

            }

          </Stack>

        </Card>
      </Stack>
    </Container>
  );
}

