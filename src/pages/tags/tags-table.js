import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { React, useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  IconButton,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import { getAllTags } from '@/dataProvider/tagApi';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const TagsTable = (props) => {
  const {
     onDeselectAll,
     onDeselectOne,
    // onPageChange = () => {},
    // onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    // page = 0,
    // rowsPerPage = 0,
    selected = []
  } = props;

  // const selectedSome = (selected.length > 0) && (selected.length < items.length);
  // const selectedAll = (items.length > 0) && (selected.length === items.length);
  const [paging, setPaging] = useState({});
  const [tagData, setTagData] = useState([]);

  const [filter, setFilter] = useState({
    pageIndex: 1,
    pageSize: 10,
    categoryId: 1,
  });

  const handlePageChange = (event, newPage) => {
    setFilter({ ...filter, pageIndex: newPage });
    fetchTags({ ...filter, pageIndex: newPage });
  };
  

  
  async function fetchTags() {
    const res = await getAllTags(filter);
    if (res.status < 400) {
      const transformData = res.data.data.map((tag) => {
        return {
          name: tag.name,
          id: tag.id,
          description: tag.description
        };
      });
      setPaging(JSON.parse(res.headers['x-pagination']));
      setTagData(transformData);
    } else {
      return res;
    }
  }

  const handleDeleteRow = async (id) => {
    const res = await deleteTag(id);
    if (res.status < 400) {
        setSelected([]);
        await fetchTags(filter);
        enqueueSnackbar('Disable/User Activation Successful');
    } else {
        enqueueSnackbar('Disable/User activation failed', { variant: 'error' });
    }
};



useEffect(() => {
    fetchTags();
  }, [filter]);

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    // checked={selectedAll}
                    // indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  ID
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Descriptions
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tagData.map((tags) => {
                const isSelected = selected.includes(tags.id);
                //const createdAt = format(tags.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={tags.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(tags.id);
                          } else {
                            onDeselectOne?.(tags.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {tags.id}
                    </TableCell>
                    <TableCell>
                      {tags.name}
                    </TableCell>
                    <TableCell>
                      {tags.description}
                    </TableCell>
                    <TableCell>

                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                      <Tooltip arrow placement="left" title="Edit">
                        <IconButton onClick={() => edit(row)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip arrow placement="right" title="Delete">
                        <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>

                     
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      {/* <TablePagination
        component="div"
        //count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      /> */}
    </Card>
  );
};

// TagsTable.propTypes = {
//   count: PropTypes.number,
//   items: PropTypes.array,
//   onDeselectAll: PropTypes.func,
//   onDeselectOne: PropTypes.func,
//   onPageChange: PropTypes.func,
//   onRowsPerPageChange: PropTypes.func,
//   onSelectAll: PropTypes.func,
//   onSelectOne: PropTypes.func,
//   page: PropTypes.number,
//   rowsPerPage: PropTypes.number,
//   selected: PropTypes.array
// };
