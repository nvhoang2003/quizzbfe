import NextLink from "next/link";
import PropTypes from "prop-types";
import { Box, ButtonBase } from "@mui/material";

export const TopNavItem = (props) => {
  const { active = false, disabled, external, icon, path, title } = props;

  const linkProps = path
    ? external
      ? {
          component: "a",
          href: path,
          target: "_blank",
        }
      : {
          component: NextLink,
          href: path,
        }
    : {};

  return (
    // <li>
    <ButtonBase
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "flex-start",
        px: 2,
        py: 1,
        mx: 0.5,
        textAlign: "center",
        // ...(active && {
        //   borderBottom: 3,
        //   borderColor: "primary.main",
        // }),
        // "&:hover": {
        //   borderBottom: 3,
        //   borderColor: "primary.main",
        // },
      }}
      className={active ? "nav-item-active" : ""}
      {...linkProps}
    >
      {icon && (
        <Box
          component="span"
          sx={{
            alignItems: "center",
            color: "neutral.400",
            display: "inline-flex",
            justifyContent: "center",
            mr: 2,
            ...(active && {
              color: "#ede7f6",
            }),
          }}
        >
          {icon}
        </Box>
      )}
      <Box
        component="span"
        sx={{
          flexGrow: 1,
          fontFamily: (theme) => theme.typography.fontFamily,
          fontSize: 15,
          fontWeight: 600,
          lineHeight: "26px",
          whiteSpace: "nowrap",
          ...(active && {
            color: "common.black",
            fontWeight: 700,
          }),
          ...(disabled && {
            color: "neutral.500",
          }),
        }}
      >
        {title}
      </Box>
    </ButtonBase>
    // </li>
  );
};

TopNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired,
};
