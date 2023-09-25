import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { styled } from "@mui/material/styles";
import { withAuthGuard } from "src/hocs/with-auth-guard";
import { TopNav } from "./top-nav";
import BreadCrumbs from "@/components/bread-crumbs/BreadCrumbs";
import React from "react";

const SIDE_NAV_WIDTH = 10;

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});

export const Layout = withAuthGuard((props) => {
  const { children } = props;

  const [lastPath, setLastPath] = useState("");

  const setNewLastPath = (childData) => {
    setLastPath(childData);
  };
  const [showBreadCrumbs, setShowBreadCrumbs] = useState(false);

  const functionShowBreadCrumbs = (childData) => {
    setShowBreadCrumbs(childData);
  };

  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(false);

  const handlePathnameChange = useCallback(() => {
    if (openNav) {
      setOpenNav(false);
    }
  }, [openNav]);

  useEffect(
    () => {
      handlePathnameChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  return (
    <>
      <TopNav />
      <LayoutRoot
        sx={{
          mt: 8,
        }}
      >
        <LayoutContainer>
          {showBreadCrumbs != false && <BreadCrumbs lastPath={lastPath} />}
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              changeLastPath: setNewLastPath,
              changeBreadCrumbsStatus: functionShowBreadCrumbs, // Truyền dữ liệu xuống children thông qua props
            });
          })}
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
});
