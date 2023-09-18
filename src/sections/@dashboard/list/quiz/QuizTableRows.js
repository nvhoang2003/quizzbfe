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
    timeLimit,
    pointToPass,
    maxPoint,
    isPublic,
    createDate,
    updateDate,
    isValid,
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
        <TableCell align="left">{formatedNullString(name)}</TableCell>
        <TableCell align="center">
          <Stack
            display="flex"
            flexWrap="wrap"
            direction="row"
            gap={1}
            alignItems="center"
            justifyContent="center"
          >
            <Typography>{formatedNullDateTime(timeOpen).time}</Typography>
            <Typography>{formatedNullDateTime(timeOpen).date}</Typography>
          </Stack>
        </TableCell>
        <TableCell align="center">
          <Stack
            display="flex"
            flexWrap="wrap"
            direction="row"
            gap={1}
            alignItems="center"
            justifyContent="center"
          >
            <Typography>{formatedNullDateTime(timeClose).time}</Typography>
            <Typography>{formatedNullDateTime(timeClose).date}</Typography>
          </Stack>
        </TableCell>
        <TableCell align="left">{timeLimit}</TableCell>
        <TableCell align="center">
          <Stack
            display="flex"
            direction="row"
            gap={1}
            alignItems="center"
            justifyContent="left"
          >
            <Typography>
              {pointToPass}/{maxPoint}
            </Typography>
            {!isValid && (
              <CustomTooltip
                title="Điểm đạt cao hơn điểm tối đa"
                customTooltipStyle={{
                  backgroundColor: "#E45858"
                }}
              >
                <IconButton color="error" size="small">
                  <Error fontSize="small" />
                </IconButton>
              </CustomTooltip>
            )}
          </Stack>
        </TableCell>
        <TableCell align="left">
          <Typography color={isPublic == 0 ? "#E45858" : "#2FAE03"}>
            {isPublic == 0 ? "Không" : "Có"}
          </Typography>
        </TableCell>
        <TableCell align="left">{formatedNullString(description)}</TableCell>
        <TableCell align="left">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Tooltip title="Show" placement="right">
              <IconButton color="info">
                <Visibility />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit" placement="right">
              <IconButton color="success">
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
            <Button variant="contained" color="error" onClick={onDeleteRow}>
              Xóa
            </Button>
          }
        />
      </TableRow>
    </React.Fragment>
  );
}
