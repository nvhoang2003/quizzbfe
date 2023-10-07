
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
import Checkbox from '@mui/material/Checkbox';
//----------------------------------------------------------------------------

QuestionTableRows.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  index: PropTypes.number,
};

//----------------------------------------------------------------------------

export default function QuestionTableRows({
  row,
  selected,
  onSelectRow,
  onUpdateRow,
  onDeleteRow,
  index,
}) {
  const {
    name,
    questionsType,
    authorName,
    isPublic,
  } = row;
  const [openConfirm, setOpenConfirm] = useState(false);
  const [select, setSelect] = useState([]);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };
 

  return (
    <React.Fragment>
      <TableRow hover selected={selected}>
        <TableCell align="center">{index + 1}</TableCell>
        <TableCell align="center">{name}</TableCell>
        <TableCell align="center">{questionsType}</TableCell>
        <TableCell align="center">{authorName}</TableCell>
        <TableCell align="center">
          <Typography color={!isPublic ? "#E45858" : "#2FAE03"}>
            {!isPublic ? "Không" : "Có"}
          </Typography>
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
                <Visibility />
              </IconButton>
            </Tooltip>
            {/* <Tooltip title="Edit" placement="left">
              <IconButton color="success" onClick={onUpdateRow}>
                <ModeEdit />
              </IconButton>
            </Tooltip> */}
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
            <Typography fontWeight="900">
              Bạn có chắc chắn muốn xóa <strong>{name}</strong> ?
            </Typography>
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
