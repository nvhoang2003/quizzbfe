import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import ShoppingBagIcon from "@heroicons/react/24/solid/ShoppingBagIcon";
import { AccountBalance, QuestionMark, Tag } from "@mui/icons-material";
import { SvgIcon } from "@mui/material";

export const items = [
  {
    title: "Trang Chủ",
    path: "/",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
    disabled: false
  },
  {
    title: "Danh mục",
    path: "/tags",
    icon: (
      <SvgIcon fontSize="small">
        <Tag />
      </SvgIcon>
    ),
    disabled: false
  },
  {
    title: "Câu hỏi",
    path: "/question",
    icon: (
      <SvgIcon fontSize="small">
        <QuestionMark />
      </SvgIcon>
    ),
    disabled: false
  },
  {
    title: "Ngân hàng câu hỏi",
    path: "/questionbank",
    icon: (
      <SvgIcon fontSize="small">
        <AccountBalance />
      </SvgIcon>
    ),
    disabled: false
  },
  {
    title: "Quiz",
    path: "/quiz",
    icon: (
      <SvgIcon fontSize="small">
        <QuestionMark />
      </SvgIcon>
    ),
    disabled: false
  },
  {
    title: "QuizAccess",
    path: "/quizAccess",
    icon: (
      <SvgIcon fontSize="small">
        <QuestionMark />
      </SvgIcon>
    ),
    disabled: false
  },
  {
    title: "Cài đặt",
    path: "/settings",
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    ),
    disabled: false
  },
];
