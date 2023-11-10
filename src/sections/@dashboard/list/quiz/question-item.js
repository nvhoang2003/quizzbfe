import {
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import QuestionTypeIcon from "@/sections/@dashboard/icon/questiontype-icon";
import { DeleteOutline } from "@mui/icons-material";

const QuestionItem = ({
  question,
  index,
  addQuestions,
  setAddQuestions,
  listQuestion,
  setListQuestion,
}) => {
  const handleChangeMark = (value) => {
    const newAddQuestions = {
      ...addQuestions,
    };
    newAddQuestions.questionAddeds[index].point = parseFloat(value);
    setAddQuestions(newAddQuestions);
  };

  const handleDeleteAddQuestion = () => {
    const newAddQuestions = {
      ...addQuestions,
    };
    newAddQuestions.questionAddeds.splice(index, 1);

    const newListQuestion = [...listQuestion];
    newListQuestion.splice(index, 1);

    setListQuestion(newListQuestion);
    setAddQuestions(newAddQuestions);
  };

  return (
    <Stack
      p={1.25}
      display="flex"
      flexDirection="row"
      alignItems="center"
      alignSelf="stretch"
      justifyContent="space-between"
      gap={1.25}
      sx={{
        backgroundColor: "#f2f4f7",
      }}
    >
      <Stack
        display="flex"
        flexDirection="row"
        alignItems="center"
        gap={1.25}
        width="80%"
      >
        <Stack
          p={1.25}
          py={0.625}
          minWidth={50}
          height={34}
          alignItems={"center"}
          sx={{
            backgroundColor: "#D2D1D4",
          }}
        >
          <Typography fontWeight={700} noWrap>
            {index + 1}
          </Typography>
        </Stack>
        <QuestionTypeIcon questionType={question.questionsType} />
        <Typography textTransform="capitalize" noWrap>
          {question.name}
        </Typography>
        <Typography
          textTransform="capitalize"
          sx={{
            opacity: 0.6,
          }}
          noWrap
        >
          {question.content}
        </Typography>
      </Stack>
      <Stack
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="end"
        gap={1.25}
      >
        <Tooltip title="Delete">
          <IconButton onClick={() => handleDeleteAddQuestion()}>
            <DeleteOutline color="error" />
          </IconButton>
        </Tooltip>

        <Stack>
          <TextField
            label="Điểm"
            size="small"
            type="number"
            inputProps={{
              step: "0.1",
              min: 0,
            }}
            value={addQuestions?.questionAddeds?.at(index)?.point}
            onChange={(value) => handleChangeMark(event.target.value)}
            sx={{
              width: 100,
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default QuestionItem;
