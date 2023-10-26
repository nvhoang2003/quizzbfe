import PropTypes from "prop-types";
import React, { useState, useMemo } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  ButtonGroup
} from "@chakra-ui/react";
import { FiRotateCcw } from "react-icons/fi";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useConfetti } from "@/hooks/useConfetti";
import { WORD_BANK, getCorrectAnswers } from "@/utils/drag-and-drop";
import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useRouter } from "next/router";
//---------------------------------------------------
export default function Buttons({
  taskId,
  items,
  initialItems,
  isCorrect,
  hasSubmitted,
  setIsCorrect,
  setItems,
  setHasSubmitted,
}) {
  const saveTask = useLocalStorage(taskId)[1];
  const [trials, setTrials] = useState(0);
  const [solutionShown, setSolutionShown] = useState(false);
  const [submitButtonRef, confetti] = useConfetti();
  const { push } = useRouter();
  const allBlanksEmpty = useMemo(
    () =>
      !Object.entries(items).some(
        ([key, value]) => key !== WORD_BANK && value.items.length
      ),
    [items]
  );

  const checkAnswers = () => {
      let isCorrect = true;
      const checkedBlanks = Object.entries(items).reduce((acc, [key, value]) => {
        if (key !== WORD_BANK) {
          const isBlankCorrect = value.items.some((item) =>
            value.solutions.includes(item)
          );

          acc[key] = {
            ...value,
            isCorrect: isBlankCorrect
          };

          // if at least one blank is incorrect, the whole activity is incorrect
          // need to update FillInTheBlanksInner `isCorrect` state
          if (!isBlankCorrect) {
            isCorrect = isBlankCorrect;
          }
        } else {
          acc[key] = { ...value, isCorrect: null };
        }

        return acc;
      }, {});
      setIsCorrect(isCorrect);
      setItems(checkedBlanks);
      setTrials(isCorrect ? 0 : (prev) => prev + 1);
      setHasSubmitted(true);
      setSolutionShown(false);

      saveTask(isCorrect ? new Date() : null);


    // if (isCorrect) {
    //   confetti();
    // }
  };

  const reset = () => {
    setItems(initialItems);
    setIsCorrect(false);
    setTrials(0);
    setHasSubmitted(false);
    setSolutionShown(false);
  };


  const close = () => {
    push("/questionbank");
  }



  return (
    <>
      <Stack direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}>



        <ButtonGroup mt="3">

          {/* {(trials > 0 || hasSubmitted) && !allBlanksEmpty && ( */}
          <LoadingButton
            onClick={reset}
            variant="contained"
            disabled={!hasSubmitted}
          >
             Làm Lại
          </LoadingButton>
          {/* )} */}


          <LoadingButton
            disabled={hasSubmitted}
            onClick={checkAnswers}
            ref={submitButtonRef}
            variant="contained"
          >
             Kiểm Tra Đáp Án
          </LoadingButton>


          <LoadingButton
            variant="contained"
            onClick={() => close()}
          >
            Trở Về
          </LoadingButton>
        </ButtonGroup>

      </Stack>


    </>
  );
}

Buttons.propTypes = {
  taskId: PropTypes.string.isRequired,
  items: PropTypes.object.isRequired,
  hasSubmitted: PropTypes.bool.isRequired,
  isCorrect: PropTypes.bool.isRequired,
  initialItems: PropTypes.object.isRequired,
  setIsCorrect: PropTypes.func.isRequired,
  setItems: PropTypes.func.isRequired,
  setHasSubmitted: PropTypes.func.isRequired
};
