import { Scrollbar } from "@/components/scrollbar/scrollbar";
import {
  TableHeadCustom,
  TablePaginationCustom,
  useTable,
} from "@/components/table";
import TableBodyCustom from "@/components/table/TableBodyCustom";
import { Table, TableContainer } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import QuizTableRows from "./QuizTableRows";
import { deleteQuizById, getAllQuiz } from "@/dataProvider/quizApi";
import { enqueueSnackbar } from "notistack";
import { addQuizAccess } from "@/dataProvider/quizAccess";
import { jwtDecode } from "@/auth/utils";
import { getLocalStorage } from "@/dataProvider/baseApi";
import snackbarUtils from "@/utils/snackbar-utils";

const TABLE_HEAD = [
  { id: "no", label: "#", align: "left" },
  { id: "quizName", label: "Tên Đề", align: "left" },
  { id: "timeOpen", label: "Thời Gian Mở Đề", align: "center" },
  { id: "timeClose", label: "Thời Gian Đóng Đề", align: "center" },
  { id: "timeLimit", label: "Giới Hạn Thời Gian", align: "left" },
  { id: "passPoint", label: "Điểm Đạt", align: "left" },
  { id: "isPublic", label: "Công Khai", align: "left" },
  { id: "description", label: "Mô Tả", align: "left" },
  { id: "action", label: "Thao Tác", align: "left" },
];

export default function QuizTable(prop) {
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

  const { filter, setFilter, listQuiz, setListQuiz } = prop;
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

  const handleShowRow = async (quizId) => {
    const token = getLocalStorage("access_token");
    const dataToken = jwtDecode(token);

    const params = {
      userId: parseInt(dataToken.nameid),
      quizId: parseInt(quizId),
      timeStartQuiz: null,
      status: "Wait",
    };
    const response = await addQuizAccess(params);

    if (response.status < 400) {
      const accessId = response.data.data.id;
      router.push({
        pathname: "/testquiz/[id]",
        query: { id: accessId },
      });
    } else {
      enqueueSnackbar("Vui lòng thử lại!", { variant: "error" });
    }
  };

  const handleDeleteRow = async (selected) => {
    const response = await deleteQuizById(selected);

    if (response.status < 400) {
      setSelected([]);
      await fetchQuiz();
      enqueueSnackbar(response?.data?.message || "Xóa Thành Công", { variant: "success" });
    } else {
      enqueueSnackbar("Action error", { variant: "error" });
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [filter]);

  const fetchQuiz = async () => {
    const res = await getAllQuiz(filter);

    if (res.status < 400) {
      setPaging(JSON.parse(res.headers["x-pagination"]));
      setListQuiz(res.data.data);
    } else {
      snackbarUtils.error();(res.message);
    }
  };

  const switchToUpdate = (id) => {
    router.push({
      pathname: "/quiz/[quizId]/edit",
      query: { quizId: id },
    });
  };

  return (
    <TableContainer sx={{ position: "relative", overflow: "unset" }}>
      <Scrollbar>
        <Table size={dense ? "small" : "medium"} sx={{ minWidth: "100%" }}>
          <TableHeadCustom
            order={order}
            orderBy={orderBy}
            headLabel={TABLE_HEAD}
            rowCount={listQuiz.length}
            numSelected={selected.length}
          />
          <TableBodyCustom
            dense={dense}
            page={page}
            rowsPerPage={rowsPerPage}
            listItem={listQuiz}
            notFoundMessage={"Chưa có đề nào. Hãy tạo mới!"}
          >
            {listQuiz?.map((item, index) => (
              <QuizTableRows
                key={index}
                row={item}
                seleted={selected.includes(item.id)}
                onSelectRow={() => onSelectRow(item.id)}
                // onShowRow={() => handleShowRow(item.id)}
                onUpdateRow={() => switchToUpdate(item.id)}
                onDeleteRow={() => handleDeleteRow(item.id)}
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
        rowsPerPageOptions={[10, 25, 50]}
      />
    </TableContainer>
  );
}
