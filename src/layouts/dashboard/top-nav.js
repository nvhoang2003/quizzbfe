import { useState } from "react";
import PropTypes from "prop-types";
import BellIcon from "@heroicons/react/24/solid/BellIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  useMediaQuery,
  AppBar,
  MenuItem,
  Container,
  Toolbar,
  Typography,
  Menu,
  Button,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { usePopover } from "src/hooks/use-popover";
import { AccountPopover } from "./account-popover";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import { items } from "./config";
import { SideNavItem } from "./side-nav-item";
import { TopNavItem } from "./top-nav-item";
import { usePathname } from "next/navigation";
import { getLocalStorage } from "@/dataProvider/baseApi";

export const TopNav = () => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const accountPopover = usePopover();
  const pathname = usePathname();
  const userLocal = getLocalStorage("user");

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar position="fixed" color="inherit">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 800,
                letterSpacing: ".3rem",
                color: "black",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              {!lgUp && (
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {items.map((item) => {
                  const active = item.path ? pathname === item.path : false;
                  const isNoPermission = item.role.includes(
                    ...[userLocal?.roles]
                  );

                  return (
                    !isNoPermission && (
                      <TopNavItem
                        active={active}
                        disabled={item.disabled}
                        external={item.external}
                        icon={item.icon}
                        key={item.title}
                        path={item.path}
                        title={item.title}
                      />
                    )
                  );
                })}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 800,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {items.map((item) => {
                const active = item.path ? pathname === item.path : false;
                const isNoPermission = item.role.includes(
                  ...[userLocal?.roles]
                );

                return (
                  !isNoPermission && (
                    <TopNavItem
                      active={active}
                      disabled={item.disabled}
                      external={item.external}
                      key={item.title}
                      path={item.path}
                      title={item.title}
                    />
                  )
                );
              })}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Stack alignItems="center" direction="row" spacing={2}>
                <Avatar
                  onClick={accountPopover.handleOpen}
                  ref={accountPopover.anchorRef}
                  sx={{
                    cursor: "pointer",
                    height: 40,
                    width: 40,
                  }}
                />
              </Stack>
              <AccountPopover
                anchorEl={accountPopover.anchorRef.current}
                open={accountPopover.open}
                onClose={accountPopover.handleClose}
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func,
};
