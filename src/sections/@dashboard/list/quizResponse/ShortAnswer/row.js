import PropTypes from "prop-types";
import { Container, Stack, Typography } from "@mui/material";

const Row = ({ questionResult }) => {
  return (
    <>
      <Stack display="flex" flexDirection="row">
        <Typography fontWeight="700" mr={2}>
          Câu trả lời:
        </Typography>
        <Typography noWrap>{questionResult?.shortAnswerChoosen}</Typography>
      </Stack>
    </>
  );
};

Row.propTypes = {
  questionReult: PropTypes.object,
};

export default Row;
