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
import TrueFalseQuestion from "@/components/question-information/TrueFalseQuestion";
import ResultTruFalseQuestion from "@/components/question-information/resultTrueFalseQuestion";

//---------------------------------------------------

FormDetailTrueFalse.propTypes = {
  currentLevel: PropTypes.object,
};
export default function FormDetailTrueFalse({ currentLevel }) {
  const { push } = useRouter();

  const [answerResult, setAnswerResult] = useState([]);
  const [submit, setSubmit] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);

  const question = urlParams.get('question');


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
    if (question) {
      push("/question");
    } else {
      push("/questionbank");
    }


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
                <TrueFalseQuestion question={currentLevel} numberQuestion={1} answerResult={answerResult} setAnswerResult={setAnswerResult} isSubmit={submit} />
              </Stack>
            </Card>

            <ResultTruFalseQuestion questionResult={currentLevel} answerResult={answerResult} isSubmit={submit} />

          </Card>
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 3 }}>
            <LoadingButton
              variant="contained"
              disabled={!submit}
              onClick={() => restart()}
            >
              Làm Lại
            </LoadingButton>

            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
              disabled={submit}
            >
              Kiểm Tra Đáp Án
            </LoadingButton>

            <LoadingButton
              variant="contained"
              onClick={() => close()}
            >
              Trở Về
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>

    </Container>
  );
}

FormDetailTrueFalse.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
