import React from 'react';
import { useRouter } from "next/router";
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import { addQuizAccess } from '@/dataProvider/quizAccess';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon
} from '@mui/material';

export default function ListPrivateQuizForClient(props) {
  const { quizzes, sx } = props;
  const { push } = useRouter();

  //check time

  const handleClick = (id) => {
    push(`/testquiz/${id}`);
  }


  return (
    <Card sx={sx}>
      <List>
        {quizzes?.map((item, index) => {
          const hasDivider = index < quizzes.length - 1;
          return (
            <ListItem
              key={index}
              divider={hasDivider}
              onClick={() => handleClick(item.quizAccess.id)}
            >
              <ListItemText
                primary={item.quizName}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
              <IconButton edge="end">
                <SvgIcon>
                  <EllipsisVerticalIcon />
                </SvgIcon>
              </IconButton>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};

ListPrivateQuizForClient.propTypes = {
  quizzes: PropTypes.array,
  sx: PropTypes.object
};
