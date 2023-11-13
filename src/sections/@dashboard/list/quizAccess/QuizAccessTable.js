import { Scrollbar } from "@/components/scrollbar/scrollbar";
import {
  TableHeadCustom,
  TablePaginationCustom,
  TableSelectedAction,
  useTable,
} from "@/components/table";
import TableBodyCustom from "@/components/table/TableBodyCustom";
import { Card, IconButton, Table, TableContainer, Tooltip } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import QuizAccessTableRows from "./QuizAccessTableRow";
import { deleteQuizAccess, getAll } from "@/dataProvider/quizAccess";
import ConfirmDialogQuizAccess from "@/components/confirm-dialog/ConfirmDialogQuizAccess";
import snackbarUtils from "@/utils/snackbar-utils";


//--------------------------------------------------------------

const TABLE_HEAD = [
  { id: "no", label: "#", align: "center" },
  { id: "userId", label: "user", align: "center" },
  { id: "status", label: "Status", align: "center" },
  { id: "quiz", label: "Quiz", align: "center" },
  { id: "courseid", label: "Course", align: "center" },
  { id: "timeStartQuiz", label: "Thời gian bắt đầu làm bài", align: "center" },
  { id: "action", label: "Thao Tác", align: "left" },
];

export default function QuizAccessTable(prop) {
  const { push } = useRouter();

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    // //

    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { filter, setFilter, listQuiz, setListQuiz, selectItem, setSelectItem } = prop;
  const [selected, setSelected] = useState([]);
  const router = useRouter();
  const [paging, setPaging] = useState({});
  //const [selectedItem, setSelectedItem] = useState(null);

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



  const handleDeleteRow = async (id) => {
    const response = await deleteQuizAccess(id);
    if (response.status < 400) {
      await fetchAllQuizAccess();
      enqueueSnackbar(response.data.message, { variant: "success" });
    } else {
      enqueueSnackbar(response.data.title, { variant: "error" });
    }
  };

  useEffect(() => {
    fetchAllQuizAccess();
  }, [filter]);


  const fetchAllQuizAccess = async () => {
    const res = await getAll(filter);
    if (res.status < 400) {
      const quizResponse = res.data.data;
      setPaging(JSON.parse(res.headers["x-pagination"]));
      setListQuiz(quizResponse);
    } else {
      return res;
    }
  };

  const [isOpen, setOpen] = useState(false);


  const handleOpenClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const switchToUpdate = (item) => {
    setSelected(item);

    if (item?.quiz?.isPublic) {
      snackbarUtils.error("Đây không phải thuộc đề kiểm tra, bạn không thể chỉnh sửa được ");
    } else {
      handleOpenClick();
    }

  };

  return (
    <Card sx={{ p: 4 }}>
      <TableContainer sx={{ position: "relative", overflow: "unset", paddingBottom: "25px" }}>
        <Scrollbar >
          <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: '100%' }}>
            <TableHeadCustom
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={listQuiz.length}
            // numSelected={selected.length}
            />
            <TableBodyCustom
              dense={dense}
              page={page}
              rowsPerPage={rowsPerPage}
              listItem={listQuiz}
              notFoundMessage={"Không có câu hỏi tương tự"}
            >
              {listQuiz?.map((item, index) => (
                <QuizAccessTableRows
                  key={index}
                  row={item}
                  onUpdateRow={() => {
                    switchToUpdate(item);
                    // handleOpenClick();
                  }}
                  onDeleteRow={() => handleDeleteRow(item.id)}
                  index={index}
                />
              ))}

              <ConfirmDialogQuizAccess
                open={isOpen}
                onClose={() => { handleClose() }}
                isEdit={isOpen}
                title={"Cập nhật QuizAccess"}
                content={{
                  userId: selected?.userId,
                  courseId: selected?.quiz?.courseid,
                  quizId: selected?.quizId,
                  id: selected?.id,
                  status: selected?.status,
                  quiz: selected?.quiz?.name
                }}
              />


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

    </Card>

  );
}
