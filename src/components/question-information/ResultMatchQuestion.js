import { Card, Stack } from "@mui/material";
import { useEffect, useState } from "react";

//---------------------------------------------------

export default function ResultMatchQuestion(props) {
  const { questionResult, isSubmit, answerResult } = props;
  return (
    <Stack spacing={3} sx={{ paddingTop: "20px" }}>
      {isSubmit === true ? (
        <Card
          sx={{
            p: 5,
            backgroundColor:
              answerResult.status === "Đúng" && answerResult?.answer?.length > 0
                ? "#A9D097"
                : "#FCEEEE",
          }}
        >
          {answerResult?.answer?.length > 0 ? (
            <span>Câu trả lời của bạn {answerResult.status}.</span>
          ) : (
            <span>Bạn cần chọn câu trả lời trước.</span>
          )}
          <br />

          <span>Đáp án của câu hỏi là : </span>
          {questionResult.matchSubQuestionBanks
            .filter((item) => item.questionText !== "")
            .map(
              (item, index) =>
                item.questionText !== null && (
                  <span
                    key={index}
                    style={{ paddingLeft: "30px", display: "block" }}
                  >
                    {item.questionText} &rarr; {item.answerText}
                  </span>
                )
            )}
        </Card>
      ) : (
        <Card></Card>
      )}
    </Stack>
  );
}
