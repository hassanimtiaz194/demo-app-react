import React, { useEffect, useState, Fragment, useRef } from "react";
import IdleTimer from "react-idle-timer";
import { connect } from "react-redux";
import clsx from "clsx";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { arrayOf, shape } from "prop-types";
import { createStructuredSelector } from "reselect";
import Button from "@material-ui/core/Button";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
//import BracketSelect from "components/BracketSelect";
import ProfileMenu from "components/ProfileMenu";
import DashboardMessage from "components/DashboardMessage";
import QuickLinkDialog from "components/QuickLinkDialog/index.js";
import SessionExpiredDialog from "components/SessionExpiredDialog"
import RequestResponseStatusSnackbar from "components/RequestResponseStatusSnackbar";
import { useLocation } from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home'
import LinkIcon from '@material-ui/icons/Link'
import ApplicationsIcon from '@material-ui/icons/SettingsApplications';
import CardMedia from '@material-ui/core/CardMedia';
import MenuIcon from '@material-ui/icons/Menu';

import {
  dashboardActions,
  contestantFormTemplateActions,
  authActions,
  contestantFormActions,
} from "redux/actions";
import {
  authSelectors,
  contestantFormTemplateSelectors,
  dashboardSelectors,
  profileSelectors,
  commonApiSelectors,
  contestantFormSelectors
} from "redux/selectors";

import useStyles from "./styles";
import BracketSelected from "components/BracketSelected";
import CountDownTimer from "components/CountDownTimer";
import QuickLinks from "components/QuickLinks";
import BracketSelectedDialog from "components/BracketSelectedDialog";
import { ChevronLeftRounded, Close } from "@material-ui/icons";

