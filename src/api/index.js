/**
 * API methods
 * TODO - Convert these methods into hooks and move to ./src/hooks folder
 */

import {
  VERIFY_ENDPOINT,
  RESEND_EMAIL_VERIFICATION_ENDPOINT,
  COMPLETE_REGISTRATION_ENDPOINT,
} from "../redux/sagas/endpoints";
import request from "../utils/request";

/**
 *
 * @param {string} code - Verification code
 * @param {string} token - Auth token
 */
export function verifyEmail(code, token) {
  const params = new URLSearchParams({
    token: code,
  }).toString();

  const URL = `${VERIFY_ENDPOINT}?${params}`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({}),
  };

  return request(URL, options);
}

/**
 *
 * @param {*} email - Contestant email
 * @param {string} token - Auth token
 */
export function resendEmailVerification(email, token) {
  const params = new URLSearchParams({
    contestantEmail: email,
  }).toString();

  const URL = `${RESEND_EMAIL_VERIFICATION_ENDPOINT}?${params}`;

  const options = {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }),
    body: JSON.stringify({}),
  };

  return request(URL, options);
}

/**
 *
 * @param {Array<Object>} list - Answers list
 * @param {String} token - Auth token
 */
export function completeRegistration(list, token) {
  const URL = COMPLETE_REGISTRATION_ENDPOINT;

  const answerList = list.filter(({ answer }) => {
    // filter those which value is null
    return answer;
  });

  const options = {
    method: "POST",
    body: JSON.stringify({ answerList }),
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }),
  };

  return request(URL, options);
}

export async function submitRegFormData(formFields, regFormPageNumber, token) {
  const params2 = new URLSearchParams(window.location.search);
  const userType = params2.get("ContestantType");
  const body = JSON.stringify({
    answerList: formFields.filter(({ answer }) => {
      // filter those which value is null
      return answer;
    }),
  });
  const params = new URLSearchParams({
    contestantType: userType === 'ContestantMember' ? "Team Member" :"Team Leader" ,
    token: userType === 'ContestantMember'? '': token,
    pageNumber: regFormPageNumber,
  }).toString();
  const URL = `${COMPLETE_REGISTRATION_ENDPOINT}?${params}`;
  const options = {
    method: "POST",
    body,
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }),
  };
  try {
    const response=await request(URL, options);
    const userEmail=response.email;
    const userId=response.userId;
    return{
      userEmail,
      userId,
    }
  }
  catch (err) {
    console.log(err.message);
  }
}