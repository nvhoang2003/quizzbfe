import PropTypes from 'prop-types';
import { Card, Divider, Grid} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import MatchingForm from '@/sections/@dashboard/form/questionbank/matching/form';

// ----------------------------------------------------------------------

export default function NewForm() {

    return (
        // <Grid container spacing={3}>
        //     <Grid item xs={12} >
                <Card sx={{ p: 3 }}>
                    <MatchingForm />
                </Card>
        //     </Grid>
        // </Grid>
    );
}

NewForm.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
