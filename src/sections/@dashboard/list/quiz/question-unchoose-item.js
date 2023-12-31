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
import { Scrollbar } from "@/components/scrollbar/scrollbar";

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
        width="calc(100% - 150px)"
      >
        <Checkbox checked={isChecked} onChange={handleHeaderCheckboxChange} />
        <QuestionTypeIcon questionType={item?.questionsType} />
        <Stack width="calc(100% - 86px)" gap={1.25}>
          <Tooltip title={item?.name}>
            <Typography textTransform="capitalize" noWrap>
              {item?.name}
            </Typography>
          </Tooltip>

          <Tooltip title={item?.content}>
            <Typography
              textTransform="capitalize"
              sx={{
                opacity: 0.6,
              }}
              noWrap
            >
              {item?.content}
            </Typography>
          </Tooltip>
        </Stack>
      </Stack>
      <Stack
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="end"
        gap={1.25}
        width={"130px"}
      >
        <Tooltip title={item?.authorName}>
          <Typography fontWeight={700} noWrap>
            {item?.authorName}
          </Typography>
        </Tooltip>
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
