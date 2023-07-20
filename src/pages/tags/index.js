import {React, useEffect, useState} from 'react';
import { getAllTags } from '@/dataProvider/tagApi';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'description', headerName: 'Description', width: 130 },
];

export default function ListTagPage() {
  const [tagData, setTagData] = useState([]);
  const [paging, setPaging] = useState({});

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

  useEffect(() => {
    fetchTags();
  }, [filter]);
 
  return (
    <main>
      <div>
        <h1 className='title'>ListTags</h1> 
        <div className="m-5">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Description</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tagData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell component="th" scope="row">
                      {item.id}
                    </TableCell>
                    <TableCell align="right">{item.name}</TableCell>
                    <TableCell align="right">{item.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className='paginationContainer m-5'>
          <Pagination
            size="small"
            count={paging?.TotalPages}
            rowsperpage={paging?.PageSize}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
        
      </div>
    </main>    
  )
}
