import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import PropTypes from "prop-types";

CustomTooltip.propTypes = {
  children: PropTypes.node,
  customTooltipStyle: PropTypes.object,
  customTooltipArrowStyle: PropTypes.object
};

export default function CustomTooltip({
  title,
  placement,
  children,
  customTooltipArrowStyle,
  customTooltipStyle,
  ...other
}) {
  const CustomTooltipStyle = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      ...customTooltipArrowStyle
    },
    [`& .${tooltipClasses.tooltip}`]: {
      ...customTooltipStyle
    },
  }));

  return (
    <CustomTooltipStyle title={title} placement={placement} {...other}>
      {children}
    </CustomTooltipStyle>
  );
}
