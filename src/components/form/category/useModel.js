import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,Tooltip,IconButton,Box } from '@mui/material';
import { getCateByID, updateCateByID } from '@/dataProvider/categoryApi';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

const ModalEdit = ({ id,onSave }) => {
  const [open, setOpen] = useState(false);
  const [editedData, setEditedData] = useState([]);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  async function fetchCateByID() {
    const res = await getCateByID(id);
    if (res.status < 400) {
      const cate = res.data.data;
      const transformData = {
        name: cate.name,
        id: cate.id,
        description: cate.description
      };
    setEditedData(transformData);
    } else {
      return res;
    }
  };

  async function fetchUpdateCateByID(){
    try {
      const res = await updateCateByID(id, {
        name : editedData.name,
        description: editedData.description
      });
      if (res.status < 400) {
        router.push('/category');
        enqueueSnackbar('Chỉnh sửa thành công!', { variant: 'success' });
      } else {
        enqueueSnackbar('Đã xảy ra lỗi !', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Đã xảy ra lỗi !', { variant: 'error' });    }
    
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    fetchUpdateCateByID();
    window.location.reload();
    handleClose();
  };


  useEffect(() => {
    fetchCateByID();
  }, []);


  return (
    <div>

      <Tooltip arrow placement="left" title="Edit">
        <IconButton onClick={handleOpen}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 2, width: '25ch' },
      }}
     
    >
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ paddingBottom: '20px' }}>Edit Category</DialogTitle>
        <DialogContent sx={{
            paddingTop: '20px' // Điều chỉnh giá trị padding tại đây
          }}>
       
          <TextField
            name="name"
            label="Name"
            value={editedData.name}
            onChange={handleChange}
            margin="dense" 
            fullWidth
          />
          
          <TextField
            name="description"
            label="Description"
            value={editedData.description}
            onChange={handleChange}
            margin="dense" 
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      </Box>
    </div>
  );
};

export default ModalEdit;