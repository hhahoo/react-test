import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import {Box, IconButton, Link} from '@material-ui/core'
import Icon from '@mdi/react'

//icons
import {
  mdiFacebook as FacebookIcon,
  mdiTwitter as TwitterIcon,
  mdiGithub as GithubIcon,
} from '@mdi/js'

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import HomeCard from "../../pages/home-card";
import Notifications from "../../pages/notifications";
import MyRolling from "../../pages/my/my-rolling";
import MyBanner from "../../pages/my/my-banner";
import Strings from "../../pages/strings";
import PersonalData from '../../pages/personal-data';
import Contacts from '../../pages/contact';
import Manual from '../../pages/manual';
import Maps from "../../pages/maps";
import CardManagement from "../../pages/card-management";
import TemplateManagement from "../../pages/template-management";
import CategoryManagement from "../../pages/category-management";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
              <Route path="/app/home-card" component={HomeCard} />
              <Route path="/app/card-management" component={CardManagement} />
              <Route path="/app/template-management" component={TemplateManagement} />
              <Route path="/app/category-management" component={CategoryManagement} />
              <Route path="/app/tables" component={CardManagement} />
              <Route path="/app/my/rolling" component={MyRolling} />
              <Route path="/app/my/banner" component={MyBanner} />
              <Route path="/app/string" component={Strings} />
              <Route path="/app/personal-data" component={PersonalData} />
              <Route path="/app/contact" component={Contacts} />
              <Route path="/app/manual" component={Manual} />
              <Route path="/app/notifications" component={Notifications} />
              <Route
                exact
                path="/app/ui"
                render={() => <Redirect to="/app/ui/icons" />}
              />
              <Route path="/app/ui/maps" component={Maps} />
              <Route path="/app/ui/icons" component={Icons} />
              <Route path="/app/ui/charts" component={Charts} />
            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
