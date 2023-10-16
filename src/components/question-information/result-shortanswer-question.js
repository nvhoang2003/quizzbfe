import { Card, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Scrollbar } from "../scrollbar/scrollbar";

//---------------------------------------------------

export default function ResultShortAnswerQuestion(props) {
  const { questionResult, isSubmit, answerResult } = props;
  const [correctAnswers, setCorrectAnswers] = useState([]);

  useEffect(() => {
    setCorrectAnswers(
      questionResult?.answers?.filter((item, index) => item.fraction > 0)
    );
  }, [questionResult]);

  return (
    <Stack spacing={3} sx={{ paddingTop: "20px" }}>
      {isSubmit === true ? (
        <Card sx={{ p: 5, backgroundColor: answerResult.status ? "#c8e6c9" : "#FCEEEE" }}>
          <Scrollbar>
            {answerResult.content ? (
              <span>
                Câu trả lời của bạn {answerResult.status ? "Đúng" : "Sai"}.
              </span>
            ) : (
              <span>Bạn cần trả lời câu hỏi trước.</span>
            )}

            <br />
            <div className="d-flex">
              {correctAnswers.length > 0 ? (
                <span>Đáp án của câu hỏi là : </span>
              ) : (
                <span>Câu hỏi chưa có câu trả lời nào chính xác!</span>
              )}
              {correctAnswers.map((item, index) => {
                let answerCorrect = "";
                answerCorrect += `"${item.content}" (${
                  item.fraction.toFixed(4) * 100
                }%)`;

                if (correctAnswers.length - 1 !== index) {
                  answerCorrect += " hoặc ";
                }

                return (
                  <span key={index}>
                    {answerCorrect}
                  </span>
                );
              })}
            </div>
          </Scrollbar>
        </Card>
      ) : (
        <Card></Card>
      )}
    </Stack>
  );
}
