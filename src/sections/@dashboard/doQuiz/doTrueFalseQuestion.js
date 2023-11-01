import { useMemo, useState, useEffect } from "react";
import {
  Container,
  Card,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import _ from "lodash";
import DoTrueFalse from "./doTrueFalse";

//---------------------------------------------------


export default function DoTrueFalseQuestion(props) {
  const { currentLevel, quizSubmit, setQuizSubmit, number } = props;
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
  }, [submit]);

  return (
    <Container maxWidth="100%">
      <Stack spacing={3}>
        <Card sx={{ p: 5 }}>
          <Stack
            divider={<Divider variant="middle" />}
            spacing={3}
          >
            <DoTrueFalse
              question={currentLevel}
              numberQuestion={number}
              answerResult={quizSubmit}
              setAnswerResult={setQuizSubmit}
              />
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
