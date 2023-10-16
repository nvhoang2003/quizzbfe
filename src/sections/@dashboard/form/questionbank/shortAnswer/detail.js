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

//---------------------------------------------------

Detail.propTypes = {
  currentLevel: PropTypes.object,

};
export default function Detail({ currentLevel }) {
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
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Card sx={{ p: 5 }} >
            <Typography variant="h4" sx={{ color: "text", mb: 3 }}>
              Chi tiết câu hỏi
            </Typography>
            <Card sx={{ p: 5 }}>
              <Stack
                divider={<Divider variant="middle" />}
                spacing={3}
              >
                <ShortAnswerQuestion question={currentLevel} numberQuestion={1} answerResult={answerResult} setAnswerResult={setAnswerResult} isSubmit={submit} />
              </Stack>
            </Card>

            <ResultShortAnswerQuestion questionResult={currentLevel} answerResult={answerResult} isSubmit={submit} />

          </Card>
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 3 }}>
            <LoadingButton
              variant="contained"
              disabled={!submit}
              onClick={() => restart()}
            >
              Start again
            </LoadingButton>

            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
              disabled={submit}
            >
              Submit and finish
            </LoadingButton>

            <LoadingButton
              variant="contained"
              onClick={() => close()}
            >
              Close preview
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>
    </Container>
  );
}
