import { useMemo, useState, useEffect } from "react";
import {
  Container,
  Card,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { LoadingButton } from "@mui/lab";
import PropTypes from "prop-types";
import _ from "lodash";
import { Controller, useForm } from "react-hook-form";
import FormProvider from "@/components/form/FormProvider";
import { useRouter } from "next/router";
import ResultShortAnswerQuestion from "@/components/question-information/result-shortanswer-question";
import ShortAnswerQuestion from "@/components/question-information/shortanswer-question";
import DoShortAnswer from "./doShortAnswer";

//---------------------------------------------------

export default function DoShortQuestion(props) {
  const { currentLevel, shortAnswer, setShortAnswer,number } = props

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
            <DoShortAnswer question={currentLevel} numberQuestion={number} answerResult={shortAnswer} setAnswerResult={setShortAnswer} isSubmit={submit} />
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
