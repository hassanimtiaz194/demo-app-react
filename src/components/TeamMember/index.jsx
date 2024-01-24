import React, { useState, useEffect } from "react";
import * as moment from "moment";

import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@material-ui/core";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import Tooltip from '@material-ui/core/Tooltip';
import useStyles from "./styles";
import { useEventListener } from "hooks/useEventListener";
import {
  // eslint-disable-next-line no-unused-vars
  TeamMember,
  TEAM_MEMBER_USER_TYPES,
  TEAM_MEMBER_STATUS,
} from "typedefs/team.typedef";

/**
 * @typedef {Object} TeamMemberProps
 * @property {TeamMember} member
 * @property {boolean} allowEdit
 * @property {number} teamLeaderUserId
 * @property {number} currentUserId
 * @property {function} onSendEmail
 * @property {function} onDeleteMember
 * @property {function} onMakeTeamLeader
 */

/**
 *
 * @param {TeamMemberProps} props
 * @returns
 */
export default function TeamMemberComponent(props) {
  const classes = useStyles();
  const [isPlaceHolder, setIsPlaceHolder] = useState(false);
  const [profilePicture, setProfilePicture] = useState('');

  const { member, allowEdit, teamLeaderUserId, currentUserId } = props;

  const [show1, setShow1] = React.useState(false);
  const [show2, setShow2] = React.useState(false);

  const handler = React.useCallback((e) => {
    if (e.key === "Escape") {
      setShow1(false);
      setShow2(false)
    }
  }, []);

  useEventListener("keydown", handler);


  function stringAvatar(name) {
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  useEffect(() => {
    let filename = member.userPicture.split("/");
    filename = filename[filename.length - 1];
    if (filename === 'placeHolder.jpg') {
      setIsPlaceHolder(true);
    } else {
      setIsPlaceHolder(false);
      setProfilePicture(member.userPicture.replace('/small/', '/large/'));
    }
  }, [member, isPlaceHolder, profilePicture]);

  return (
    <Card className={classes.root}>
      <CardActionArea component='div' tabindex="-1">
        {isPlaceHolder ?
          <Avatar variant="circular" className={classes.avatarText} alt={member.firstName + ' Profile Picture'} {...stringAvatar(`${member.firstName} ${member.lastName}`)} />
          : <Avatar variant="circular" className={classes.avatar} alt={member.firstName + ' Profile Picture'} src={profilePicture} />
        }

        <CardContent className={classes.cardContent}>
          <Typography gutterBottom style={{ fontSize: '1.35rem', fontWeight: 700 }} variant="h3">
            {`${member.firstName} ${member.lastName}`}
          </Typography>
          {member.status === TEAM_MEMBER_STATUS.ACTIVE && (
            <Typography variant="body2" style={{ color: "#000000",fontWeight:700}} component="p">
              {member.userType === TEAM_MEMBER_USER_TYPES.CONTESTANT_LEADER
                ? "Team Leader"
                : "Team Member"}
            </Typography>
          )}
          {member.status === TEAM_MEMBER_STATUS.INVITED && (
            <Typography
              variant="body2"
              style={{ color: "#000000",fontWeight:700, fontStyle: "italic" }}
              component="p"
            >
              {`Invited on ` + member.createdAt}
            </Typography>
          )}
          <a className={classes.email}>
            {member.email}
          </a>
        </CardContent>
      </CardActionArea>
      {allowEdit && (
        <CardActions className={classes.cardActions}>
          {member.status === TEAM_MEMBER_STATUS.INVITED && (

            <Tooltip
              title={"Resend Invitation Email to " + `${member.firstName} ${member.lastName}`}
              open={show1}
              disableHoverListener
              disableFocusListener
              onFocus={() => setShow1(true)}
              onBlur={() => setShow1(false)}
              onMouseEnter={() => setShow1(true)}
              onMouseLeave={() => setShow1(false)}
              aria-label={"Resend Invitation Email to " + `${member.firstName} ${member.lastName}`}>

              <IconButton
                style={{ color: '#949494' }}
                className={classes.teamPageButton}
                onClick={() => {
                  props.onSendEmail(member.userId);
                }}
              >
                <EmailRoundedIcon />
              </IconButton>
            </Tooltip>
          )}
          {member.userId === teamLeaderUserId ? (
            <Tooltip title="Current Team Leader" aria-label="Current Team Leader">
              <StarRoundedIcon color="primary" />
            </Tooltip>
          ) : (
            <Tooltip title={"Make " + `${member.firstName} ${member.lastName}` + ' Team Leader'} aria-label={"Make " + `${member.firstName} ${member.lastName}` + ' Team Leader'}>
              <IconButton
                style={{ color: '#949494' }}
                className={classes.teamPageButton}
                disabled={props.member.status !== 'Active' ? true : false}
                onClick={() => {
                  props.onMakeTeamLeader(member);
                }}
              >
                <StarBorderRoundedIcon />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip
            title={"Delete " + `${member.firstName} ${member.lastName}`}
            open={show2}
            disableHoverListener
            disableFocusListener
            onFocus={() => setShow2(true)}
            onBlur={() => setShow2(false)}
            onMouseEnter={() => setShow2(true)}
            onMouseLeave={() => setShow2(false)}
            aria-label={"Delete " + `${member.firstName} ${member.lastName}`}>

            <IconButton
              style={{ color: '#949494' }}
              className={classes.teamPageButton}
              disabled={
                member.userId === teamLeaderUserId ||
                member.userId === currentUserId
              }
              onClick={() => {
                props.onDeleteMember(member);
              }}
            >
              <DeleteRoundedIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      )}
    </Card>
  );
}
