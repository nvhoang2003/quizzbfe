import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  IconButton,
  Button,
  SvgIcon,
  Container,
  Stack,
} from "@mui/material";
import Close from "@mui/icons-material/Close";
import QuestionUnchooseItem from "@/sections/@dashboard/list/quiz/question-unchoose-item";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import EmptyContent from "@/components/empty-content/EmptyContent";

export default function ListQuestionDialog(props) {
  const {
    setAddQuestions,
    addQuestions,
    listQuestionUnChoose,
    open,
    onClose,
    listQuestion,
    setListQuestion,
  } = props;
  const [listQuestionChoose, setListQuestionChoose] = useState([]);
  const [listDisplayQuestionChoose, setListDisplayQuestionChoose] = useState(
    []
  );
  const handleClose = () => {
    onClose();
  };

  const handleSelect = (item) => {
    const listId = listQuestionChoose?.map((oneQues) => oneQues.questionId);
    if (listId.includes(item.id)) {
      setListQuestionChoose(
        listQuestionChoose.filter((oneQues) => oneQues.questionId != item.id)
      );
      setListDisplayQuestionChoose([
        ...listDisplayQuestionChoose.filter((oneQues) => oneQues.id != item.id),
      ]);
    } else {
      setListQuestionChoose([
        ...listQuestionChoose,
        {
          questionId: item.id,
          point: item.defaultMark,
        },
      ]);
      setListDisplayQuestionChoose([...listDisplayQuestionChoose, item]);
    }
  };

  const handlebuttonAdd = () => {
    setAddQuestions({
      ...addQuestions,
      questionAddeds: [...addQuestions.questionAddeds, ...listQuestionChoose],
    });
    setListQuestion([...listQuestion, ...listDisplayQuestionChoose]);
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle>Thêm Từ Bộ Câu Hỏi Có Sẵn</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          display: "flex",
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>
      <Stack gap={1} px={3} py={2}>
        {listQuestionUnChoose?.length > 0 ? (
          listQuestionUnChoose?.map((item, index) => (
            <QuestionUnchooseItem
              key={index}
              item={item}
              onSelectRow={() => handleSelect(item)}
            />
          ))
        ) : (
          <EmptyContent
            title={"Chưa có câu hỏi để thêm"}
            sx={{
              '& span.MuiBox-root': { height: 160 },
            }}
          />
        )}
        <Button
          color="primary"
          startIcon={
            <SvgIcon fontSize="small">
              <PlusIcon />
            </SvgIcon>
          }
          variant="contained"
          onClick={handlebuttonAdd}
        >
          Thêm
        </Button>
      </Stack>
    </Dialog>
  );
}
