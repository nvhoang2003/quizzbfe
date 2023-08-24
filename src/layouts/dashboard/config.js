import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Overview',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Tags',
    path: '/tags',
    icon: (
      <SvgIcon fontSize="small">
         <CogIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Category',
    path: '/category',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Question Bank',
    path: '/questionbank',
    icon: (
      <SvgIcon fontSize="small">
         <CogIcon />
      </SvgIcon>
    )
  },
];