function DashboardLayout(props) {
  const classes = useStyles();
  const idleTimerRef = useRef(null);
  const { routes } = props;
  const location = useLocation();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(routes[0].path);
  const [eventLogo, setEventLogo] = useState('');
  const [isOneBracket, setIsOneBracket] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [isAppPageClicked, setIsAppPageClicked] = useState(false);
  const [isAriaExpanded, setIsAriaExpanded] = useState(false);

  // state actions
  const { loadDashboardMsg, loadQuickLinks, loadBrackets, logout } = props;

  // state props
  const {
    quickLinks,
    selectedBracketId,
    currentPhaseNumber,
    profile,
    sessionExpired = false,
    event,
    currentSessionExpired,
    onAppLogout,
    sessionLogout,
    submissionDate,
    saveContestantForm,
    contestantFormTemplate, 
    downloadMediaFile
  } = props;

  useEffect(() => {
    let filename = event.eventLogo.split("/");
    filename = filename[filename.length - 1];
    if (filename !== 'placeHolder.jpg') {
      setEventLogo(event.eventLogo.replace('/small/', '/large/'));
    }
  }, [event, eventLogo]);

  const [profileState, setProfileState] = useState({
    timezone: "",
  });

  useEffect(() => {
    if (profile) {
      setProfileState(profile);
    }
  }, [profile, currentPhaseNumber]);

  useEffect(() => {
    setSelectedRoute(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    /* currentSessionExpired(); */
    loadBrackets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedBracketId && (currentPhaseNumber || currentPhaseNumber === 0)) {
      loadDashboardMsg(selectedBracketId, currentPhaseNumber);
      loadQuickLinks(selectedBracketId, currentPhaseNumber);
    }
    else if (selectedBracketId === null && (currentPhaseNumber || currentPhaseNumber === 0)) {
      loadQuickLinks(0, currentPhaseNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBracketId, currentPhaseNumber]);

  useEffect(() => {
    if (quickLinksOpen === false) {
      setIsAriaExpanded(false)
    }
  }, [quickLinksOpen]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const hideDrawer = () => {
    setMobileOpen(false);
  };
  const onIdle = () => {
    currentSessionExpired();
    if (location.pathname === "/applications" && !submissionDate && contestantFormTemplate.disableForm !== true) {
      saveContestantForm();
    }
    //if (sessionExpired) {
    window.addEventListener('popstate', () => {
      sessionLogout();
    })
    //}
  };
  const MenuIconss = (props) => {
    if (props.name === "Profile")
      return <AccountCircleIcon style={{ fill: "#fff" }} />;
    else if (props.name === "Team")
      return <GroupIcon style={{ fill: "#fff" }} />;
    else if (props.name === "Applications")
      return <ApplicationsIcon style={{ fill: "#fff" }} />;
    else if (props.name === "Home")
      return <HomeIcon style={{ fill: "#fff" }} />;
    else
      return <MenuIcon />;
  }

  const drawer = (
    <div>
      <a className={classes.skipToContentLink} href="#main">
        Skip to content
      </a>
      <CardMedia
        component="img"
        className={classes.logo}
        image={eventLogo}
        alt={event?.eventName + " " + event?.eventDescription}
        id='React-EventImage'
      />
      {/* <div className={classes.toolbar} /> */}
      <Divider />
      <List>
        {routes.map((route, index) => {
          return (
            <>
              {route.name === "Team" && event.teamAddOn === true && (
                <li key={index}>
                  <MenuItem
                    onClick={() => {
                      if (route.name === 'Applications') {
                        setIsAppPageClicked(true);
                      } else {
                        hideDrawer();
                      }
                    }
                /* hideDrawer */}
                    className={classes.listItem}
                    component={Link}
                    selected={selectedRoute === `/${route.path}`}
                    classes={{ selected: classes.selected }}
                    to={() => {
                      if (`/${route.path}` === '/applications') {
                        if (selectedBracketId === null || selectedBracketId === undefined) {
                          if (isAppPageClicked) {
                            setShowDialog(true);
                            hideDrawer();
                            setIsAppPageClicked(false);
                          }
                          return selectedRoute;
                        } else {
                          return `/${route.path}`;
                        }
                      } else {
                        return `/${route.path}`;
                      }
                      /* return `/${route.path}`; */
                    }}
                    aria-current={selectedRoute === `/${route.path}` && ("page")}
                    role='link'
                    key={route.name}
                    tabIndex={0}
                    button
                  >
                    <ListItemIcon>
                      <MenuIconss name={route.name} />
                    </ListItemIcon>
                    <ListItemText primary={route.name} />
                  </MenuItem>
                </li>
              )}
              {route.name !== "Team" /* && event.teamAddOn === true */ && (
                <li key={index}>
                  <MenuItem
                    onClick={() => {
                      if (route.name === 'Applications') {
                        setIsAppPageClicked(true);
                      } else {
                        hideDrawer();
                      }
                    }
                /* hideDrawer */}
                    className={classes.listItem}
                    component={Link}
                    selected={selectedRoute === `/${route.path}`}
                    classes={{ selected: classes.selected }}
                    to={() => {
                      if (`/${route.path}` === '/applications') {
                        if (selectedBracketId === null || selectedBracketId === undefined) {
                          if (isAppPageClicked) {
                            setShowDialog(true);
                            hideDrawer();
                            setIsAppPageClicked(false);
                          }
                          return selectedRoute;
                        } else {
                          return `/${route.path}`;
                        }
                      } else {
                        return `/${route.path}`;
                      }
                      /* return `/${route.path}`; */
                    }}
                    aria-current={selectedRoute === `/${route.path}` && ("page")}
                    role='link'
                    key={route.name}
                    tabIndex={0}
                    button
                  >
                    <ListItemIcon>
                      <MenuIconss name={route.name} />
                    </ListItemIcon>
                    <ListItemText primary={route.name} />
                  </MenuItem>
                </li>
              )}
            </>
          )
        })}
        {/* <QuickLinks selectedBracketId={selectedBracketId} quickLinks={quickLinks}/> */}
        <Fragment>

          <MenuItem
            onClick={() => {
              // hideDrawer();
              setIsAriaExpanded(true)
              setQuickLinksOpen(!quickLinksOpen);
            }}
            className={classes.listItem}
            classes={{ selected: classes.selected }}
            tabIndex={0}
            button
            role='button'
            aria-expanded={isAriaExpanded}

          >
            <ListItemIcon>
              <LinkIcon style={{ fill: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Quick Links" />
            {quickLinksOpen ? <ExpandLess /> : <ExpandMore />}
          </MenuItem>
          <li>
            <Collapse
              className={classes.nestedItemsContainer}
              in={quickLinksOpen}
              timeout="auto"
              unmountOnExit
            >
              {!quickLinks && (
                <ListItem className={classes.listItem}>
                  <Typography variant="caption">
                    No Quick Links
                  </Typography>
                </ListItem>
              )}
              {quickLinks && (
                <List disablePadding>
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <QuickLinkDialog key={link.name} quickLink={link} downloadMediaFile={downloadMediaFile}>
                        {/*    ListItem
                      button
                component={Button} */ }
                        <Button
                          href={link.link}
                          style={{ width: 250 }}
                          className={classes.nested + " " + classes.listItem}
                        >
                          <ListItemText primary={link.name} className={classes.nested} />
                        </Button>
                      </QuickLinkDialog>
                    </li>

                  ))}
                </List>
              )}
            </Collapse>
          </li>
        </Fragment>
      </List>
    </div >
  );

  const layout = (
    <div className={classes.root}>
      <IdleTimer
        ref={idleTimerRef}
        timeout={3660000}
        onIdle={onIdle}
      ></IdleTimer>
      {/* <DashboardMessage /> */}
      <SessionExpiredDialog
        sessionExpired={sessionExpired}
        onGoLoginPage={logout}
        onAppLogout={onAppLogout}
      //sessionLogout={sessionLogout}
      />
      <RequestResponseStatusSnackbar />

      <AppBar
        position="fixed"
        className={classes.appBar}
        style={{ color: "black" }}
      >

        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIconss />
          </IconButton>

          <Grid container spacing={2}>
            {/* <Grid item xs>
              <BracketSelect></BracketSelect>
            </Grid> */}
            {location.pathname === '/applications' && (
              <Fragment>
                <Grid item xs>
                  <BracketSelected setIsOneBracket={setIsOneBracket} />
                </Grid>
              </Fragment>
            )}
            <Grid item xs style={{ marginTop: location.pathname === '/applications' && isOneBracket ? -28 : '' }}>
              <ProfileMenu />
            </Grid>

          </Grid>
        </Toolbar>

      </AppBar>


      <nav className={classes.drawer} aria-label="Side" >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >

            <IconButton
              style={{ color: 'white' }}
              aria-label='Close Menu'
              onClick={handleDrawerToggle}>
              <Close />
            </IconButton>

            <Divider style={{ backgroundColor: 'white' }} />
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main
        onClick={hideDrawer}
        id='main'
        className={clsx(classes.content, {
          [classes.contentShiftRight]: !theme.breakpoints.down("xs"),
        })}
      >
        <div className={classes.toolbar} />
        {props.children}
        <div className={classes.drawerHeader} />
        {showDialog && (<BracketSelectedDialog showDialog={showDialog} setShowDialog={setShowDialog} />)}
      </main>
    </div >
  );
  return layout;
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  routes: arrayOf(
    shape({
      path: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
};

const mapStateToProps = createStructuredSelector({
  quickLinks: dashboardSelectors.makeSelectQuickLinks(),
  selectedBracketId:
    contestantFormTemplateSelectors.makeSelectContestantFormTemplateSelectedBracketId(),
  currentPhaseNumber: dashboardSelectors.makeSelectCurrentPhaseNumber(),
  phaseList: dashboardSelectors.makeSelectTimelinePhaseList(),
  profile: profileSelectors.makeSelectProfile(),
  sessionExpired: authSelectors.makeSelectIsSessionExpired(),
  event: commonApiSelectors.makeSelectEventInfo(),
  submissionDate: contestantFormSelectors.makeSelectSubmissionDateIfAny(),
  contestantFormTemplate:
    contestantFormTemplateSelectors.makeSelectContestantFormTemplateForm(),
});

const mapDispatchToProps = function (dispatch) {
  return {
    loadDashboardMsg: (bracketId, phaseNumber) => {
      dispatch(dashboardActions.loadDashboardMsg(bracketId, phaseNumber));
    },
    loadQuickLinks: (bracketId, phaseNumber) => {
      dispatch(dashboardActions.loadQuickLinks(bracketId, phaseNumber));
    },
    loadBrackets: () => {
      dispatch(contestantFormTemplateActions.loadBracketList());
    },
    onAppLogout: () => {
      dispatch(authActions.appLogout());
    },
    logout: () => {
      dispatch(authActions.logout());
    },
    currentSessionExpired: () => {
      dispatch(authActions.sessionExpired());
    },
    sessionLogout: () => {
      dispatch(authActions.sessionLogout());
    },
    saveContestantForm: () => {
      dispatch(contestantFormActions.saveForm());
    },
    downloadMediaFile: (payload) => {
      dispatch(dashboardActions.downloadMediaFile(payload))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardLayout);
