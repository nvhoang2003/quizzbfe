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
import QuestionTableRows from "./tableQuestionTableRow";
import { deleteMultiById, deleteQuestionById, getAllQuestion } from "@/dataProvider/questionApi";


//--------------------------------------------------------------

const TABLE_HEAD = [
  { id: "no", label: "#", align: "center" },
  { id: "name", label: "Tên câu hỏi", align: "center" },
  { id: "questionstype", label: "Dạng câu hỏi", align: "center" },
  { id: "authorName", label: "Tên Tác Giả", align: "center" },
  { id: "isPublic", label: "Công khai", align: "center" },
  { id: "action", label: "Thao Tác", align: "left" },
];

export default function QuestionTable(prop) {
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
    const response = await deleteQuestionById(id);
    if (response.status < 400) {
      await fetchQuiz();
      enqueueSnackbar(response.data.message, { variant: "success" });
    } else {
      enqueueSnackbar("Action error", { variant: "error" });
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [filter]);

  const fetchQuiz = async () => {
    const res = await getAllQuestion(filter);
    console.log(res);
    if (res.status < 400) {
      setPaging(JSON.parse(res.headers["x-pagination"]));
      setListQuiz(res.data.data);
    } else {
      console.log(res.message);
    }
  };

  const switchToShow = (item) => {
    router.push({
      pathname: `/questionbank/${item.questionsType}/${item.id}/detail`,
      query: {
        question: item.id
      },
    });
  }


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
              numSelected={selected.length}
            />
            <TableBodyCustom
              dense={dense}
              page={page}
              rowsPerPage={rowsPerPage}
              listItem={listQuiz}
              notFoundMessage={"Không có câu hỏi tương tự"}
            >
              {listQuiz?.map((item, index) => (
                <QuestionTableRows
                  key={index}
                  row={item}
                  selected={selected.includes(item.id)}
                  onShowRow={() => switchToShow(item)}
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
