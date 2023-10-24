import React, { useMemo, useState, useEffect } from "react";
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
import DragAndDropQuestion, { Blank } from "@/components/question-information/DragAndDrop/DragAndDropQuestion";

//---------------------------------------------------


export default function FormDetailMultichoice(props) {
  const { currentLevel } = props;
  const { push } = useRouter();
  const [number, setNumber] = useState([]);
  const [wrong, setWrong] = useState([]);
  const [correct, setCorrect] = useState([]);
  const [content, setContent] = useState([]);

  // const [submit, setSubmit] = useState(false);

  const methods = useForm({
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  useEffect(() => {
    const array = [];
    const arr = [];
    const regex = /\[\[.*?\]\]/g;
    const text = currentLevel.content;
    const results = text?.split(regex);
    const result = text?.match(/\[\[(\d+)\]\]/g)?.map(match => match.replace(/\[|\]/g, ''));

    if (result) {
      arr.push(...result);
    }
    setNumber(arr.length);
    if (results) {
      array.push(...results);
    }

    setContent(array)
  }, [currentLevel]);


  useEffect(() => {
    setCorrect([]);
    setWrong([]);
    const maxIterations = parseInt(number);
    if (!isNaN(maxIterations) && maxIterations >= 0) {
      const flattenedAnswers = currentLevel?.answers?.flat();
      const limitedAnswers = flattenedAnswers?.slice(0, maxIterations).flat();
      const lAnswers = flattenedAnswers?.slice(maxIterations, flattenedAnswers.length)?.flat();
      if (limitedAnswers) {
        limitedAnswers.forEach((item) => {
          const c = [];
          c.push(item.answer);
          setCorrect((prevCorrect) => prevCorrect.concat(c));
        });

      }
      if (lAnswers) {
        lAnswers.forEach((item) => {
          const a = [];
          a.push(item.answer);
          setWrong((prevWrong) => prevWrong.concat(a));
        });
      }
    }
  }, [currentLevel, number]);

  useEffect(() => {
  }, [correct, wrong]);

  const restart = () => {
    window.location.reload(true);
  }

  const onSubmit = async () => {
    setSubmit(true);
  };

  // useEffect(() => {
  // }, [submit]);


  return (
    <Container maxWidth="100%">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Card sx={{ p: 5 }} >
            <Typography variant="h4" sx={{ color: "text", mb: 3 }}>
              Chi tiết câu hỏi
            </Typography>
            {(content.length > 0 && correct.length > 0) &&
              <Stack
                divider={<Divider variant="middle" />}//flexItem sx={{ borderStyle: "dashed" }}  //, backgroundColor: '#EEFCEE'
                spacing={3}
              >
                <DragAndDropQuestion
                  taskId="dnd-1"
                  title={currentLevel?.name}
                  wrongAnswers={wrong}
                  correct = {correct}
                  // submit={submit}
                  // setSubmit={setSubmit}
                >                  
                  {content?.map((item, index) => (
                    <React.Fragment key={index}>
                      {item}
                      {index < content.length - 1 && <Blank solution={correct[index]} key={index} />}
                    </React.Fragment>
                  ))}
                </DragAndDropQuestion>
              </Stack>
            }
          </Card>

        </Stack>
      </FormProvider>
    </Container>
  );
}

FormDetailMultichoice.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;


