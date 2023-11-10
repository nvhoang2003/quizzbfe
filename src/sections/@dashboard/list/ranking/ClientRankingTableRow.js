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
  Error,
  ModeEdit,
  ModeEditOutline,
  Visibility,
} from "@mui/icons-material";
import ConfirmDialog from "@/components/confirm-dialog";
import { formatedNullDateTime, formatedNullString } from "@/utils/formatter";
import CustomTooltip from "@/components/tooltip/CustomTooltip";

export default function ClientRankingTableRow(props) {
  const {
    row,
    selected,
    index
  } = props;

  const {
    rank,
    studentName,
    score,
    timeDoQuiz
  } = row;

  const getColorByRank = (rank) => {
    switch (rank) {
      case 1:
        return "#E45858";
        break;
      case 2:
        return "#D5C30B"
        break;
      case 3:
        return "#2FAE03"
        break;
      case 4:
        return "#2777C1"
        break;
      case 5:
        return "#BBBAB3"
        break;
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      <TableRow hover selected={selected}>
        <TableCell align="center" sx={{ color: getColorByRank(rank) ? getColorByRank(rank) : null, fontWeight: 'bold', fontSize: "x-large" }}>{rank}</TableCell>
        <TableCell align="left">{formatedNullString(studentName)}</TableCell>
        <TableCell align="left">{formatedNullString(score)}</TableCell>
        <TableCell align="left">{formatedNullString(timeDoQuiz)}</TableCell>
      </TableRow>
    </React.Fragment>
  )
}
