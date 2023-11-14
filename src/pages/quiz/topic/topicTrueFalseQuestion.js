import { useMemo, useState, useEffect } from "react";
import {
  Container,
  Card,
  Divider,
  Stack,
  Typography,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import _ from "lodash";
import { getQuestionById } from "@/dataProvider/questionApi";

//---------------------------------------------------

export default function TopicTrueFalseQuestion(props) {
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

  return (
    <Container maxWidth="100%">
      <Stack spacing={3}>
        <Card sx={{ p: 5 }}>
          <Stack
            divider={<Divider variant="middle" />}
            spacing={3}
          >

            <Stack
              divider={<Divider variant="middle" />}
              spacing={3}
            >

              <Box sx={{ py: 3, }}>
                <Typography sx={{ fontWeight: 'bold' }}>Câu Hỏi {number}: {quiz?.content}</Typography>
                {quiz?.imageUrl && <img src={quiz.imageUrl} alt="Image" height="300" width="300" />}
                <Typography sx={{ fontSize: '12px' }}>Chọn Một Đáp Án</Typography>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={''}
                  name="radio-buttons-group"
                  sx={{ py: 3,  paddingLeft: "30px" }}
                  // sx={{ paddingLeft: "30px" }}
                >
                  {quiz?.answers?.map((item, index) => (
                    <FormControlLabel
                      value={item?.id}
                      key={index}
                      control={<Radio />}
                      label={
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="body1">{item?.answer}</Typography>
                        </div>
                      }

                    />
                  ))}
                </RadioGroup>
              </Box>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
