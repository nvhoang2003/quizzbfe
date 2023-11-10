import React, { useEffect, useState } from 'react'
import { Scrollbar } from "@/components/scrollbar/scrollbar";
import {
  TableHeadCustom,
  useTable,
} from "@/components/table";
import TableBodyCustom from "@/components/table/TableBodyCustom";
import { Table, TableContainer } from "@mui/material";
import ClientRankingTableRow from './ClientRankingTableRow';

const TABLE_HEAD = [
  { id: "rank", label: "Thứ Hạng", align: "center" },
  { id: "studentName", label: "Tên Học Sinh", align: "left" },
  { id: "score", label: "Điểm", align: "left" },
  { id: "timeDoQuiz", label: "Thời Gian Làm Đề", align: "left" },
];

export default function ClientRankingTable(props) {
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
        <Table size={dense ? "small" : "medium"} sx={{ minWidth: "100%" }}>
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
