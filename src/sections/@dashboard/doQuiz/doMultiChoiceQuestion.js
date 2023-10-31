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
import ResultQuestion from "@/components/question-information/resultMultichoiceQuestion";
import { useRouter } from "next/router";
import DoOneChoice from "./doOneChoice";
import DoMultiChoice from "./doMultiChoice";

//---------------------------------------------------

DoMultiChoiceQuestion.propTypes = {
  currentLevel: PropTypes.object,

};
export default function DoMultiChoiceQuestion(props) {
  const { currentLevel, multiChoice, setMultiChoice, number } = props;
  const { push } = useRouter();
  const [answerResult, setAnswerResult] = useState([]);
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
      {/* <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}> */}
      <Stack spacing={3}>
        <Card sx={{ p: 5 }}>
          <Stack
            divider={<Divider variant="middle" />}//flexItem sx={{ borderStyle: "dashed" }}  //, backgroundColor: '#EEFCEE'
            spacing={3}
          >
            {isMultiRightAnswer(currentLevel) ?
              <DoMultiChoice question={currentLevel} numberQuestion={number} answerResult={multiChoice} setAnswerResult={setMultiChoice} isSubmit={submit} /> //

              : <DoOneChoice question={currentLevel} numberQuestion={number} answerResult={multiChoice} setAnswerResult={setMultiChoice} isSubmit={submit} />

            }

          </Stack>

        </Card>
      </Stack>
      {/* </FormProvider> */}
    </Container>
  );
}

