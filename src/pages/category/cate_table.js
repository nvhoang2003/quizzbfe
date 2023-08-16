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
  Button,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import { deleteCateByID, getAllCate, getCateByID } from '@/dataProvider/categoryApi';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalEdit from 'src/components/form/category/useModel'
import ConfirmDialog from '@/components/confirm-dialog/ConfirmDialog';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';


export const CateTable = (props) => {
  const {
    onDeselectAll,
    onDeselectOne,
    onSelectAll,
    onSelectOne,
    selected = []
  } = props;

  // const selectedSome = (selected.length > 0) && (selected.length < items.length);
  // const selectedAll = (items.length > 0) && (selected.length === items.length);
  const [paging, setPaging] = useState({});
  const [Data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [Editdata, setEditdata] = useState([]);

  const [filter, setFilter] = useState({
    pageIndex: 1,
    pageSize: 10,
  });

  const [openConfirm, setOpenConfirm] = useState(false);

  const handlePageChange = (event, newPage) => {
    setFilter({ ...filter, pageIndex: newPage });
    fetchTags({ ...filter, pageIndex: newPage });
  };
  
  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
};

const handleCloseConfirm = () => {
    setOpenConfirm(false);
};

  
  async function fetchAll() {
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

  const handleSave = async() => {
    
    //await fetchAll();
  };

  const handleDeleteRow = async(id)=>{
    const response = await deleteCateByID(id);
    
    if (response.status < 400) {
      router.push('/category');
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

  const handleDeleteRows = async (cate) => {
    console.log(cate);
    
  };


useEffect(() => {
    fetchAll();
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
              {Data.map((cate) => {
                const isSelected = selected.includes(cate.id);
                // const id= cate.id;
                return (
                  <TableRow
                    hover
                    key={cate.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(cate.id);
                          } else {
                            onDeselectOne?.(cate.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {cate.id}

                    </TableCell>
                    <TableCell>
                      {cate.name}
                    </TableCell>
                    <TableCell>
                      {cate.description}
                    </TableCell>
                    <TableCell>

                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                    <ModalEdit id={cate.id} onSave={handleSave} />
                      <Tooltip arrow placement="right" title="Delete">
                        <IconButton color="error" onClick={() => { handleOpenConfirm(), setEditdata(cate)}}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      <ConfirmDialog
                        open={openConfirm}
                        onClose={handleCloseConfirm}
                        title="Xóa"
                        content={
                            <>
                                Are you sure want to delete : <strong>{Editdata.name}</strong> ?
                            </>
                        }
                        action={
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => {
                                    handleDeleteRow(Editdata.id);
                                    handleCloseConfirm();
                                }}
                            >
                                Delete
                            </Button>
                        }
                    />
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
