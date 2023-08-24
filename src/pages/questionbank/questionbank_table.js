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
import { getAllQuestionbank } from '@/dataProvider/multipchoiceApi';

//---------------------------------------------------------





 const QuestionBankTable = ()=> {
  const { push } = useRouter();

  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({});
  const [filter, setFilter] = useState({
    pageIndex: 2,
    pageSize: 10,
  });
  const [paging, setPaging] = useState({});
  const [openConfirm, setOpenConfirm] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  

  const columns =[
    {field: 'id'},
    {field:'num', headerName:'#',width:20},
    {field: 'name', headerName:'Name', width:100},
    {field: 'questionstype', headerName:'Questions Type', width:150},
    {field: 'authorName', headerName:'Author Name', width:150},
    {field: 'tags', headerName:'Tag', width:100},
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
    push(`category/edit/` + row.id);
  };

  const handleDeleteRow = async (id) => {
    const response = await deleteCateByID(id);

    if (response.status < 400) {
      push('/category');
        await fetchAll();
        enqueueSnackbar(response.data.message, { variant: 'success' });
    } else {
      enqueueSnackbar(response.response.data.title, { variant: "error" });
    }

    // if (page > 0) {
    //     if (dataInPage.length < 2) {
    //         setPage(page - 1);
    //     }
    // }
  }
  

  async function fetchAll() {
    const res = await getAllQuestionbank(filter);
    if (res.status < 400) {
      const transformData = res.data.data.map((qb,index) => {
        return {
          id: qb.id,
          num:index + 1,
          name: qb.name,
          questionstype: qb.questionstype,
          authorName: qb.authorName,
          tags:qb.tags[0] ? qb.tags[0].name : ""
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


          {/* <ConfirmDialog
              open={openConfirm}
              onClose={handleCloseConfirm}
              title="Xóa"
              content={
                  <>
                      Are you sure want to delete : <strong>{editData.name}</strong> ?
                  </>
              }
              action={
                  <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                          handleDeleteRow(editData.id);
                          handleCloseConfirm();
                      }}
                  >
                      Delete
                  </Button>
              }
          /> */}
    </Box>
  );

 }

 export default QuestionBankTable;
