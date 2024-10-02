import React, { useEffect, useState } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  AmpStoriesRounded,
  ArrowBack as ArrowBackIcon,
  FilterNone as UIElementsIcon,
  HelpOutline as FAQIcon,
  Home as HomeIcon,
  LibraryBooks as LibraryIcon,
  QuestionAnswer as SupportIcon,
  ShortText,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

// context
import { toggleSidebar, useLayoutDispatch, useLayoutState } from "../../context/LayoutContext";

const structure = [
  { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
  {
    id: 1,
    label: "홈카드 관리",
    link: "/app/ui",
    icon: <UIElementsIcon />,
    children: [
      { label: "카드 관리", link: "/app/card-management" },
      { label: "탬플릿 관리", link: "/app/template-management" }
    ],
  },
  { id: 2, label: "카테고리 관리", link: "/app/category-management", icon: <AmpStoriesRounded /> },
  // { id: 4, label: "마이 배너", link:  "/app/my/banner", icon: <LibraryIcon /> },
  { id: 4, label: "문구 관리", link:  "/app/string", icon: <ShortText /> },
  { id: 4, label: "개인화 슬롯 관리", link:  "/app/personal-data", icon: <ShortText /> },
  { id: 5, type: "divider" },
  { id: 6, type: "title", label: "HELP" },
  { id: 7, label: "Contact Point", link: "/app/contact", icon: <LibraryIcon /> },
  { id: 8, label: "Manual", link: "/app/manual", icon: <SupportIcon /> },
  { id: 9, label: "FAQ", link: "https://flatlogic.com/forum", icon: <FAQIcon /> },
  { id: 10, type: "divider" },
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
