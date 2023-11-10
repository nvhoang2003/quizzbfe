import {
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
  TableRow,
  TableCell,
} from "@mui/material";
import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import QuestionTypeIcon from "@/sections/@dashboard/icon/questiontype-icon";

export default function QuestionUnchooseItem(props) {
  const { item, onSelectRow } = props;
  const [isChecked, setIsChecked] = useState(false);
  const handleHeaderCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    onSelectRow();
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
      >
        <Checkbox checked={isChecked} onChange={handleHeaderCheckboxChange} />
        <QuestionTypeIcon questionType={item?.questionsType} />
        <Stack
          gap={1.25}
        >
          <Typography textTransform="capitalize" noWrap>
            {item?.name}
          </Typography>
          <Typography
            textTransform="capitalize"
            sx={{
              opacity: 0.6,
            }}
          >
            {item?.content}
          </Typography>
        </Stack>
      </Stack>
      <Stack
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="end"
        gap={1.25}
      >
        <Typography fontWeight={700} noWrap>
          {item?.authorName}
        </Typography>
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
            {item?.defaultMark}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
