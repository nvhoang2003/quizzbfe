
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getRanking } from '@/dataProvider/rankingApi';
import { getCourseByUser } from '@/dataProvider/courseApi';
import { Grid, Table, TableContainer } from '@mui/material';
import { TableHeadCustom, useTable } from '@/components/table';
import TableBodyCustom from '@/components/table/TableBodyCustom';
import { Scrollbar } from '@/components/scrollbar/scrollbar';


//-------------------------------------------------------

const TABLE_HEAD = [
  { id: "rank", label: "Thứ Hạng", align: "center" },
  { id: "studentName", label: "Tên Học Sinh", align: "left" },
  { id: "score", label: "Điểm", align: "left" },
  { id: "timeDoQuiz", label: "Thời Gian Làm Đề", align: "left" },
];

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`vertical-tabpanel-${index}`}
//       aria-labelledby={`vertical-tab-${index}`}
//       {...other}

//     >
//       {value === index && (
//         // <Box sx={{ p: 3 }}>
//         <>
//           {children}
//         </>

//         //  </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `vertical-tab-${index}`,
//     'aria-controls': `vertical-tabpanel-${index}`,
//   };
// }

export default function ListRankStudentInQuiz(prop) {
  const { quizId } = prop;
  const [course, setCourse] = React.useState([])
  const [data, setData] = React.useState({});

  async function fetchCourse() {
    const res = await getCourseByUser();
    if (res.status < 400) {
      const q = res.data.data;
      setCourse(q);
    } else {
      snackbarUtils.error(res.data.message);
    }
  }


  async function fetchRanking(quizId) {
    const res = await getRanking(quizId);
    if (res.status < 400) {
      setData(res.data.data);
    } else {
      snackbarUtils.error(res.data.message);
    }
  }

  React.useEffect(() => {
    if (quizId) {
      fetchRanking(quizId);
      // fetchCourse();
    }
  }, [quizId]);

  // const [value, setValue] = React.useState(0);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  return (
    <Box
      sx={{ bgcolor: 'background.paper', display: 'flex' }}
    >
      <Grid container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        item xs={12}
        >
        <ClientRankingTable ranking={data.listRanking} />
      </Grid>
      {/* <Tabs
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
            label={tab.fullName}
            {...a11yProps(index)}
            sx={{ paddingTop: '25px', ...(index === course.length - 1 && { paddingRight: "20px" }) }}
          />
        ))}
      </Tabs>
      {course?.map((tab, index) => (
        <TabPanel key={index} value={value} index={index} >
          <ClientRankingTable ranking={data.listRanking} />
        </TabPanel>
      ))} */}
    </Box>
  );

}


function ClientRankingTable(props) {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { ranking } = props;

  // const {listRanking, setListRanking} = useState([]);

  // useEffect(() => {
  //   if(ranking){
  //     setListRanking(ranking);
  //   }
  // })

  return (
    <TableContainer sx={{ position: "relative", overflow: "unset" }}>
      <Scrollbar>
        <Table size={dense ? "small" : "medium"} sx={{ width: "100%" }}>
          <TableHeadCustom
            order={order}
            orderBy={orderBy}
            headLabel={TABLE_HEAD}
            rowCount={ranking?.length}
            numSelected={selected.length}
          />
          <TableBodyCustom
            dense={dense}
            page={page}
            rowsPerPage={rowsPerPage}
            listItem={ranking}
          >
            {ranking?.map((item, index) => (
              <ClientRankingTableRow
                key={index}
                row={item}
                seleted={selected.includes(item.id)}
                index={index}
              />
            ))}
          </TableBodyCustom>
        </Table>
      </Scrollbar>
    </TableContainer>
  )
}

function ClientRankingTableRow(props) {
  const {
    row,
    selected,
    index
  } = props;

  const {
    rank,
    studentName,
    score,
    timeDoQuiz
  } = row;

  const getColorByRank = (rank) => {
    switch (rank) {
      case 1:
        return "#E45858";
        break;
      case 2:
        return "#D5C30B"
        break;
      case 3:
        return "#2FAE03"
        break;
      case 4:
        return "#2777C1"
        break;
      case 5:
        return "#BBBAB3"
        break;
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      <TableRow hover selected={selected}>
        <TableCell align="center" sx={{ color: getColorByRank(rank) ? getColorByRank(rank) : null, fontWeight: 'bold', fontSize: "x-large" }}>{rank}</TableCell>
        <TableCell align="left">{formatedNullString(studentName)}</TableCell>
        <TableCell align="left">{formatedNullString(score)}</TableCell>
        <TableCell align="left">{formatedNullString(timeDoQuiz)}</TableCell>
      </TableRow>
    </React.Fragment>
  )
}

