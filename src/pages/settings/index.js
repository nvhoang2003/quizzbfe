import React from 'react'
import { Layout as DashboardLayout } from '@/layouts/dashboard/layout';
import SettingCard from '@/components/card/settingCard';

export default function index() {
  return (
    <div>
      <div>
        <h2 className="text-center">Cài đặt hệ thống</h2>
        <div className="row">
          <div className="col-4">
            <SettingCard title="Role" content="Quản lí các vai trò trong hệ thống" link="/auth/register" />
          </div>
        </div>
      </div>
    </div>
  )
}

index.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);
