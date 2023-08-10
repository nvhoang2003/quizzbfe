import { React, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { getAllCate } from '@/dataProvider/categoryApi';
// const columns = [
//   { field: 'id', headerName: 'ID', width: 70 },
//   { field: 'name', headerName: 'Name', width: 80 },
//   { field: 'description', headerName: 'Description', width: 80 },
// ];

export default function ListTagPage() {
  const [Data, setData] = useState([]);
  const [paging, setPaging] = useState({});

  const [filter, setFilter] = useState({
    pageIndex: 1,
    pageSize: 10,
  });

  const handlePageChange = (event, newPage) => {
    setFilter({ ...filter, pageIndex: newPage });
    fetchTags({ ...filter, pageIndex: newPage });
  };



  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      with: 50,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 15,//ban đầu 14
    },

  }));



  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
      borderRadius: '15px',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));




  async function fetchCate() {
    const res = await getAllCate(filter);
    if (res.status < 400) {
      const transformData = res.data.data.map((cate) => {
        return {
          name: cate.name,
          id: cate.id,
          description: cate.description
        };
      });
      setPaging(JSON.parse(res.headers['x-pagination']));
      setData(transformData);
    } else {
      return res;
    }
  }
  

  useEffect(() => {
    fetchCate();
  }, [filter]);

  return (
    <main>
      <div className='contaner'>
        <h1 className='title'>ListTags</h1>
        <div className="m-5">
          <TableContainer component={Paper} >
            <Table sx={{ minWidth: 500 }} aria-label="customized table" >
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell >ID</StyledTableCell>
                  <StyledTableCell >Name</StyledTableCell>
                  <StyledTableCell >Description </StyledTableCell>
                  <StyledTableCell >Action</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {Data.map((item) => (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell component="th" scope="row" > {item.id} </StyledTableCell>
                    <StyledTableCell >{item.name}</StyledTableCell>
                    <StyledTableCell >{item.description}</StyledTableCell>
                    <StyledTableCell >

                      <Tooltip arrow placement="left" title="Edit">
                        <IconButton color="success" >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                     
                      <Tooltip arrow placement="right" title="Delete">
                          <DeleteIcon />
                      </Tooltip>

                     

                    </StyledTableCell>


                  </StyledTableRow>
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
  );
};

ListTagPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
