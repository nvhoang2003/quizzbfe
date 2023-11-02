import { useMemo, useState, useEffect } from "react";
import {
  Container,
  Card,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import _ from "lodash";
import DoShortAnswer from "./doShortAnswer";

//---------------------------------------------------

export default function DoShortQuestion(props) {
  const { currentLevel, quizSubmit, setQuizSubmit, number } = props
  const [submit, setSubmit] = useState(false);
  const [quiz, setQuiz] = useState([]);
  useEffect(() => {
    const updatedQuiz = quizSubmit
      .filter((item) => item.questionId === currentLevel.id);
    setQuiz(updatedQuiz);
  }, [quizSubmit]);

  return (
    <Container maxWidth="100%">
      <Stack spacing={3}>
        <Card sx={{ p: 5 }}>
          <Stack
            divider={<Divider variant="middle" />}
            spacing={3}
          >
            <DoShortAnswer
              question={currentLevel}
              numberQuestion={number}
              answerResult={quizSubmit}
              setAnswerResult={setQuizSubmit}
              quiz={quiz}
              isSubmit={submit} />
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
