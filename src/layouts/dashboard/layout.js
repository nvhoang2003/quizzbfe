import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { withAuthGuard } from 'src/hocs/with-auth-guard';
import { TopNav } from './top-nav';
import BreadCrumbs from '@/components/bread-crumbs/BreadCrumbs';
import { Stack } from '@mui/material';

const SIDE_NAV_WIDTH = 10;

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: SIDE_NAV_WIDTH
  }
}));

const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%'
});

export const Layout = withAuthGuard((props) => {
  const { children, showBreadCrumbs } = props;

  return (
    <>
      <TopNav />
      <LayoutRoot>
        <LayoutContainer>
          {showBreadCrumbs != false &&

            <Stack  sx={{
              py: 2
            }}>
              <BreadCrumbs />
            </Stack>


          }
          {children}
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
});
