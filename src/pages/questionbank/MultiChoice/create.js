import PropTypes from 'prop-types';
import { Card, Divider, Grid} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import MultiChoiceForm from '@/sections/@dashboard/form/questionbank/multichoice/form';

// ----------------------------------------------------------------------

NewForm.propTypes = {
    isEdit: PropTypes.bool,
    currentLevel: PropTypes.object,
};

export default function NewForm() {

    return (
        // <Grid container spacing={3}>
        //     <Grid item xs={12} >
                <Card sx={{ p: 3 }}>
                    <MultiChoiceForm />
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
