import React, { Fragment, useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Menu, MenuItem } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

import { connect } from "react-redux";
import { authActions, profileActions } from "redux/actions";

import useStyles from "./style";
import { Link, useLocation } from "react-router-dom";
import { profileSelectors, commonApiSelectors, globalSelectors } from "redux/selectors";
import { createStructuredSelector } from "reselect";

function ProfileMenu(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isPlaceHolder, setIsPlaceHolder] = useState(false);
  const open = Boolean(anchorEl);
  const { onLogout, onAppLogout, profile, loadProfile, eventInfo, requestResponse } = props;
  const location = useLocation();
  const [profilePicture, setProfilePicture] = useState('');
  const [isAriaExpanded, setIsAriaExpanded] = useState(false);

  const handleClose = () => {
    setAnchorEl(null);
    setIsAriaExpanded(false);
  };
  const handleLogout = () => {
    handleClose();
    setIsAriaExpanded(false);
    onAppLogout();
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
    setIsAriaExpanded(true);

  };
  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      setAnchorEl(event.currentTarget);
      setIsAriaExpanded(true);
    }
  };
  function stringAvatar(name) {
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  useEffect(() => {
    if (profile !== null) {
      let filename = profile.picture.split("/");
      filename = filename[filename.length - 1];
      if (filename === 'placeHolder.jpg') {
        setIsPlaceHolder(true);
      } else {
        setIsPlaceHolder(false);
        setProfilePicture(profile.picture.replace('/small/', '/large/'));
      }
    }
    if (profile === null) {
      loadProfile();
    }
    /* else{
      setIsPlaceHolder(true);
    } */
  }, [profile, isPlaceHolder, profilePicture]);

  useEffect(() => {
    if (requestResponse === 'Logged Out Successfully') {
      onLogout();
    }
  }, [requestResponse])
  return (
    <Fragment>
      {/* <IconButton
        aria-label="account of current user"
        aria-haspopup="true"
        className={classes.root}
        onClick={handleMenu}
        style={{marginTop: location.pathname ==='/home'?  '-24px ' : '8px'}}
      >
        <AccountCircle />
      </IconButton> */}
      {isPlaceHolder ?
        <Avatar variant="circular"
          className={classes.root}
          alt={eventInfo?.eventName + ' profile'}
          {...stringAvatar(`${profile.firstName} ${profile.lastName}`)}
          aria-label={eventInfo?.eventName + ' profile ' + (isAriaExpanded ? 'expanded' : 'collapsed')}
          onClick={handleMenu}
          style={{ marginTop: location.pathname === '/applications' ? '11px ' : '-18px', borderColor: '#979797' }}
          tabIndex={0}
          aria-controls="avatar-menu"
          aria-haspopup="true"
          role='button'
          //component='Button'
          /*  imgProps={{ */
          /*  aria-expanded={isAriaExpanded} */
          /*   }} */
          onKeyPress={handleKeyPress}
        />
        : <Avatar variant="circular"
          className={classes.root}
          alt={eventInfo?.eventName + ' profile'}
          src={profilePicture}
          aria-label={eventInfo?.eventName + ' profile ' + (isAriaExpanded ? 'expanded' : 'collapsed')}
          onClick={handleMenu}
          style={{ marginTop: location.pathname === '/applications' ? '11px ' : '-18px' }}
          tabIndex={0}
          aria-controls="avatar-menu"
          aria-haspopup="true"
          role='button'
          /*  aria-expanded={isAriaExpanded}
           imgProps={{
             "aria-expanded": isAriaExpanded
           }} */
          onKeyPress={handleKeyPress}
        />
      }
      <Menu
        id="avatar-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem component={Link} to={"/profile"} onClick={handleClose}>
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>Log out</MenuItem>
      </Menu>
    </Fragment>
  );
}
const mapStateToProps = createStructuredSelector({
  profile: profileSelectors.makeSelectProfile(),
  eventInfo: commonApiSelectors.makeSelectEventInfo(),
  requestResponse: globalSelectors.makeSelectGlobalRequestResponseMessage(),
});
const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    onAppLogout: () => {
      dispatch(authActions.appLogout());
    },
    onLogout: () => {
      dispatch(authActions.logout());
    },
    loadProfile: () => {
      dispatch(profileActions.loadProfile());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMenu);
