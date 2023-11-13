import { Scrollbar } from "@/components/scrollbar/scrollbar";
import { TableHeadCustom, TablePaginationCustom, useTable } from "@/components/table";
import TableBodyCustom from "@/components/table/TableBodyCustom";
import { Table, TableContainer } from "@mui/material";
import ScoreTableRows from "./ScoreTableRows";
import { getListResponseForPeopleDoQuiz } from "@/dataProvider/quizResponseApi";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import snackbarUtils from "@/utils/snackbar-utils";

const TABLE_HEAD = [
  { id: "no", label: "#", align: "left" },
  { id: "quizName", label: "Tên Đề Thi", align: "left" },
  { id: "userDoQuiz", label: "Người Làm Đề", align: "left" },
  { id: "timeStartQuiz", label: "Thời Gian Bắt Đầu", align: "center" },
  { id: "totalPointInQuiz", label: "Điểm Thi", align: "center" },
  { id: "passPoint", label: "Điểm Đạt", align: "center" },
  { id: "resultStatus", label: "Kết Quả", align: "center" },
  { id: "action", label: "Thao Tác", align: "left" },
];

export default function ScoreTable(prop) {
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

  const {filter, setFilter, listScore, setListScore} = prop;
  const router = useRouter();

  const [paging, setPaging] = useState({});

  const handlePageChange = useCallback(
    (event, pageIndex) => {
      setFilter({ ...filter, pageIndex: pageIndex });
    },
    [filter]
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setFilter({ ...filter, pageSize: event.target.value });
    },
    [filter]
  );
  
  useEffect(() => {
    fetchListScoreForPepleDoQuiz();
  }, [filter]);

  const fetchListScoreForPepleDoQuiz = async () => {
    const res = await getListResponseForPeopleDoQuiz(filter);
    
    if (res.status < 400) {
      setPaging(JSON.parse(res.headers["x-pagination"]));
      setListScore(res.data.data);
    } else {
      snackbarUtils.error(res.message);
    }
  }

  const switchToDetailQuizResponse = (id) => {
    return router.push(`/user/listscore/${id}`);
  }

  return (
    <TableContainer sx={{ position: "relative", overflow: "unset" }}>
      <Scrollbar>
        <Table size={dense ? "small" : "medium"} sx={{ minWidth: "100%" }}>
          <TableHeadCustom
            order={order}
            orderBy={orderBy}
            headLabel={TABLE_HEAD}
            rowCount={listScore.length}
            numSelected={selected.length}
          />
          <TableBodyCustom
            dense={dense}
            page={page}
            rowsPerPage={rowsPerPage}
            listItem={listScore}
            notFoundMessage={"Chưa có kết quả thi!"}
          >
            {listScore?.map((item, index) => (
              <ScoreTableRows
                key={index}
                row={item}
                seleted={selected.includes(item.id)}
                onShowRow={()=>switchToDetailQuizResponse(item.quizzAccess?.id)}
                index={index}
              />
            ))}
          </TableBodyCustom>
        </Table>
      </Scrollbar>
      <TablePaginationCustom
        paging={paging}
        onChangeRowsPerPage={handleRowsPerPageChange}
        onChangePage={handlePageChange}
        rowsPerPageOptions={[10, 25, 50, 100]}
      />
    </TableContainer>
  );
}
