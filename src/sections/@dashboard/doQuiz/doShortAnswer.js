import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
//----------------------------------------------------------------------

export default function DoShortAnswer(props) {
  const { question, numberQuestion, answerResult, setAnswerResult, quiz, isSubmit } = props;
  const handleChangeAnswer = (event) => {

    var newListAnswer = answerResult?.filter(item => item.questionId !== question.id);

    setAnswerResult([...newListAnswer, {
      questionId: question.id,
      questionType: question.questionsType,
      shortAnswerChoosen: event.target.value
    }
    ]);

  };

  return (
    <Box
      sx={{
        display: "flex",
        p: 1,
        m: 1,
        bgcolor: "background.paper",
        borderTop: "solid 1px",
        width: 1,
      }}
    >
      <Box sx={{ py: 3 }}>
        <Typography sx={{ fontWeight: "bold" }}>
          Câu hỏi {numberQuestion} : {question?.content}
        </Typography>
        {question?.imageUrl && <img src={question.imageUrl} alt="Image" height="300" width="300" />}

        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography
            className={"fw-semibold"}
            sx={{ mr: 2 }}//fontSize: "0.8rem",
          >
            Câu trả lời:
          </Typography>
          <TextField
            disabled={isSubmit}
            size="small"
            value={quiz.length > 0 ? quiz[0]?.shortAnswerChoosen : ""}
            onChange={(event) => handleChangeAnswer(event)}
          />
        </div>
      </Box>
    </Box>
  );
}
