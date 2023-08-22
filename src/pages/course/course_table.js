import 
{ 
  DataGrid,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import { React, useEffect,useState} from 'react';

import {
  Box,
  Tooltip,
  IconButton,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import ConfirmDialog from '@/components/confirm-dialog/ConfirmDialog';
import { useSnackbar } from 'notistack';
import { deleteCourseByID, getAll } from '@/dataProvider/courseApi';

//---------------------------------------------------------
 const Table = ()=> {
  const { push } = useRouter();

  const [data, setData] = useState([]);
  const [deleteData, setDeleteData] = useState({});
  const [filter, setFilter] = useState({
    pageIndex: 1,
    pageSize: 10,
  });
  const [paging, setPaging] = useState({});
  const [openConfirm, setOpenConfirm] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  

  const columns =[
    {field: 'id'},
    {field:'num', headerName:'#',width:100},
    {field: 'fullname', headerName:'Full Name', width:150},
    {field: 'shortname', headerName:'Short Name', width:150},
    {field: 'description', headerName:'Description', width:350},

    {field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        getActions: (params) => {
          return [
            <GridActionsCellItem
              icon={
                <EditIcon />
            }
              label="Edit"
              onClick={() => {handleEditClick(params.row)}}
              color="success"
              size='25px'
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={() => {handleOpenConfirm(), setEditData(params.row)}}
              color="error"
              size='25px'
            />,
          ];
        },
      }
  ];
  const handleOpenConfirm = () => {
      setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
      setOpenConfirm(false);
  };

  const handleEditClick = (row) => {
    push(`course/edit/` + row.id);
  };

  const handleDeleteRow = async(id)=>{
    const response = await deleteCourseByID(id);
    
    if (response.status < 400) {
      push('/course');
        await fetchAll();
        enqueueSnackbar(response.data.message, { variant: 'success' });
    } else {
        enqueueSnackbar(response.response.data.title, { variant: 'error' });
    }

    // if (page > 0) {
    //     if (dataInPage.length < 2) {
    //         setPage(page - 1);
    //     }
    // }
  }
  

  async function fetchAll() {
    const res = await getAll(filter);
    if (res.status < 400) {
      const transformData = res.data.data.map((course,index) => {
        return {
          id: course.id,
          num:index + 1,
          fullname: course.fullName,
          shortname: course.shortName,
          description: course.description,
        };
      });
      setPaging(JSON.parse(res.headers['x-pagination']));
      setData(transformData);
    } else {
      return res;
    }
  }  
 
  useEffect(()=>{
    fetchAll()
  },[]);


  return(

    <Box sx={{ height: "100%", width: '100%'}}>
      <DataGrid
         rows={data}
         columns={columns}
         initialState={{
          columns: {
            ...columns.initialState?.columns,
            columnVisibilityModel: {
              id: false,
            },
          },
        }}
          
        sx={{
          m: 4,
          p:4,
          fontSize:'16px'
        }}
      />


          <ConfirmDialog
              open={openConfirm}
              onClose={handleCloseConfirm}
              title="Xóa"
              content={
                  <>
                      Are you sure want to delete : <strong>{deleteData.name}</strong> ?
                  </>
              }
              action={
                  <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                          handleDeleteRow(deleteData.id);
                          handleCloseConfirm();
                      }}
                  >
                      Delete
                  </Button>
              }
          />
    </Box>
  );

 }

 export default Table;
