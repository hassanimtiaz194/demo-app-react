import React from "react";

import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import {
  ADD_TEAM_MEMBER,
  DELETE_TEAM_MEMBER,
  MAKE_TEAM_LEADER,
  RESEND_INVITATION,
  CHANGE_TEAM_NAME_DESCRIPTION
} from "redux/actions/types";

import {
  CONTESTANT_FORM_SAVE,
  CONTESTANT_FORM_SUBMIT,
  CONTESTANT_FORM_UNSUBMIT
} from "redux/actions/types";

import {
  PROFILE_UPDATE,
  EMAIL_CHANGE,
  PASSWORD_CHANGE
} from "redux/actions/types";

const usePageTracking = () => {

};

const registrPageView = (action) => {

  switch (action.type) {
    case ADD_TEAM_MEMBER:
      return ReactGA.send({ hitType: "pageview", page: "/team/invite_submitted" });

    case DELETE_TEAM_MEMBER:
      return ReactGA.send({ hitType: "pageview", page: "/team/team_member_deleted" });
    case MAKE_TEAM_LEADER:
      return ReactGA.send({ hitType: "pageview", page: "/team/team_leader_changed" });
    case RESEND_INVITATION:
      return ReactGA.send({ hitType: "pageview", page: "/team/invite_resent" });
    case CHANGE_TEAM_NAME_DESCRIPTION:
      return ReactGA.send({ hitType: "pageview", page: "/team/team_name_changed" });
    case PROFILE_UPDATE:
      return ReactGA.send({ hitType: "pageview", page: "/profile/profile_updated" });
    case EMAIL_CHANGE:
      return ReactGA.send({ hitType: "pageview", page: "/profile/email_updated" });
    case PASSWORD_CHANGE:
      return ReactGA.send({ hitType: "pageview", page: "/profile/password_updated" });
  }

};
const registerEvent = (action, event) => {
  switch (action) {
    case CONTESTANT_FORM_SUBMIT:
      return ReactGA.event(event);
    case CONTESTANT_FORM_UNSUBMIT:
      return ReactGA.event(event);
  }
};


export { usePageTracking, registrPageView, registerEvent };
