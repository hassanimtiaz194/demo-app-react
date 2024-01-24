import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router";
import { createStructuredSelector } from "reselect";

import MemberView from "containers/MemberView";
import TeamView from "containers/TeamView";

import { teamActions } from "redux/actions";
import BackdropLoading from "components/BackdropLoading";
import ReactGA from "react-ga4";
import { teamSelectors, profileSelectors, commonApiSelectors } from "redux/selectors";
import { useState } from "react";

const TeamPage = (props) => {
  let { path } = useRouteMatch();

  // state actions
  const { loadTeamInfo } = props;

  // state props
  const { teamLoading, profile, canTeamMembersInvite, eventInfo, team } = props;
  const { maxTeamSize } = eventInfo;
  const [canInvite, setCanInvite] = useState(false);
  //Members Registered in Team
  const registeredTeamMembers = team?.memberList.length;

  useEffect(() => {
    loadTeamInfo();
  }, [loadTeamInfo]);


  useEffect(() => {
    ReactGA.set({ user_id: profile?.userId, skild_id: profile?.userId });
    if (profile?.userType === 'ContestantLeader' && registeredTeamMembers !== maxTeamSize) {
      setCanInvite(true);
    } else if (profile?.userType === 'ContestantMember' &&
      canTeamMembersInvite &&
      registeredTeamMembers !== maxTeamSize) {
      setCanInvite(true);
    } else {
      setCanInvite(false);
    }
  }, [profile, canTeamMembersInvite, eventInfo, team])

  return (
    <>
      <BackdropLoading show={teamLoading}></BackdropLoading>

      <Switch>
        <Route exact path={path}>
          <TeamView canInvite={canInvite} />
        </Route>
        <Route path={`${path}/member`}>
          <MemberView />
        </Route>
      </Switch>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  profile: profileSelectors.makeSelectProfile(),
  team: teamSelectors.makeSelectTeam(),
  canTeamMembersInvite: commonApiSelectors.makeSelectCanTeamMembersInvite(),
  eventInfo: commonApiSelectors.makeSelectEventInfo(),
  teamLoading: teamSelectors.makeSelectTeamLoading(),
});

const mapDispatchToProps = function (dispatch) {
  return {
    loadTeamInfo: () => {
      dispatch(teamActions.loadTeamInfo());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamPage);
