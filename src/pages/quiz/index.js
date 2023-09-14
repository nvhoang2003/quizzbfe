import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableContainer,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useRouter } from "next/navigation";
import { Scrollbar } from "@/components/scrollbar/scrollbar";
import { useFormik } from "formik";
import * as Yup from "yup";
import TableSearch from "@/components/table/searchTable";
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  emptyRows,
  getComparator,
  useTable,
} from "@/components/table";
import QuizTableRows from "@/sections/@dashboard/list/quiz/QuizTableRows";
import { getAllQuiz } from "@/dataProvider/quizApi";

const TABLE_HEAD = [
  { id: "no", label: "#", align: "left" },
  { id: "quizName", label: "Tên Đề", align: "left" },
  { id: "timeOpen", label: "Thời Gian Mở Đề", align: "center" },
  { id: "timeClose", label: "Thời Gian Đóng Đề", align: "center" },
  { id: "timeLimit", label: "Giới Hạn Thời Gian", align: "left" },
  { id: "passPoint", label: "Điểm Đạt", align: "center" },
  { id: "isPublic", label: "Công Khai", align: "left" },
  { id: "description", label: "Mô Tả", align: "left" },
  { id: "action", label: "Thao Tác", align: "left" },
];

const Page = (props) => {
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

  const router = useRouter();

  const [listQuiz, setListQuiz] = useState([
    {
      id: 0,
      name: "",
      description: "",
      timeOpen: new Date(),
      timeClose: new Date(),
      timeLitmit: "",
      pointToPass: 0.0,
      maxPoint: 0.0,
      isPublic: 0,
      createDate: new Date(),
      updateDate: new Date(),
    },
  ]);
  const denseHeight = dense ? 52 : 72;

  const [paging, setPaging] = useState({});
  const [filter, setFilter] = useState({
    pageIndex: 1,
    pageSize: 10,
  });
  const isNotFound = listQuiz.length == 0;

  const handleDeleteRow = async (selected) => {
    // const response = await deleteCustomer(selected);
    // if (response.status < 400) {
    //   setSelected([]);
    //   await fetchCustomer();
    //   enqueueSnackbar("Action successfuly", { variant: "success" });
    // } else {
    //   enqueueSnackbar("Action error", { variant: "error" });
    // }
  };

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

  const formikSearch = useFormik({
    initialValues: {
      quizzName: "",
      timeOpen: "",
      timeClose: "",
      isPublic: 0,
      submit: null,
    },
    validationSchema: Yup.object({}),
    onSubmit: async (values, helpers) => {
      try {
        const response = await auth.signIn(values.username, values.password);

        if (response.status < 400) {
        } else {
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  const switchToAddPage = () => {
    router.push("quiz/new_form");
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
      console.log(res.message);
    }
  };

  return (
    <>
      <Head>
        <title>Danh sách đề thi</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">
                  <Box sx={{ textTransform: "uppercase" }}>
                    Danh sách đề thi
                  </Box>
                </Typography>
              </Stack>
              <Stack>
                <Button
                  color="primary"
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={switchToAddPage}
                >
                  Tạo đề
                </Button>
              </Stack>
            </Stack>

            <TableSearch
              formikSearch={formikSearch}
              fields={
                <TextField
                  error={
                    !!(
                      formikSearch.touched.quizzName &&
                      formikSearch.errors.quizzName
                    )
                  }
                  helperText={
                    formikSearch.touched.quizzName &&
                    formikSearch.errors.quizzName
                  }
                  onBlur={formikSearch.handleBlur}
                  onChange={formikSearch.handleChange}
                  value={formikSearch.values.quizzName}
                  label="Tên Đề"
                  name="quizzName"
                />
              }
            />
            <TableContainer sx={{ position: "relative", overflow: "unset" }}>
              <Scrollbar>
                <Table
                  size={dense ? "small" : "medium"}
                  sx={{ minWidth: "100%" }}
                >
                  <TableHeadCustom
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={listQuiz.length}
                    numSelected={selected.length}
                  />
                  <TableBody>
                    {listQuiz?.map((item, index) => (
                      <QuizTableRows
                        key={item.id}
                        row={item}
                        seleted={selected.includes(item.id)}
                        onSelectRow={() => onSelectRow(item.id)}
                        onDeleteRow={() => handleDeleteRow(item.id)}
                        index={index}
                      />
                    ))}
                    <TableEmptyRows
                      height={denseHeight}
                      emptyRows={emptyRows(page, rowsPerPage, listQuiz.length)}
                    />

                    <TableNoData
                      isNotFound={isNotFound}
                      message="Chưa có đề nào. Hãy tạo mới!"
                    />
                  </TableBody>
                </Table>
              </Scrollbar>
              <TablePaginationCustom
                paging={paging}
                onChangeRowsPerPage={handleRowsPerPageChange}
                onChangePage={handlePageChange}
                rowsPerPageOptions={[10, 25, 50]}
              />
            </TableContainer>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
