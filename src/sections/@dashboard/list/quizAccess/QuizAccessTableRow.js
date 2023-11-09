
import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  TextField,
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
import { format, parseISO } from 'date-fns';
//----------------------------------------------------------------------------

QuizAccessTableRows.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  index: PropTypes.number,
};

//----------------------------------------------------------------------------

export default function QuizAccessTableRows({
  row,
  selected,
  onSelectRow,
  onUpdateRow,
  onDeleteRow,
  index,
}) {
  const {
    user,
    status,
    isPublic,
    quiz,
    timeStartQuiz
  } = row;
  const [openConfirm, setOpenConfirm] = useState(false);
  const [select, setSelect] = useState([]);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const formattedDate = timeStartQuiz ? format(new Date(timeStartQuiz), 'HH:mm:ss dd/MM/yyyy') : "Chưa bắt đầu";





  return (
    <React.Fragment>
      <TableRow hover selected={selected}>
        <TableCell align="center">{index + 1}</TableCell>
        <TableCell align="center">{user?.fullName}</TableCell>
        <TableCell align="center">{status}</TableCell>
        <TableCell align="center">{quiz?.name}</TableCell>
        <TableCell align="center">{quiz?.course?.fullName}</TableCell>
        <TableCell align="center">
          {formattedDate}
        </TableCell>
        <TableCell align="center">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Tooltip title="Show" placement="top">
              <IconButton color="info" onClick={onUpdateRow} >
              <ModeEdit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete" placement="right">
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
            <>
              <Typography variant="h5">Bạn có chắc muốn xóa </Typography>
              <Stack
                justifyContent="flex-start"
                alignItems="baseline"
                spacing={2}
                paddingTop='20px'
              >
                <TextField
                  id="outlined-read-only-input1"
                  label="Tên học sinh"
                  defaultValue={user?.fullName}
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                />
                <TextField
                  id="outlined-read-only-input2"
                  label="Trạng thái làm bài"
                  defaultValue={status}
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                />
                <TextField
                  id="outlined-read-only-input3"
                  label="Tên đề học sinh tham gia"
                  defaultValue={quiz?.name}
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                />

              </Stack>

            </>
          }
          action={
            <Button variant="contained" color="error" onClick={() => {
              onDeleteRow();
              handleCloseConfirm();
            }}>
              Xóa
            </Button>
          }
        />
      </TableRow>
    </React.Fragment>
  );
}
