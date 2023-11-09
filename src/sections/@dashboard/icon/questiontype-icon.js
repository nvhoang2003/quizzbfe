import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Crop169Icon from "@mui/icons-material/Crop169";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import RuleIcon from "@mui/icons-material/Rule";
import { SvgIcon, Tooltip } from "@mui/material";

const QuestionTypeIcon = ({ questionType }) => {
  const QuestionsType = [
    {
      type: "MultiChoice",
      label: "Chọn Đáp Án",
      icon: <FormatListBulletedIcon />,
    },
    {
      type: "ShortAnswer",
      label: "Điền Đáp Án",
      icon: <Crop169Icon />,
    },
    {
      type: "DragAndDropIntoText",
      label: "Di Chuyển Đáp Án",
      icon: <OpenWithIcon />,
    },
    {
      type: "Match",
      label: "Ghép Đôi",
      icon: null,
    },
    {
      type: "TrueFalse",
      label: "Đúng Sai",
      icon: <RuleIcon />,
    },
  ];

  const questiontype = QuestionsType.find((item) => item.type == questionType);

  return (
    <Tooltip title={questiontype?.label}>
      <SvgIcon>{questiontype?.icon}</SvgIcon>
    </Tooltip>
  );
};

export default QuestionTypeIcon;
