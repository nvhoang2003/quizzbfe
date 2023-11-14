import { useMemo, useState, useEffect } from "react";
import {
  Container,
  Card,
  Divider,
  Stack,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import _ from "lodash";
import { getQuestionById } from "@/dataProvider/questionApi";
import { ta } from "date-fns/locale";

//---------------------------------------------------

export default function TopicMatchQuestion(props) {
  const { currentLevel, quizSubmit, setQuizSubmit, number, questionTopic } = props
  const [submit, setSubmit] = useState(false);
  const [quiz, setQuiz] = useState([]);
  const [listSubAnswer, setListSubAnswer] = useState([]);

  async function fetchQuestionByID(id) {
    const res = await getQuestionById(id);

    if (res.status < 400) {
      const q = res.data.data;
      const transformData = {
        id: q.id,
        name: q.name,
        generalfeedback: q.generalfeedback,
        content: q.content,
        defaultMark: q.defaultMark,
        categoryId: q.categoryId,
        tagId: [],
        answers: [],
        isPublic: q.isPublic,
        authorId: q.authorId,
        imageUrl: q.imageUrl
      };

      q.matchSubQuestions?.forEach(element => {
        transformData.answers.push({
          id: element.id,
          questionText: element.questionText,
          answerText: element.answerText,
          questionId: element.questionId
        });
      });
      setQuiz(transformData);
      setListSubAnswer(transformData.answers);
      // props.changeLastPath(transformData.name)
    } else {
      return res;
    }
  };

  useEffect(() => {
    fetchQuestionByID(questionTopic.id);
  }, []);

  return (
    <Container maxWidth="100%">
      <Stack spacing={3}>
        <Card sx={{ p: 5 }}>
          <Stack
            divider={<Divider variant="middle" />}
            spacing={3}
          >
            <Box sx={{ py: 3, }}>
              <Typography sx={{ fontWeight: 'bold' }}>Câu Hỏi {number}: {quiz?.content}</Typography>

              {quiz?.answers?.map((item, index) => (
                <Stack direction="row" spacing={3} key={item.questionText} sx={{ my: 3, paddingLeft: "40px" }}>
                  <Typography sx={{ fontWeight: 'bold', m: 3 }}>{item.questionText}</Typography>
                  {item.questionText && item.questionText !== null && (
                    <>
                      <FormControl sx={{ m: 1, minWidth: 120, width: 250 }} >
                        <InputLabel id="demo-simple-select-label">Vui lòng chọn câu trả lời</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id={item.questionText}
                          // label="Câu trả lời"
                          value={''}
                        // disabled={isSubmit}
                        >

                          <MenuItem value="" name="answer">Vui lòng chọn câu trả lời</MenuItem>
                          {listSubAnswer?.map((subAnswer, answerIndex) => (
                            <MenuItem key={answerIndex} name="answer">{subAnswer.answerText}</MenuItem>
                          ))}

                        </Select>
                      </FormControl>
                    </>
                  )}
                </Stack>
              ))}
            </Box>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
