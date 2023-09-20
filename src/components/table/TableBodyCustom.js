import { TableBody } from '@mui/material';
import PropTypes from 'prop-types';
import TableEmptyRows from './TableEmptyRows';
import TableNoData from './TableNoData';
import { emptyRows } from './utils';

export default function TableBodyCustom ({page, rowsPerPage, dense, listItem, children, notFoundMessage }) {
  const denseHeight = dense ? 52 : 72;
  const isNotFound = listItem == null || listItem.length == 0;
  return (
    <TableBody>
      {children}
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
