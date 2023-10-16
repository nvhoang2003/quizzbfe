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
import { deleteQuizById, getAllQuiz } from "@/dataProvider/quizApi";
import { enqueueSnackbar } from "notistack";
import { deleteByID, getAllQuestionbank } from "@/dataProvider/questionbankApi";
import QuestionBankTableRows from "./QuestionBankTableRow";
import { Iconify } from '@iconify/react';
import { selectClasses } from "@mui/base";
import snackbarUtils from "@/utils/snackbar-utils";
//--------------------------------------------------------------

const TABLE_HEAD = [
  { id: "no", label: "#", align: "center" },
  { id: "name", label: "Tên câu hỏi", align: "center" },
  { id: "questionstype", label: "Dạng câu hỏi", align: "center" },
  { id: "authorName", label: "Tên Tác Giả", align: "center" },
  { id: "tags", label: "tags", align: "center" },
  { id: "categoryName", label: "Loại câu hỏi", align: "center" },
  { id: "isPublic", label: "Công khai", align: "center" },
  { id: "action", label: "Thao Tác", align: "left" },
];

export default function QuestionBankTable(prop) {

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    // //

    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { filter, setFilter, listQuiz, setListQuiz, selectItem, setSelectItem } = prop;
  const [selected, setSelected] = useState([]);
  const [selectedAll, setSelctedAll] = useState(false);
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

  const handleDeleteRow = async (id) => {
    const response = await deleteByID(id);
    console.log(response);
    if (response.status < 400) {
      setSelected([]);
      await fetchQuiz();
      enqueueSnackbar("response?.data?.message", { variant: "success" });
    } else {
      enqueueSnackbar("Action error", { variant: "error" });
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [filter]);

  const fetchQuiz = async () => {
    const res = await getAllQuestionbank(filter);
    if (res.status < 400) {
      setPaging(JSON.parse(res.headers["x-pagination"]));
      setListQuiz(res.data.data);
    } else {
      console.log(res.message);
    }
  };

  const switchToUpdate = (item) => {
    // if (item.questionstype == "MultiChoice") {
      router.push({
        pathname: `/questionbank/${item.questionstype}/[questionBankId]/edit`,
        query: { questionBankId: item.id },
      });
    // } if (item.questionstype == "TrueFalse") {
    //   router.push({
    //     pathname: '/questionbank/TrueFalseQuestion/[questionBankId]/edit',
    //     query: { questionBankId: item.id },
    //   });
    // }
  }
  const handleShowDetails = (item) => {
    // if (item.questionstype == "MultiChoice") {
      router.push({
        pathname: `/questionbank/${item.questionstype}/[questionBankId]/detail`,
        query: { questionBankId: item.id },
      });
    // } if (item.questionstype == "TrueFalse") {
    //   router.push({
    //     pathname: '/questionbank/TrueFalseQuestion/[questionBankId]/detail',
    //     query: { questionBankId: item.id },
    //   });
    // }
  }



  const handleSelectRow = (itemId) => {
    if (selected.includes(itemId)) {
      setSelected(selected.filter((id) => id !== itemId));
    } else {
      setSelected([...selected, itemId]);
    }

  };

  useEffect(() => {
    setSelectItem(selected)
  }, [selected]);

  return (
    <Card sx={{ p: 4 }}>
      <TableContainer sx={{ position: "relative", overflow: "unset", paddingBottom: "25px" }}>
        <TableSelectedAction
          dense={dense}
          numSelected={selected.length}
          onSelectAllRows={(checked) => onSelectAllRows(
            checked,
            listQuiz.map((row) => row.id)
          )}
        />
        <Scrollbar >
          <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: '100%' }}>
            <TableHeadCustom
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={listQuiz.length}
              numSelected={selected.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  listQuiz.map((row) => row.id)
                )}
            />
            <TableBodyCustom
              dense={dense}
              page={page}
              rowsPerPage={rowsPerPage}
              listItem={listQuiz}
              notFoundMessage={"Không có câu hỏi tương tự"}
            >
              {listQuiz?.map((item, index) => (
                <QuestionBankTableRows
                  key={index}
                  row={item}
                  selected={selected.includes(item.id)}
                  onShow={() => handleShowDetails(item)}
                  onSelectRow={() => handleSelectRow(item.id)}
                  onUpdateRow={() => switchToUpdate(item)}
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

    </Card>

  );
}
