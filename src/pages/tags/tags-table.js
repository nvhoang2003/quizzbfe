import {
  Paper,
  Box,
  Card,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Tooltip,
  colors
} from '@mui/material';
import { React, useEffect, useState } from 'react';
import { Scrollbar } from 'src/components/scrollbar/scrollbar';
import { getAllTags } from '@/dataProvider/tagApi';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Pagination from '@mui/material/Pagination';
import { styled } from '@mui/material/styles';


export const TagsTable = (props) => {
  const [tagData, setTagData] = useState([]);
  const [paging, setPaging] = useState({});

  const selected =[];

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


  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  

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
                <TableCell >
                  ID
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                Description
                </TableCell>
                <TableCell>
                  Action
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {tagData.map((item) => {
                const isSelected = selected.includes(item.id);
               
                return (
                  <TableRow
                    hover
                    key={item.id}
                    selected={isSelected}
                  >
                    <TableCell>
                      {item.id}
                    </TableCell>
                    <TableCell>
                      {item.name}
                    </TableCell>
                    <TableCell>
                      {item.description}
                    </TableCell>
                    <TableCell>
                    <Stack direction="row"
                      divider={<Divider orientation="vertical" flexItem />}
                      spacing={2}>
                        <Item>
                          <Tooltip title="Delete">
                            <DeleteIcon  size='small' color='error'/> 
                          </Tooltip> 
                        </Item>
                        
                        <Item>
                        <Tooltip title="Edit">
                            <EditIcon size='small' color='success'/>
                        </Tooltip>

                        </Item>
                      
                      </Stack>
                    </TableCell>

                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <div className='paginationContainer m-5'>
          <Pagination
            size="small"
            count={paging?.TotalPages}
            rowsperpage={paging?.PageSize}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
    </Card>
  );
};
