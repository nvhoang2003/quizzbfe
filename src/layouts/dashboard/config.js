import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Trang Chủ',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  // {
  //   title: 'Tags',
  //   path: '/tags',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //        <CogIcon />
  //     </SvgIcon>
  //   )
  // },
  {
    title: 'Khóa học',
    path: '/tags',
    icon: (
      <SvgIcon fontSize="small">
         <CogIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Danh mục',
    path: '/tags',
    icon: (
      <SvgIcon fontSize="small">
         <CogIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Câu hỏi',
    path: '/category',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Ngân hàng câu hỏi',
    path: '/questionbank',
    icon: (
      <SvgIcon fontSize="small">
         <CogIcon />
      </SvgIcon>
    )
  },
  
  {
    title: 'Cài đặt',
    path: '/settings',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  },
 
];
