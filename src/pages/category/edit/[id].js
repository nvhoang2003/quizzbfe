import PropTypes from 'prop-types';
import { Card, Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { getCateByID } from '@/dataProvider/categoryApi';
import { React, useEffect, useState } from 'react';
import Form from '../form';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

Edit.propTypes = {
  isEdit: PropTypes.bool,
  currentLevel: PropTypes.object,
};

export default function Edit() {
  const [editData, setEditData] = useState({});
  const {
    query: { id }
  } = useRouter()

  async function fetchCateByID() {
    const res = await getCateByID(id);
    if (res.status < 400) {
      const cate = res.data.data;
      const transformData = {
        name: cate.name,
        id: cate.id,
        description: cate.description
      };
      setEditData(transformData);
      
    } else {
      return res;
    }
  };


  useEffect(() => {
    if (id) {
      fetchCateByID(id);
    }
  }, [id]);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <Card sx={{ p: 3 }}>
            <Form isEdit={true} currentLevel={editData} />
          </Card>
        </Grid>
      </Grid>
    </div>

  );
}

Edit.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
