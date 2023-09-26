import {
  DataGrid,
  GridActionsCellItem,
  useGridSelection, 
} from '@mui/x-data-grid';
import { React, useEffect, useState, useCallback } from 'react';
import {
  Box,
  Tooltip,
  IconButton,
  Button,
  Pagination,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import ConfirmDialog from '@/components/confirm-dialog/ConfirmDialog';
import { useSnackbar } from 'notistack';
import { getAllQuestionbank } from '@/dataProvider/multipchoiceApi';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { CheckBox } from '@mui/icons-material';
import { deleteById } from '@/dataProvider/questionbankApi';

//---------------------------------------------------------





const QuestionBankTable = ({ questionData }) => {

  const { push } = useRouter();
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({});
  const [filter, setFilter] = useState({
    pageIndex: 3,
    pageSize: 20,
  });
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  // const [selectionModel, setSelectionModel] = useState([]);
  // const [rowSelection, setRowSelection] = useState(null);


  // const handleSelectionModelChange = (newSelectionModel) => {
  //   setSelectionModel(newSelectionModel);
  //   console.log("afajja");
  // };



  const handlePageChange = (event, newPage) => {
    setFilter((prevFilter) => ({ ...prevFilter, pageIndex: newPage }));
    fetchAll({ ...filter, pageIndex: newPage });
  };

  const handlePageSizeChange = (event) => {
    const newPageSize = event.target.value;
    setFilter((prevFilter) => ({ ...prevFilter, pageSize: newPageSize }));
  };

  const [paging, setPaging] = useState({});

  const [openConfirm, setOpenConfirm] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const columns = [
    { field: 'id' },
    { field: 'num', headerName: '#', width: 20 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'questionstype', headerName: 'Questions Type', width: 200 },
    { field: 'authorName', headerName: 'Author Name', width: 150 },
    { field: 'tags', headerName: 'Tags', width: 150 },
    { field: 'categoryName', headerName: 'Category', width: 150 },
    {
      field: 'actions',
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
            onClick={() => { handleEditClick(params.row) }}
            color="success"
            size='25px'
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => { handleOpenConfirm(), setEditData(params.row) }}
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
    push(`/questionbank/multiChoiceQuestion/` + row.id + `/edit`);
  };

  const handleDeleteRow = async (id) => {
    const response = await deleteById(id);

    if (response.status < 400) {
      push('/questionbank');
      // await fetchAll();
      enqueueSnackbar(response.data.message, { variant: 'success' });
    } else {
      enqueueSnackbar(response.response.data.title, { variant: "error" });
    }
  }

  async function fetchAll() {//filter
    const res = await getAllQuestionbank();
    if (res.status < 400) {
      const transformData = res.data.data.map((qb, index) => {
        return {
          id: qb.id,
          num: index + 1,
          name: qb.name,
          questionstype: qb.questionstype,
          authorName: qb.authorName,
          tags: qb.tags[0] ? qb.tags[0].name : "",
          categoryName: qb.categoryName,
        };
      });
      setPaging(JSON.parse(res.headers['x-pagination']));
      setData(transformData);
    } else {
      enqueueSnackbar(response.response.data.title, { variant: "error" });
    }
  }



  useEffect(() => {
    if (questionData && questionData.length > 0) {
      setData(questionData);
    } else {
      fetchAll(data);
    }

  }, [filter, questionData]);

  useEffect(() => {
    console.log(rowSelectionModel);
  }, [rowSelectionModel]);

  return (

    <Box sx={{ height: "100%", width: '100%' }}>
     
      <DataGrid
        checkboxSelection
        rows={data}
        columns={columns}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelectionModel}

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
          p: 2,
          fontSize: '16px'
        }}
      />
       {/* <SelectionState
            selection={selection}
            onSelectionChange={setSelection}
          /> */}
      {/* {selectionModel.length > 0 && (
        <button>Xóa</button>
      )} */}



      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Xóa"
        content={
          <>
            Bạn xác định muốn xóa câu hỏi tên là  : <strong>{editData.name}</strong> ?
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
      />

    </Box>
  );

}

export default QuestionBankTable;
