import { useMemo, useState, useEffect } from "react";
import {
  Container,
  Card,
  Divider,
  Stack,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
  Radio,
  FormGroup,
} from "@mui/material";
import _ from "lodash";
import { getQuestionById } from "@/dataProvider/questionApi";

//---------------------------------------------------

export default function TopicMultiChoiceQuestion(props) {
  const { currentLevel, quizSubmit, setQuizSubmit, number, questionTopic } = props
  const [submit, setSubmit] = useState(false);
  const [quiz, setQuiz] = useState([]);

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
      q.questionAnswers?.forEach(element => {
        transformData.answers.push({
          id: element.id,
          feedback: element.feedback,
          answer: element.content,
          fraction: element.fraction,
          quizBankId: element.quizBankId
        });
      });
      setQuiz(transformData);
      // props.changeLastPath(transformData.name)
    } else {
      return res;
    }
  };

  useEffect(() => {
    fetchQuestionByID(questionTopic.id);
  }, []);

  const isMultiRightAnswer = (currentQuestion) => {
    const totalRightAnswers = currentQuestion?.answers?.reduce((total, item) => {
      return total + (item.fraction > 0 ? 1 : 0);
    }, 0);
    return totalRightAnswers > 1;
  }


  return (
    <Container maxWidth="100%">
      <Stack spacing={3}>
        <Card sx={{ p: 5 }}>
          <Stack
            divider={<Divider variant="middle" />}
            spacing={3}
          >
            <Box sx={{ py: 3 }}>
              <Typography sx={{ fontWeight: "bold" }}>
                Câu hỏi {number} :  {quiz?.content}
              </Typography>
              <Typography sx={{ fontSize: "12px" }}>
                Chọn nhiều đáp án
              </Typography>
              {quiz?.imageUrl && <img src={quiz.imageUrl} alt="Image" height="300" width="300" />}
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={2}>
                {quiz?.answers?.map((item, index) => (
                  <FormControlLabel key={index}
                    sx={{ paddingLeft: "30px" }}
                    control={
                      isMultiRightAnswer(quiz) ? (
                        <Checkbox disabled={true} />
                      ) : (
                        <Radio disabled={true} />
                      )
                    }
                    label={
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body1">{item?.answer}</Typography>
                      </div>
                    }
                  />
                ))}
              </Stack>
            </Box>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
