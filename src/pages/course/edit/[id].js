import PropTypes from 'prop-types';
import { Card, Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { React, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCourseByID } from '@/dataProvider/courseApi';
import Form from '../course_form';

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

  async function fetchGetByID() {
    const res = await getCourseByID(id);
    if (res.status < 400) {
      const course = res.data.data;
      const transformData = {
        id: course.id,
        fullname: course.fullname,
        shortname: course.shortname,
        startDate : course.startDate,
        endDate :course.endDate,
        description: course.description,
      };
      setEditData(transformData);
      
    } else {
      return res;
    }
  };


  useEffect(() => {
    if (id) {
        fetchGetByID(id);
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
