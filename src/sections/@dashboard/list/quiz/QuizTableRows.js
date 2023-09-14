import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { Delete, DeleteOutline, ModeEdit, ModeEditOutline, Visibility } from "@mui/icons-material";
import ConfirmDialog from "@/components/confirm-dialog";

//----------------------------------------------------------------------------

QuizTableRows.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  index: PropTypes.number,
};

//----------------------------------------------------------------------------

export default function QuizTableRows({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  index,
}) {
  const {
    name,
    description,
    timeOpen,
    timeClose,
    timeLitmit,
    pointToPass,
    maxPoint,
    isPublic,
    createDate,
    updateDate,
  } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  return (
    <React.Fragment>
      <TableRow hover selected={selected}>
        <TableCell align="left">{index + 1}</TableCell>
        <TableCell align="left">{name}</TableCell>
        <TableCell align="left">{new Date(timeOpen).toLocaleString()}</TableCell>
        <TableCell align="left">{new Date(timeClose).toLocaleString()}</TableCell>
        <TableCell align="left">{timeLitmit}</TableCell>
        <TableCell align="left">
          {pointToPass}/{maxPoint}
        </TableCell>
        <TableCell align="left">
          <Typography color={isPublic == 0 ? "error" : "primary"}>
            {isPublic == 0 ? "Không" : "Có"}
          </Typography>  
          </TableCell>
        <TableCell align="left">{description}</TableCell>
        <TableCell align="left">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Tooltip title="Show">
              <IconButton color="info">
                <Visibility />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton color="success">
                <ModeEdit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton color="error" onClick={handleOpenConfirm}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        </TableCell>
        <ConfirmDialog
          open={openConfirm}
          onClose={handleCloseConfirm}
          content={
            <Typography fontWeight="700">
              Bạn có chắc chắn muốn xóa {name} ?
            </Typography>
          }
          action={
            <Button variant="contained" color="error" onClick={onDeleteRow}>
              Xóa
            </Button>
          }
        />
      </TableRow>
    </React.Fragment>
  );
}
