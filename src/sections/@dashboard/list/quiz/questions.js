import { Button, Stack, SvgIcon, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import QuestionItem from "@/sections/@dashboard/list/quiz/question-item";
import { BaseIncrement, IncrementerButton } from "@/components/custom-input";
import { LoadingButton } from "@mui/lab";
import {
  Close,
  DoneAll,
  KeyboardDoubleArrowLeft,
  Save,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import {
  postAddQuestion,
  putEditQuiz,
  putEditQuizPoint,
} from "@/dataProvider/quizApi";
import { getAllQuestion } from "@/dataProvider/questionApi";
import snackbarUtils from "@/utils/snackbar-utils";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import ListQuestionDialog from "@/components/list-question-dialog/ListQuestionDialog";

const Questions = ({ quiz }) => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [listQuestion, setListQuestion] = useState([]);
  const [pointToPass, setPointToPass] = useState(0);
  const [mark, setMark] = useState(0);
  const [addQuestions, setAddQuestions] = useState({
    quizzId: 0,
    questionAddeds: [
      {
        questionId: 0,
        point: 0,
      },
    ],
  });
  const [open, setOpen] = useState(false);
  const [listQuestionUnChoose, setListQuestionUnChoose] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handelOpenDialog = () => {
    setOpen(true);
  };

  const switchToIndexPage = () => {
    router.push("/quiz");
  };

  const switchToEditPage = () => {
    router.push(`/quiz/${quiz?.id}/edit`);
  };

  const handleSave = () => {
    fetchAddQuestion();
  };

  const convertToRequestData = (data) => {
    return {
      courseid: data.courseid ?? 5,
      name: data.name,
      description: data.description,
      timeOpen: data.timeOpen,
      timeClose: data.timeClose,
      timeLimit: data?.timeLimit?.toString(),
      naveMethod: "string",
      overduehanding: "string",
      preferedBehavior: "string",
      maxPoint: mark ?? 0,
      pointToPass: pointToPass ?? 0,
      isPublic: data.isPublic,
    };
  };
  const fetchListQuestion = async () => {
    const filter = {
      pageIndex: 1,
      pageSize: 50,
    };
    const res = await getAllQuestion(filter);
    if (res.status < 400) {
      setListQuestionUnChoose(res.data.data);
    } else {
      snackbarUtils.error(res.message);
    }
  };

  const fetchAddQuestion = async () => {
    setIsSubmitting(true);
    const transformQuizData = convertToRequestData(quiz);
    const resEditQuiz = await putEditQuiz(quiz?.id, {
      ...transformQuizData,
      pointToPass: pointToPass,
      maxPoint: mark,
    });

    if (resEditQuiz.status < 400) {
      const resEditQuizData = resEditQuiz?.data;

      const resAddQuestion = await postAddQuestion(addQuestions);

      if (resAddQuestion.status < 400) {
        snackbarUtils.success(
          resAddQuestion?.data?.message || "Lưu Thành Công"
        );
        switchToIndexPage();
      } else {
        snackbarUtils.error("Lưu Thất Bại");
      }
    } else {
      snackbarUtils.error("Lưu Thất Bại");
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    setListQuestion(quiz?.listQuestion ?? []);
    setAddQuestions({
      quizzId: quiz?.id,
      questionAddeds: quiz?.listQuestion?.map((item) => {
        return {
          questionId: item?.id,
          point: item.defaultMark || 0,
        };
      }),
    });
    setMark(quiz?.maxPoint);
    setPointToPass(quiz?.pointToPass);
  }, [quiz]);

  useEffect(() => {
    let newMark = 0;

    addQuestions.questionAddeds?.forEach((item) => {
      newMark += item.point;
    });

    setMark(parseFloat(newMark.toFixed(1)));
  }, [addQuestions]);

  useEffect(() => {

    if (listQuestionUnChoose.length === 0) {
      fetchListQuestion();
    } else {
      if (!!addQuestions.quizzId) {
        setListQuestionUnChoose(
          listQuestionUnChoose.filter(
            (obj) =>
              !addQuestions?.questionAddeds.some(
                (item) => item.questionId == obj.id
              )
          )
        );
      }
    }
  }, [addQuestions]);

  return (
    <Stack gap={1}>
      <Stack
        sx={{
          ml: "auto",
        }}
      >
        <Button
          color="primary"
          startIcon={
            <SvgIcon fontSize="small">
              <PlusIcon />
            </SvgIcon>
          }
          variant="contained"
          onClick={handelOpenDialog}
        >
          Thêm
        </Button>
      </Stack>
      <Stack
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="end"
        pr={1}
      >
        <Typography fontWeight={600} pr={1}>
          Điểm đạt:
        </Typography>
        <BaseIncrement
          quantity={pointToPass}
          min={0}
          max={mark}
          setQuantity={setPointToPass}
          sx={{
            top: 1,
          }}
        />
        <Typography pr={2} fontWeight={700}>
          /
        </Typography>
        <Typography fontWeight={600} pr={1}>
          Điểm tối đa:
        </Typography>
        <Typography>{mark}</Typography>
      </Stack>
      {listQuestion?.map((item, index) => (
        <QuestionItem
          key={index}
          question={item}
          index={index}
          listQuestion={listQuestion}
          setListQuestion={setListQuestion}
          addQuestions={addQuestions}
          setAddQuestions={setAddQuestions}
        />
      ))}
      <Stack
        display="flex"
        flexWrap="wrap"
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{
          px: 2,
          pt: 2,
          gap: 1,
          // position: 'absolute',
          bottom: 10,
          right: 0,
        }}
      >
        <LoadingButton
          color="inherit"
          startIcon={
            <SvgIcon>
              <Close />
            </SvgIcon>
          }
          onClick={() => {
            switchToIndexPage();
          }}
          variant="text"
          loading={false}
        >
          Hủy
        </LoadingButton>
        <LoadingButton
          color="inherit"
          startIcon={
            <SvgIcon>
              <KeyboardDoubleArrowLeft />
            </SvgIcon>
          }
          onClick={() => {
            switchToEditPage();
          }}
          variant="text"
          loading={false}
        >
          Quay lại
        </LoadingButton>
        <LoadingButton
          color="primary"
          startIcon={
            <SvgIcon>
              <Save />
            </SvgIcon>
          }
          variant="contained"
          loading={false}
          onClick={() => {
            handleSave();
          }}
        >
          Lưu
        </LoadingButton>
      </Stack>
      <ListQuestionDialog
        open={open}
        onClose={handleClose}
        listQuestionUnChoose={listQuestionUnChoose}
        setAddQuestions={setAddQuestions}
        addQuestions={addQuestions}
        listQuestion={listQuestion}
        setListQuestion={setListQuestion}
      />
    </Stack>
  );
};

export default Questions;
