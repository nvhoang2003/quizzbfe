import PropTypes from 'prop-types';
import { Card } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import Form from '@/sections/@dashboard/form/questionbank/dragDrops/drag-and-drop-form';
// ----------------------------------------------------------------------

NewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentLevel: PropTypes.object,
};

export default function NewForm() {

  return (
    <Card sx={{ p: 3 }}>
      <Form />
    </Card>
  );
}

NewForm.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
