import { useEffect, useState } from "react";
import { createStructuredSelector } from "reselect";
import { useSelector } from "react-redux";

import { initAppSelectors } from "redux/selectors";
import { REGISTRATION_FORM_ENDPOINT } from "redux/sagas/endpoints";
import request from "utils/request";

import {
  // eslint-disable-next-line no-unused-vars
  SectionList,
  // eslint-disable-next-line no-unused-vars
  ContestantFormTemplate,
} from "../typedefs/contestantFormTemplate.typedef";


const stateSelector = createStructuredSelector({
  token: initAppSelectors.makeSelectInitAppToken(),
});

/**
 * @typedef {Object} UseRegistrationFormState
 * @property {ContestantFormTemplate} form
 * @property {SectionList[]} sections
 * @property {boolean} loading
 * @property {boolean} done
 * @property {string} errorMessage
 */

/**
 *
 * @param {string} [invitationToken] - Invitation token that the user received on his/her inbox
 * @returns {UseRegistrationFormState}
 */
function fetchRegistrationForm(completeRegFormtoken, regFormPageNumber, userType) {
  const params = new URLSearchParams({
    contestantType: userType === 'ContestantLeader' ? "Team Leader" : "Team Member",
    token: userType === 'ContestantMember' ? '' : completeRegFormtoken,
    pageNumber: regFormPageNumber,
  }).toString();
  const URL = `${REGISTRATION_FORM_ENDPOINT}?${params}`;
  const options = {
    method: "GET",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${completeRegFormtoken}`,
    }),
  };
  try {
    const dataaa = request(URL, options);
    return dataaa;
  }
  catch (err) {
    console.log(err.message);
  }
}

export const useSocialSignInRegistrationForm = (token, userType) => {
  /**
   * @property {UseRegistrationFormState} 0 - state
   */
  //const tt= useSelector(state => state.commonApi.invitationToken)
  let [regFormPageNumber, setRegFormPageNumber] = useState(2);
  const [state, setState] = useState({
    loading: true,
    done: false,
    errorMessage: "",
    form: null,
    sections: [],
    regFormPageNumber,
    setRegFormPageNumber,
  });
  useEffect(() => {
    const fetch = async () => {
      setState((state) => {
        return {
          ...state,
          loading: true,
          done: false,
          errorMessage: "",
        };
      });
      const params = new URLSearchParams({
        contestantType: userType === 'ContestantLeader' ? "Team Leader" : "Team Member",
        token: token,
        pageNumber: regFormPageNumber,
      }).toString();
      const URL = `${REGISTRATION_FORM_ENDPOINT}?${params}`;
      const options = {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }),
      };
      try {
        const registrationForm = await request(URL, options);
        let totalPages = registrationForm.totalPage;
        let sections;
        const regFormResponse = await fetchRegistrationForm(token, regFormPageNumber, userType);
        totalPages = regFormResponse.totalPage
        sections = (regFormResponse.sectionList || []).map(
          ({ regFormSectionId, ...rest }) => {

            if (rest.paramMap.Binding === "email") rest.paramMap.type = "email";
            return { ...rest, sectionId: regFormSectionId };
          }
        );

        setState((state) => {
          return {
            ...state,
            loading: false,
            done: true,
            errorMessage: "",
            form: registrationForm,
            sections,
            regFormPageNumber,
            totalPages,
          };
        });
      } catch (error) {
        setState((state) => {
          return {
            ...state,
            loading: false,
            done: true,
            errorMessage: error?.message || error,
          };
        });
      }
    };

    fetch();
  }, [token/*,  completeRegFormtoken */, URL, regFormPageNumber]);

  return state;
};

