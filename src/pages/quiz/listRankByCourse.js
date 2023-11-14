
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ClientRankingTable from '@/sections/@dashboard/list/ranking/ClientRankingTable';
import { getRanking } from '@/dataProvider/rankingApi';

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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function ListRankStudentInQuiz(prop) {
  const { quizId } = prop;
  console.log(quizId);
  const [course, setCourse] = React.useState([
    { id: 5, name: "Lop hoc demo" },
    { id: 6, name: "Lop hoc demo1" },
    { id: 7, name: "Lop hoc demo2" }
  ])
  const [data, setData] = React.useState({});


  async function fetchRanking(quizId) {
    const res = await getRanking(quizId);
    console.log(res);
    if (res.status < 400) {
      setData(res.data.data);
    } else {
      snackbarUtils.error(res.data.message);
    }
  }

  React.useEffect(() => {
    if (quizId) {
      fetchRanking(quizId);
    }
  }, [quizId]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', paddingTop: '25px', textAlign: "left" }}

      >
        {course?.map((tab, index) => (
          <Tab
            key={index}
            label={tab.name}
            {...a11yProps(index)}
            sx={{ paddingTop: '25px', ...(index === course.length - 1 && { paddingRight: "20px" }) }}
          />
        ))}
      </Tabs>
      {course?.map((tab, index) => (
        <TabPanel key={index} value={value} index={index} >
          {/* {tab.name} */}
          <ClientRankingTable ranking={data.listRanking} />
        </TabPanel>
      ))}
    </Box>
  );

}