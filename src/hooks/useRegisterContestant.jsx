import { useState } from "react";
import { createStructuredSelector } from "reselect";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { standardRoutes } from "routes";

import timezones from "assets/timezones.json";

import { initAppSelectors } from "redux/selectors";
import { globalActions } from "redux/actions";
import {
  REGISTER_CONTESTANT_ENDPOINT,
  REGISTER_CONTESTANT_MEMBER_ENDPOINT,
} from "redux/sagas/endpoints";
import request from "utils/request";
import { FIELD_TYPE } from "typedefs/contestantFormTemplate.typedef";
import ReactGA from "react-ga4";
import { useDispatch } from "react-redux";

const getTimezoneValue = () => {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const timezone = timezones.find((item) => item.tz === tz);
  return timezone ? timezone.value : "";
};

const stateSelector = createStructuredSelector({
  token: initAppSelectors.makeSelectInitAppToken(),
});

/**
 * @typedef {Object} UseRegisterContestantState
 * @property {function} register
 * @property {boolean} loading
 * @property {boolean} done
 * @property {string} errorMessage
 */

/**
 * @param {string} [invitationToken] - If the user is contestant member then
 * the invitation token should be provided that the user received on his/her inbox
 * @returns {UseRegisterContestantState}
 */
export function useRegisterContestant(invitationToken) {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const { token } = useSelector(stateSelector);

  const URL = invitationToken
    ? REGISTER_CONTESTANT_MEMBER_ENDPOINT
    : REGISTER_CONTESTANT_ENDPOINT;

  const isContestantLeader = invitationToken ? false : true;

  /**
   *
   * @param {Array<Object>} answersList
   */
  const register = async (answersList) => {
    setLoading(true);
    setDone(false);
    setErrorMessage("");

    const params = new URLSearchParams({
      timezone: getTimezoneValue(),
      token: invitationToken,
      pageNumber: 1,
    }).toString();

    const body = JSON.stringify({
      answerList: answersList.filter(({ answer }) => {
        // filter those which value is null
        return answer;
      }),
    });

    const options = {
      method: "POST",
      body,
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    };

    try {
      const { userId } = await request(`${URL}?${params}`, options);
      let email;
      ReactGA.set({ user_id: userId, skild_id: userId });
      // Find email from request payload,
      // since the backend doesn't provide that
      // eslint-disable-next-line array-callback-return
      answersList.map(({ type, answer }) => {
        if (type === FIELD_TYPE.EMAIL) email = answer;
      });
      let userType = isContestantLeader ? "leader" : "member";

      const params2 = {
        user_type: userType,
        contestant_Id: userId,
      }
      ReactGA.event('registration_complete', params2)

      dispatch(globalActions.requestResponseReturned({
        error: null,
        message: 'Your Account has been successfully created.',
      }));
      const teamMemberEmail = localStorage.getItem("teamMemberEmail");
      // Navigate to email verification page
      history.push(
        `/${standardRoutes.notVerified.path}?email=${email ?? teamMemberEmail}&confirmation=true`
      );
    } catch (error) {
      debugger;
      const err = await error.response.json();
      setErrorMessage(err.message || err);
    }

    setLoading(false);
    setDone(true);
  };

  return {
    loading,
    done,
    errorMessage,
    register,
  };
}
