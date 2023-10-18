import PropTypes from 'prop-types';
import { Card, Divider, Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import FormTrueFalseQuestionBank from '@/sections/@dashboard/form/questionbank/formTrueFalseQuestion';

// ----------------------------------------------------------------------

NewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentLevel: PropTypes.object,
};

export default function NewForm() {

  return (

    <Card sx={{ p: 3 }}>
      <FormTrueFalseQuestionBank />
    </Card>

  );
}

NewForm.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
