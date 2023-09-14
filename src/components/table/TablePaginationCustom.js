import PropTypes from "prop-types";
// @mui
import {
  Box,
  Switch,
  TablePagination,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Typography,
} from "@mui/material";

// ----------------------------------------------------------------------

TablePaginationCustom.propTypes = {
  onChangeRowsPerPage: PropTypes.func,
  onPageChange: PropTypes.func,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  sx: PropTypes.object,
};

export default function TablePaginationCustom({
  paging,
  filter,
  onChangeRowsPerPage,
  onChangePage,
  rowsPerPageOptions = [5, 10, 25],
  sx,
  ...other
}) {
  return (
    <Box
      p={2}
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        bgcolor: "#f2f4f7",
        ...sx,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 1,
        }}
      >
        <InputLabel>Rows per page:</InputLabel>
        <Select
          id="rowsPerPage"
          value={paging?.PageSize ?? 10}
          onChange={onChangeRowsPerPage}
          variant="standard"
          size="small"
          sx={{ minWidth: "50px", alignItems: "center", justifyContent: 'center', textAlign: "center"}}
        >
          {rowsPerPageOptions.map((item, index) => (
            <MenuItem value={item} >{item}</MenuItem>
          ))}
        </Select>
      </Box>
      <Typography>
        {}
      </Typography>
      <Pagination
        size="small"
        count={paging?.TotalPages}
        rowsperpage={paging?.PageSize}
        onChange={onChangePage}
        color="primary"
      />
    </Box>
  );
}
