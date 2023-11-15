import DoMatchQuestion from "@/sections/@dashboard/doQuiz/doMatchQuestion";
import DoMultiChoiceQuestion from "@/sections/@dashboard/doQuiz/doMultiChoiceQuestion";
import DoTrueFalseQuestion from "@/sections/@dashboard/doQuiz/doTrueFalseQuestion";
import { Box, Container, Stack } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TopicShortQuestion from "./topic/topicShortAnswerQuestion";
import TopicMultiChoiceQuestion from "./topic/topicMultiChoiceQuestion";
import TopicTrueFalseQuestion from "./topic/topicTrueFalseQuestion";
import TopicMatchQuestion from "./topic/topicMatchQuestion";

//------------------------------------------------------------------------
export default function Topic(prop) {

  const router = useRouter();

  const { listQuiz } = prop;
  const [filter, setFilter] = useState({
    pageIndex: 1,
    pageSize: 10,
  });

  // const showBreadCrumbs = (status) => {
  //   props.changeBreadCrumbsStatus(status);
  // };
  // useEffect(() => {
  //   showBreadCrumbs(true);
  // }, []);

  return (
    <>
      <Head>
        <title>Danh sách đề thi</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack className="center-item" spacing={3}>
              <Stack justifyContent="center" alignItems="center" spacing={2}>
                {listQuiz &&
                  listQuiz.map((item, index) => {
                    switch (item.questionsType) {
                      case "ShortAnswer":
                        return (
                          <TopicShortQuestion
                            key={index}
                            questionTopic={item}
                            // quizSubmit={quizSubmit}
                            // setQuizSubmit={setQuizSubmit}
                            number={index + 1}
                          />
                        );
                      case "Match":
                        return (
                          <TopicMatchQuestion
                            key={index}
                            questionTopic={item}
                            // quizSubmit={quizSubmit}
                            // setQuizSubmit={setQuizSubmit}
                            number={index + 1}
                          />
                        );
                      case "TrueFalse":
                        return (
                          <TopicTrueFalseQuestion
                            key={index}
                            questionTopic={item}
                            // quizSubmit={quizSubmit}
                            // setQuizSubmit={setQuizSubmit}
                            number={index + 1}
                          />
                        );
                      case "MultiChoice":
                        return (
                          <TopicMultiChoiceQuestion
                            key={index}
                            questionTopic={item}
                            // quizSubmit={quizSubmit}
                            // setQuizSubmit={setQuizSubmit}
                            number={index + 1}
                          />
                        );
                      // case 'DragAndDropIntoText':
                      //   return <DoDragAndDropQuestion key={index} currentLevel={item} drag={drag} setDrag={setDrag} numbers={index + 1} />;
                      default:
                        return null;
                    }
                  })}
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
}