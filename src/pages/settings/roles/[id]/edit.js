import { React, useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { getRoleById, updateRole } from '@/dataProvider/roleApi';
import { FormControl, TextField, Button, Stack } from '@mui/material';

export default function edit() {
  const [roleData, setRoleData] = useState({
    name: '',
    description: '',
  });

  const handleNameChange = (e) => {
    setRoleData({ ...roleData, name: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setRoleData({ ...roleData, description: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(roleData)
    updateRole(id, roleData);
  };

  const {
    query: { id }
  } = useRouter();

  async function fetchRoles() {
    const res = await getRoleById(id);
    if (res.status < 400) {
      const transformData = {
        name: res.data.data.name,
        description: res.data.data.description,
      };
      setRoleData(transformData);
    } else {
      console.log(res)
      return res;
    }
  }

  useEffect(() => {
    if (id) {
      fetchRoles();
    }
  }, [id]);

  return (
    <div>
      <h3 className='text-center'>Sửa vai trò</h3>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <FormControl >
            <TextField
              label="Name"
              value={roleData.name}
              onChange={handleNameChange} />
          </FormControl>
          <FormControl >
            <TextField
              label="Description"
              value={roleData.description}
              onChange={handleDescriptionChange} />
          </FormControl>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </Stack>
      </form>
    </div>
  )
}
