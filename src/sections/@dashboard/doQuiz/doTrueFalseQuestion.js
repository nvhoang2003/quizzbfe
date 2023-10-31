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
import DoTrueFalse from "./doTrueFalse";

//---------------------------------------------------


export default function DoTrueFalseQuestion(props) {
  const {currentLevel, truefasle, setTruefalse,number} = props;
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
      {/* <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}> */}
        <Stack spacing={3}>
            <Card sx={{ p: 5 }}>
              <Stack
                divider={<Divider variant="middle" />}
                spacing={3}
              >
                <DoTrueFalse question={currentLevel} numberQuestion={number} answerResult={truefasle} setAnswerResult={setTruefalse} isSubmit={submit} />
              </Stack>
          </Card>
        </Stack>
      {/* </FormProvider> */}
     
    </Container>
  );
}
