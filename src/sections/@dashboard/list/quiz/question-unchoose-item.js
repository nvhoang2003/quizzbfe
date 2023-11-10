import {
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
  TableRow,
  TableCell
} from "@mui/material";
import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';

export default function QuestionUnchooseItem(props) {
  const { item, onSelectRow } = props;
  const [isChecked, setIsChecked] = useState(false);
  const handleHeaderCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    onSelectRow();
  };

  return (
    <TableRow hover >
      <TableCell padding="checkbox">
        <Checkbox
          checked={isChecked}
          onChange={handleHeaderCheckboxChange}
        />
      </TableCell>
      <TableCell align="center">{item?.questionsType}</TableCell>
      <TableCell align="center">{item?.content}</TableCell>
      <TableCell align="center">{item?.authorName}</TableCell>
      <TableCell align="center">{item?.defaultMark}</TableCell>
    </TableRow>
  )
}
