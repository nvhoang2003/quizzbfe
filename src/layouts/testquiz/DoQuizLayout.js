import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { TopNav } from '../dashboard/top-nav';
import { SideNav } from './SideNav';
import React from 'react';

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

export const DoQuizLayout = ({children}) => {
  // const { children } = props;
  // console.log(props)
  return (
    <>
      <TopNav />
      <LayoutRoot>
        <LayoutContainer>
          <SideNav>
            {children}
          </SideNav>
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
};

DoQuizLayout.prototypes = {
  children: PropTypes.node
};
