// import { useState } from 'react'; 
import { Container } from '@mui/material'
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import FormSaveChange from '@/components/form/category/FormSaveChange';

//---------------------------------------------------
  // NewForm.getLayout = (page) =>(
  //   <DashboardLayout>
  //     {page}
  //   </DashboardLayout>
  // );
//---------------------------------------------------
export default function NewForm() {
      return (
        <Container maxWidth='100%'>
            {/* new Cate */}
           <FormSaveChange />
        </Container>
      );
};
NewForm.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
