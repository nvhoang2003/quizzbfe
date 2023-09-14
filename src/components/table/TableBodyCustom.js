import PropTypes from 'prop-types';
const { TableBody } = require("@mui/material");
const { default: TableEmptyRows } = require("./TableEmptyRows");
const { emptyRows } = require("./utils");
const { default: TableNoData } = require("./TableNoData");

TableResponsiveCustom.propTypes = {
  compomentRows: PropTypes.node
}

export default function TableBodyCustom ({page, rowsPerPage, dense, listItem, compomentRows, notFoundMessage }) {
  const denseHeight = dense ? 52 : 72;
  const isNotFound = listItem == null || listItem.length == 0;
  return (
    <TableBody>
      {compomentRows}
      <TableEmptyRows
        height={denseHeight}
        emptyRows={emptyRows(page, rowsPerPage, listItem.length)}
      />

      <TableNoData
        isNotFound={isNotFound}
        message={notFoundMessage}
      />
    </TableBody>
  );
};
