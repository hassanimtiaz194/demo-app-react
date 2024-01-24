import React, { useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import { Card, CardActionArea, CardContent } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  teamSelectors,
  authSelectors,
  commonApiSelectors,
} from "redux/selectors";

import {
  // eslint-disable-next-line no-unused-vars
  Team,
  TEAM_MEMBER_USER_TYPES,
} from "typedefs/team.typedef";

import useStyles from "./style";
import { useConfirmDialog } from "hooks/useConfirmDialog";
import { teamActions } from "redux/actions";
import TeamMember from "components/TeamMember";
import { Alert } from "@material-ui/lab";
import EditableTeamNameDesc from "components/EditableTeamNameDesc";

export function TeamView(props) {
  const classes = useStyles();
  const { open, dialog } = useConfirmDialog();
  let { path } = useRouteMatch();
  //event team max size
  const { maxTeamSize } = props.eventInfo;
  //Members Registered in Team
  const registeredTeamMembers = props.team?.memberList.length;
  const {
    resendInvitation,
    deleteTeamMember,
    makeTeamLeader,
    currentUserId,
    canTeamMembersInvite,
    canInvite,
  } = props;

  /**
   * @type {Team} team
   */
  const team = props.team;
  if (!team) return <></>;

  const leader = team.memberList.find((member) => {
    return member.userType === TEAM_MEMBER_USER_TYPES.CONTESTANT_LEADER;
  });

  const isTeamLeader = () => {
    if (team) {
      return leader && leader.userId === currentUserId;
    }
    return false;
  };

  const handleSendEmail = async (userId) => {
    const confirmed = await open(
      "Resend Invitation",
      <Typography>Do you want to resend invitation email?</Typography>
    );

    if (confirmed) {
      resendInvitation(userId);
    }
  };

  /**
   *
   * @param {TeamMember} member
   */
  const handleDeleteMember = async (member) => {
    const confirmed = await open(
      "Delete Member",
      <Typography>{`Do you want to delete ${member.firstName} ${member.lastName}?`}</Typography>
    );

    if (confirmed) {
      deleteTeamMember(member.email);
    }
  };

  /**
   *
   * @param {TeamMember} member
   */
  const handleMakeTeamLeader = async (member) => {
    const confirmed = await open(
      "Make Team Leader",
      <Typography>{`Do you want to make ${member.firstName} ${member.lastName} the team leader?`}</Typography>
    );

    if (confirmed) {
      makeTeamLeader(member.email);
    }
  };


  return (
    <Container className={classes.root} maxWidth="lg">
      {dialog}
      {registeredTeamMembers === maxTeamSize && (
        <Alert severity="error" >You have reached the maximum team size allowed.</Alert>
      )}
      <br />
      <EditableTeamNameDesc 
      Hvariant={'h4'} 
      Bvariant={'body1'} 
      teamName={team.teamName} 
      teamHeadline={team.headline}
      teamDescription={team.description} />
      <Grid container  className={classes.cardsContainer}  spacing={2}
       direction="row"
       style={{
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center'
       }}
      >
        {team.memberList.map((member) => (
          <Grid key={member.userId} item style={{minWidth:230,maxWidth:230}}>
            <TeamMember
              allowEdit={isTeamLeader()}
              onSendEmail={handleSendEmail}
              onDeleteMember={handleDeleteMember}
              onMakeTeamLeader={handleMakeTeamLeader}
              member={member}
              teamLeaderUserId={leader ? leader.userId : 0}
              currentUserId={currentUserId}
            />
          </Grid>
        ))}
        {canInvite && (
          <Grid item style={{minWidth:230,maxWidth:230}}>
            <Card className={classes.addCard}>
              <CardActionArea
                component={Link}
                to={`${path}/member`}
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <AddCircleRoundedIcon style={{ color: '#949494' }} className={classes.addIcon} />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom style={{ fontSize: '1.35rem', fontWeight: 500 }} variant="h2">
                    Add a Team Member
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container >
  );
}

const mapStateToProps = createStructuredSelector({
  team: teamSelectors.makeSelectTeam(),
  currentUserId: authSelectors.makeSelectUserId(),
  canTeamMembersInvite: commonApiSelectors.makeSelectCanTeamMembersInvite(),
  eventInfo: commonApiSelectors.makeSelectEventInfo(),
});

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    makeTeamLeader: (email) => {
      dispatch(teamActions.makeTeamLeader(email));
    },
    deleteTeamMember: (email) => {
      dispatch(teamActions.deleteTeamMember(email));
    },
    resendInvitation: (userId) => {
      dispatch(teamActions.resendTeamMemberInvitation(userId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamView);
