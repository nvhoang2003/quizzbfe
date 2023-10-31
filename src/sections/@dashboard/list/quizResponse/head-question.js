import { Stack, Typography } from "@mui/material";
import Image from "@/components/image";
import PropTypes from "prop-types";

const HeadQuestion = ({ question, indexQuestion, mark }) => {
  return (
    <Stack
      display="flex"
      flexDirection="row"
      alignItems="start"
      justifyContent="space-between"
    >
      <Stack display="flex">
        <Typography fontWeight="700" noWrap>
          Câu {indexQuestion}. {question?.content}
        </Typography>
        {question?.imageUrl && (
          <Image
            disabledEffect
            alt=""
            src={question?.imageUrl}
            sx={{ height: 300 }}
          />
        )}
      </Stack>

      <Stack display="flex" ml={2}>
        <Typography fontWeight="700" noWrap>
          Điểm: {mark || 0}
        </Typography>
      </Stack>
    </Stack>
  );
};

HeadQuestion.propTypes = {
  question: PropTypes.object,
  indexQuestion: PropTypes.number,
  mark: PropTypes.number
};

export default HeadQuestion;
