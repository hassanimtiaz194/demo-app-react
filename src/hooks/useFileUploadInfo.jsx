import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";

const { contestantFormSelectors } = require("redux/selectors");

const stateSelector = createStructuredSelector({
  fileUploadLoading: contestantFormSelectors.makeSelectFileUploadLoading(),
  fileUploadProgress: contestantFormSelectors.makeSelectFileUploadProgress(),
  sectionId: contestantFormSelectors.makeSelectFileUploadSectionId(),
});

/**
 * @typedef {Object} UseFileUploadInfoState
 * @property {boolean} loading
 * @property {number} fileUploadProgress
 */

/**
 *
 * @param {number} targetSectionId
 * @returns {UseFileUploadInfoState}
 */
export const useFileUploadInfo = (targetSectionId) => {
  const { fileUploadLoading, fileUploadProgress, sectionId } =
    useSelector(stateSelector);

  const [state, setState] = useState({
    loading: false,
    fileUploadProgress: 0,
  });

  useEffect(() => {
    if (!sectionId) {
      setState({
        loading: false,
      });
    }
  }, [sectionId]);

  useEffect(() => {
    if (sectionId === targetSectionId) {
      setState({
        loading: fileUploadLoading,
        fileUploadProgress,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileUploadProgress, fileUploadLoading]);

  return state;
};
