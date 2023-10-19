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

  const [submit, setSubmit] = useState(false);

  const methods = useForm({
  });

  // const results = currentLevel?.content?.split(/\[\[\d\]\]/);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  // export default function QuestionContent({ text }) {
  //   const parts = text?.split(/\[\[\d\]\]/);
  //   console.log(parts);

  //   const regex = /\[\[(.*?)\]\]/g;
  //   const matches = text.match(regex);

  //   const values = matches.map(match => match.replace(/\[\[(.*?)\]\]/g, '$1'));

  //   return (
  //     <Stack direction='row' className='center-item'>
  //       {parts?.map((part, index) => (
  //         <React.Fragment key={index}>
  //           {part}
  //           {index < parts.length - 1 && <Blank id={values[index]} />}
  //         </React.Fragment>
  //       ))}
  //     </Stack>
  //   )
  // }

  useEffect(() => {
    const array = [];
    const arr = [];
    const regex = /\[\[.*?\]\]/g;
    const text = currentLevel.content;
    const results = text?.split(regex);
    // const results = text?.split(/\[\[\d\]\]/);

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

  console.log(content);

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
    // console.log(correct);
    // console.log(wrong);
  }, [correct, wrong]);

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
  console.log(content);


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
                >

                  {content?.map((item, index) => (
                    <React.Fragment key={index}>
                      {item}
                      <Blank solution={correct[index]} key={index} />
                    </React.Fragment>
                  ))}

                      {/* {content[0]}
                      <Blank solution={correct[0]} key={0} />
                      {content[1]}
                      <Blank solution={correct[1]} key={1} />
                      {content[2]} */}
                   





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


