
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

TagTableRows.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  index: PropTypes.number,
};

//----------------------------------------------------------------------------

export default function TagTableRows({
  row,
  selected,
  onSelectRow,
  onUpdateRow,
  onDeleteRow,
  onShow,
  index,
}) {
  const {
    name,
    description,
    categoryId,
  } = row;
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const [isChecked, setIsChecked] = useState(false);
  const handleHeaderCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    onSelectRow();
  };

  return (
    <React.Fragment>
      <TableRow hover selected={selected}>
        {/* <TableCell padding="checkbox">
          <Checkbox
            checked={isChecked}
            onChange={handleHeaderCheckboxChange}
          />
        </TableCell> */}
        <TableCell align="center">{index + 1}</TableCell>
        <TableCell align="center">{name}</TableCell>
        <TableCell align="center">{description}</TableCell>
        <TableCell align="center">{categoryId}</TableCell>
        
        <TableCell align="center">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Tooltip title="Show" placement="top">
              <IconButton color="info" onClick={onShow}>
                <Visibility />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit" placement="left">
              <IconButton color="success" onClick={onUpdateRow}>
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
            <Typography fontWeight="700">
              Bạn có chắc chắn muốn xóa {name} ?
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
