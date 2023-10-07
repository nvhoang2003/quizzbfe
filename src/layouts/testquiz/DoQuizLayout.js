import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { TopNav } from '../dashboard/top-nav';
import { SideNav } from './SideNav';
import { useState } from 'react';
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


export const DoQuizLayout = (props) => {
  const [info, setInfo] = useState({
    name: '',
    course: '',
    quiz: '',
  });

  const { children } = props;

  const setNewInfo = (name, course, quiz) => {
    setInfo({
      name: name,
      course: course,
      quiz: quiz,
    })
  };
  return (
    <>
      <TopNav />
      <LayoutRoot>
        {/* <TopNav /> */}
        <LayoutContainer>
          <SideNav informationDoQuiz={info} />
          <div className='ml-300'
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: "100px"
            }}>
            {React.Children.map(children, (child) => {
              return React.cloneElement(child, {
                changeInfo: setNewInfo,
              });
            })}
          </div>
        </LayoutContainer>
      </LayoutRoot>
    </>

  );
};

DoQuizLayout.prototypes = {
  children: PropTypes.node
};
