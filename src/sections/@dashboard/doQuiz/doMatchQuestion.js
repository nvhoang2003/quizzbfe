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
  const{currentLevel, quizSubmit, setQuizSubmit , number} = props;
  const { push } = useRouter();
  const [submit, setSubmit] = useState(false);

  const methods = useForm({
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const restart = () => {
    window.location.reload(true);
  }

  const close = () => {
    push("/questionbank");
  }

  const onSubmit = async () => {
    setSubmit(true);
  };

  useEffect(() => {
  }, [submit]);

  return (
    <Container maxWidth="100%">
      {/* <FormProvider> */}
        <Stack spacing={3}>
          <Card sx={{ p: 5 }}>
            <Stack
              divider={<Divider variant="middle" />}//flexItem sx={{ borderStyle: "dashed" }}  //, backgroundColor: '#EEFCEE'
              spacing={3}
            >
              <Typography sx={{ fontWeight: 'bold' }}> Câu hỏi {number} : {currentLevel?.content}</Typography>
              <DoMatch
                question={currentLevel}
                numberQuestion={number}
                answerResult={quizSubmit}
                setAnswerResult={setQuizSubmit}
                isSubmit={submit}
              />
            </Stack>
          </Card>
        </Stack>
      {/* </FormProvider> */}
    </Container>
  )
}
