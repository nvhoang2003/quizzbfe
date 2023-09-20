import PropTypes from "prop-types";

import { Button, Stack, SvgIcon, TextField } from "@mui/material";
import FormProvider from "@/components/form/FormProvider";
import { RotateLeft, Search } from "@mui/icons-material";

export default function TableSearch(props) {
  const { formikSearch, fields } = props;

  return (
    <Stack sx={{ bgcolor: "#f2f4f7", p: 1 }}>
      <FormProvider onSubmit={formikSearch.handleSubmit}>
        <Stack
          display="flex"
          flexWrap="wrap"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            px: 1,
            gap: 1,
          }}
        >
          <Stack
            display="flex"
            flexWrap="wrap"
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            {fields && fields}
          </Stack>
          <Stack
            display="flex"
            flexWrap="wrap"
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            sx={{
              px: 3,
              gap: 1,
            }}
          >
            <Button
              color="primary"
              startIcon={
                <SvgIcon fontSize="small">
                  <Search />
                </SvgIcon>
              }
              type="submit"
              variant="contained"
              disabled={formikSearch.isValidating || formikSearch.isSubmitting}
            >
              Tìm kiếm
            </Button>
            <Button
              color="error"
              startIcon={
                <SvgIcon fontSize="small">
                  <RotateLeft />
                </SvgIcon>
              }
              variant="contained"
              onClick={formikSearch.handleReset}
            >
              Xóa
            </Button>
          </Stack>
        </Stack>
      </FormProvider>
      {/* <h1>lammomqua{formikSearch}</h1> */}
    </Stack>
  );
}
