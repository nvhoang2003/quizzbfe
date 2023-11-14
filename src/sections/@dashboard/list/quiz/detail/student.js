import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";
import QuizAccessTable from "@/sections/@dashboard/list/quizAccess/QuizAccessTable";

//-------------------------------------------------------------

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Student(prop) {
  const { quizId } = prop;
  
  const [listQuiz, setListQuiz] = useState([]);
  const [filter, setFilter] = useState({
    pageIndex: 1,
    pageSize: 10,
    quizId: quizId,
  });
  const [selectItem, setSelectItem] = useState([]);

  return (
      <QuizAccessTable
        filter={filter}
        setFilter={setFilter}
        listQuiz={listQuiz}
        setListQuiz={setListQuiz}
        selectItem={selectItem}
        setSelectItem={setSelectItem}
      />
  );
}
