// import { useState } from 'react'; 
import { Container } from '@mui/material'
import {FormSaveChangeTag} from '@/components/form/tags/FormSaveChangeTag';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

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
            new Tags
           {/* <FormSaveChangeTag /> */}
        </Container>
      );
};
NewForm.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
