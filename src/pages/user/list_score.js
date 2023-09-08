import React from 'react';
import { Layout as DashboardLayout } from '@/layouts/dashboard/layout';
import { Breadcrumbs } from '@mui/material';

const list_score = () => {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" />
      <div>list_score</div>
    </>
  )
};

list_score.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default list_score;
