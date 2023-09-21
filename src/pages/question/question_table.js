import {
  DataGrid,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import { React, useEffect, useState, useCallback } from 'react';
import {
  Box,
  Tooltip,
  IconButton,
  Button,
  Pagination,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import ConfirmDialog from '@/components/confirm-dialog/ConfirmDialog';
import { useSnackbar } from 'notistack';
import { getAllQuestionbank } from '@/dataProvider/multipchoiceApi';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { CheckBox } from '@mui/icons-material';
import { deleteMultiById, getAllQuestion } from '@/dataProvider/questionApi';

//---------------------------------------------------------





const QuestionTable = ({ questionData }) => {

  const { push } = useRouter();

  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({});


  const [filter, setFilter] = useState({
    pageIndex: 1,
    pageSize: 20,
  });

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
    { field: 'questionsType', headerName: 'Questions Type', width: 200 },
    { field: 'authorName', headerName: 'Author Name', width: 150 },
    { field: 'defaultMark', headerName: 'Default Mark', width: 150 },
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
              <VisibilityIcon />
            }
            label="Details"
            onClick={() => { handleDetailsClick(params.row) }}
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

  const handleDetailsClick = (row) => {
    push(`/question/multiQuestion/details/` + row.id);
  };

  const handleDeleteRow = async (id) => {
    const response = await deleteMultiById(id);

    if (response.status < 400) {
      push('/question');
      await fetchAll();
      enqueueSnackbar(response.data.message, { variant: 'success' });
    } else {
      enqueueSnackbar(response.response.data.title, { variant: "error" });
    }

  }


  async function fetchAll() {
    const res = await getAllQuestion();
    if (res.status < 400) {
      const transformData = res.data.data.map((qb, index) => {
        return {
          id: qb.id,
          num: index + 1,
          name: qb.name,
          questionsType: qb.questionsType,
          authorName: qb.authorName,
          defaultMark: qb.defaultMark,
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


  return (

    <Box sx={{ height: "100%", width: '100%' }}>
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
          p: 2,
          fontSize: '16px'
        }}
      />

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Xóa"
        content={
          <>
            Bạn xác định muốn xóa câu hỏi tên là  : <strong>{ editData.name }</strong> ?
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

export default QuestionTable;
