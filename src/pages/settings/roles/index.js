import { React, useEffect, useState } from 'react'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import { Pagination, Box, Select, MenuItem, colors, Modal, styled, Button } from '@mui/material';
import { Layout as DashboardLayout } from '@/layouts/dashboard/layout';
import { getListRole, deleteRole } from '@/dataProvider/roleApi';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import ConfirmDialog from '@/components/confirm-dialog/ConfirmDialog';
//import useSnackbar from 'notistack';

export default function index() {
  const [roleData, setRoleData] = useState([]);

  const [deleteData, setDeleteData] = useState({
    name: '',
    description: '',
    id: 0,
  });

  const [isDeleted, setIsDeleted] = useState(false);

  const [openConfirm, setOpenConfirm] = useState(false);
  // const { enqueueSnackbar } = useSnackbar();

  const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .ant-empty-img-1': {
      fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
    },
    '& .ant-empty-img-2': {
      fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
    },
    '& .ant-empty-img-3': {
      fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
    },
    '& .ant-empty-img-4': {
      fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
    },
    '& .ant-empty-img-5': {
      fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
      fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
    },
  }));

  const [paging, setPaging] = useState({});

  const router = useRouter();

  const [filter, setFilter] = useState({
    pageIndex: 1,
    pageSize: 10
  });

  const handlePageChange = (event, newPage) => {
    setFilter({ ...filter, pageIndex: newPage });
    fetchRoles({ ...filter, pageIndex: newPage });
  };

  const handleChange = (event) => {
    setFilter({ ...filter, pageSize: event.target.value });
    fetchRoles({ ...filter, pageSize: event.target.value });
  };

  const columns = [
    { field: 'id', headerName: 'ID', headerClassName: 'bg-light-red', flex: 1 },
    { field: 'name', headerName: 'Name', headerClassName: 'bg-light-red', flex: 2 },
    { field: 'description', headerName: 'Description', headerClassName: 'bg-light-red', flex: 3 },
    {
      field: 'actions',
      type: 'actions',
      headerClassName: 'bg-light-red',
      headerName: 'Actions',
      flex: 1,
      cellClassName: 'actions',
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={
              <EditIcon />
            }
            label="Edit"
            onClick={() => router.push(`/settings/roles/${params.row.id}/edit`, undefined, { shallow: true })}
            color="success"
            size='25px'
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => { handleOpenConfirm(), setDeleteData(params.row) }}
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

  const handleDeleteRow = (id) => {
    deleteRole(id);
    setIsDeleted(true);
  };

  async function fetchRoles() {
    const res = await getListRole(filter);
    if (res.status < 400) {
      const transformData = res.data.data.map((role) => {
        return {
          name: role.name,
          id: role.id,
          description: role.description
        };
      });
      setPaging(JSON.parse(res.headers['x-pagination']));
      setRoleData(transformData);
    } else {
      return res;
    }
  }

  useEffect(() => {
    fetchRoles();
  }, [filter, isDeleted]);

  function CustomNoRowsOverlay() {
    return (
      <StyledGridOverlay>
        <svg
          width="120"
          height="100"
          viewBox="0 0 184 152"
          aria-hidden
          focusable="false"
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(24 31.67)">
              <ellipse
                className="ant-empty-img-5"
                cx="67.797"
                cy="106.89"
                rx="67.797"
                ry="12.668"
              />
              <path
                className="ant-empty-img-1"
                d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
              />
              <path
                className="ant-empty-img-2"
                d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
              />
              <path
                className="ant-empty-img-3"
                d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
              />
            </g>
            <path
              className="ant-empty-img-3"
              d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
            />
            <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
              <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
              <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
            </g>
          </g>
        </svg>
        <Box sx={{ mt: 1 }}>Không có dữ liệu</Box>
      </StyledGridOverlay>
    );
  }

  return (
    <main>
      <h3 className='text-center'>Quản lí vai trò</h3>
      <div style={{ width: '100%' }}>
        <Box
          sx={{
            height: 300,
            width: '100%',
            '& .bg-light-red': {
              backgroundColor: colors.grey[500]
            },
          }}
        >
          <DataGrid
            slots={{
              noRowsOverlay: CustomNoRowsOverlay
            }}
            rows={roleData}
            columns={columns}
            hideFooter
          />
        </Box>
      </div>
      <div className='right-item mx-3 row'>
        <div className='d-flex col-4'>
          <span className='text-center'>Rows Per Page</span>
          <Select
            size='small'
            fullWidth
            labelId="rows-per-page-label"
            id="rows-per-page"
            value={paging?.PageSize}
            onChange={handleChange}
            label="Rows Per Page"
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </div>
        <div className='col-3 center-item'>
          <Pagination
            count={paging?.TotalPages}
            rowsperpage={paging?.PageSize}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      </div>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Xóa"
        content={
          <>
            Are you sure want to delete Name: {deleteData.name}; Description: {deleteData.description} ?
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
    </main>
  )
}

index.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
