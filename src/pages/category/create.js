import PropTypes from 'prop-types';
import { Card, Divider, Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import Form from './form';

// ----------------------------------------------------------------------

NewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentLevel: PropTypes.object,
};

export default function NewForm() {

  return ( 
      <Grid item xs={12} >
        <Card sx={{ p: 3 }}>
          <Form />
        </Card>
      </Grid>
  );
}

NewForm.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
