import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Delete,
  DeleteOutline,
  ModeEdit,
  ModeEditOutline,
  Visibility,
} from "@mui/icons-material";
import { formatedNullDateTime, formatedNullString } from "@/utils/formatter";
import { useRouter } from "next/navigation";

//----------------------------------------------------------------------------

ScoreTableRows.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  handleShow: PropTypes.func,
  index: PropTypes.number,
};

//----------------------------------------------------------------------------

export default function ScoreTableRows({
  row,
  selected,
  onShowRow,
  index,
}) {
  const {
    userDoQuizz,
    course,
    quiz,
    quizzAccess,
    totalPoint,
    status,
    questionReults,
  } = row;
  
  return (
    <React.Fragment>
      <TableRow hover selected={selected}>
        <TableCell align="left">{index + 1}</TableCell>
        <TableCell align="left">{formatedNullString(quiz?.name)}</TableCell>
        <TableCell align="left">{formatedNullString(userDoQuizz?.fullName)}</TableCell>
        <TableCell align="center">
          <Stack display="flex" flexWrap="wrap" direction="row" gap={1} alignItems="center" justifyContent="center">
            <Typography>{formatedNullDateTime(quizzAccess?.timeStartQuiz).time}</Typography>
            <Typography>{formatedNullDateTime(quizzAccess?.timeStartQuiz).date}</Typography>
          </Stack>
        </TableCell>
        <TableCell align="center">
          {totalPoint}/{quiz?.maxPoint}
        </TableCell>
        <TableCell align="center">
          {quiz?.pointToPass}
        </TableCell>
        <TableCell align="center">
          <Typography color={status == "Pass" ? "#2FAE03": "#E45858"}>
            {status == "Pass" ? "Qua": "Trượt"}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Tooltip title="Show" placement="right">
              <IconButton color="info" onClick={onShowRow}>
                <Visibility />
              </IconButton>
            </Tooltip>
          </Box>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
