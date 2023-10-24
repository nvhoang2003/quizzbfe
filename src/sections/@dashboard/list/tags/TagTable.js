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
import { deleteByID} from "@/dataProvider/questionbankApi";
import TagTableRows from "./TagTableRow";
import { getAllTags } from "@/dataProvider/tagApi";
//--------------------------------------------------------------

const TABLE_HEAD = [
  { id: "no", label: "#", align: "center" },
  { id: "name", label: "Tên câu hỏi", align: "center" },
  { id: "description", label: "Mô tả ", align: "center" },
  { id: "categoryId", label: "Loại câu hỏi", align: "center" },
  { id: "action", label: "Thao Tác", align: "left" },
];

export default function TagTable(prop) {

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

  const { filter, setFilter, list, setList, selectItem, setSelectItem } = prop;
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

    if (response.status < 400) {
      setSelected([]);
      enqueueSnackbar(response?.data?.message || "Xóa thành công", { variant: "success" });
    } else {
      enqueueSnackbar("Action error", { variant: "error" });
    }
    // await fetchQuiz();
  };

  useEffect(() => {
    fetchTags();
  }, [filter]);

  async function fetchTags() {
    const res = await getAllTags(filter);
    if (res.status < 400) {
      const transformData = res.data.data.map((tag) => {
        return {
          name: tag.name,
          id: tag.id,
          description: tag.description
        };
      });
      setList(transformData);
    }
  }

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
    router.push({
      pathname: `/questionbank/${item.questionstype}/[questionBankId]/detail`,
      query: { questionBankId: item.id },
    });
    // if (item.questionstype == "MultiChoice") {
    //   router.push({
    //     pathname: '/questionbank/multiChoiceQuestion/[questionBankId]/detail',
    //     query: { questionBankId: item.id },
    //   });
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
        {/* <TableSelectedAction
          dense={dense}
          numSelected={selected.length}
          onSelectAllRows={(checked) => onSelectAllRows(
            checked,
            listQuiz.map((row) => row.id)
          )}
        /> */}
        <Scrollbar >
          <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: '100%' }}>
            <TableHeadCustom
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={list.length}
              // numSelected={selected.length}
              // onSelectAllRows={(checked) =>
              //   onSelectAllRows(
              //     checked,
              //     list.map((row) => row.id)
              //   )}
            />
            <TableBodyCustom
              dense={dense}
              page={page}
              rowsPerPage={rowsPerPage}
              listItem={list}
              notFoundMessage={"Không có câu hỏi tương tự"}
            >
              {list?.map((item, index) => (
                <TagTableRows
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
