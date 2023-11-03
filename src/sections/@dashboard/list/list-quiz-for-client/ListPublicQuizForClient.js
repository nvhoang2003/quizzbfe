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

export default function ListPublicQuizForClient(props) {
  const { quizzes, sx } = props;
  const { push } = useRouter();

  //check time
  console.log(localStorage.getItem("userId"));
  const handleClick = async (id) => {
    const dataAdd = {
      userId: localStorage.getItem("userId"),
      quizId: id,
      timeStartQuiz: new Date(),
      status: "Doing"
    }
    const res = await addQuizAccess(dataAdd);
    const accessId = res.data.data.id;
    push(`/testquiz/${accessId}`);
  }


  return (
    <Card sx={sx}>
      <List>
        {quizzes?.map((item, index) => {
          const hasDivider = index < quizzes.length - 1;

          return (
            <ListItem
              divider={hasDivider}
              key={item.id}
              onClick={() => handleClick(item.id)}
            >
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondaryTypographyProps={{ variant: 'body2' }}
                sx={{
                  cursor: "pointer"
                }}
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

ListPublicQuizForClient.propTypes = {
  quizzes: PropTypes.array,
  sx: PropTypes.object
};
