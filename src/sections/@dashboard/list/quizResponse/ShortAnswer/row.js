import PropTypes from "prop-types";
import { Stack, Typography } from "@mui/material";

const Row = ({ questionResult, isPublic }) => {
  return (
    <>
      <Stack display="flex" flexDirection="row">
        <Typography fontWeight="700" mr={2} pl={3}>
          Câu trả lời:
        </Typography>
        <Typography noWrap>{questionResult?.shortAnswerChoosen}</Typography>
      </Stack>
    </>
  );
};

Row.propTypes = {
  questionReult: PropTypes.object,
  isPublic: PropTypes.bool
};

export default Row;
