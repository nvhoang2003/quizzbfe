import PropTypes from 'prop-types';
import { Card, Divider, Grid} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import Form from './course_form';

// ----------------------------------------------------------------------

New.propTypes = {
    isEdit: PropTypes.bool,
    currentLevel: PropTypes.object,
};

export default function New() {

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} >
                <Card sx={{ p: 3 }}>
                    <Form />
                </Card>
            </Grid>
        </Grid>
    );
}

New.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
