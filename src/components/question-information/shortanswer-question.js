import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import { Scrollbar } from "../scrollbar/scrollbar";
//----------------------------------------------------------------------

export default function ShortAnswerQuestion(props) {
  const { question, numberQuestion, answerResult, setAnswerResult, isSubmit } =
    props;

  const handleChangeAnswer = (event) => {
    const checkStatus = question.answers.find(
      (answer) =>
        answer.fraction > 0 &&
        answer.content.trim().toLowerCase() ===
          event.target.value.trim().toLowerCase()
    );

    setAnswerResult({
      status: !!checkStatus,
      content: event.target.value,
    });
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
          Câu Hỏi {numberQuestion}: {question?.content}
        </Typography>
        {question?.imageUrl && <img src={question.imageUrl} alt="Image" height="300" width="300" />}

        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography
            className={"fw-semibold"}
            sx={{ fontSize: "0.8rem", mr: 2 }}
          >
            Câu trả lời:
          </Typography>
          <TextField
            disabled={isSubmit}
            size="small"
            onChange={(event) => handleChangeAnswer(event)}
          />
          {isSubmit === true && (
            <span>
              {answerResult.status ? (
                <span>
                  <DoneIcon color="success" />
                </span>
              ) : (
                <span>
                  {" "}
                  <ClearIcon color="error" />
                </span>
              )}
            </span>
          )}
        </div>
      </Box>
    </Box>
  );
}
