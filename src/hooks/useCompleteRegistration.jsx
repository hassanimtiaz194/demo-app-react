import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { COMPLETE_REGISTRATION_ENDPOINT } from "redux/sagas/endpoints";
import request from "utils/request";
import { authActions } from "redux/actions";
import { CompleteRegistrationPage } from "../containers/CompleteRegistrationPage";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

/**
 * @typedef {Object} UseCompleteRegistrationState
 * @property {function} completeRegistration
 * @property {boolean} loading
 * @property {boolean} done
 * @property {string} errorMessage
 */

/**
 * @returns {UseCompleteRegistrationState}
 * @param {string} level2Token - Level 2 token which user receives during login
 */
export function useCompleteRegistration(level2Token) {

  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  /**
   *
   * @param {Array<Object>} answersList
   */

  const completeRegistration = async (answersList, regFormPageNumber) => {
    setLoading(true);
    setDone(false);
    setErrorMessage("");
    const params2 = new URLSearchParams(window.location.search);
    const userType = params2.get("ContestantType");
    const body = JSON.stringify({
      answerList: answersList.filter(({ answer }) => {
        // filter those which value is null
        return answer;
      }),
    });
    const params = new URLSearchParams({
      contestantType: userType === 'ContestantMember' ? "Team Member" : "Team Leader",
      token: userType === 'ContestantMember' ? '' : level2Token,
      pageNumber: regFormPageNumber,
    }).toString();
    const URL = `${COMPLETE_REGISTRATION_ENDPOINT}?${params}`;
    const options = {
      method: "POST",
      body,
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${level2Token}`,
      }),
    };

    try {
      const { userId, email } = await request(
        URL,
        options
      );
      dispatch(authActions.loginSuccess(level2Token, email, userId));
    } catch (error) {
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
    completeRegistration,
  };
}
