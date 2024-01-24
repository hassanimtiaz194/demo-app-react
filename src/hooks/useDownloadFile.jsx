import { useState } from "react";
import { createStructuredSelector } from "reselect";
import { useSelector } from "react-redux";

import { initAppSelectors } from "redux/selectors";
import { getFileNameFromDisposition } from "utils/helpers";

const stateSelector = createStructuredSelector({
  token: initAppSelectors.makeSelectInitAppToken(),
});

const { createObjectURL } = URL;

/**
 * @typedef {Object} UseDownloadFileState
 * @property {function} download
 * @property {string} downloadedUrl
 * @property {boolean} loading
 * @property {boolean} done
 * @property {string} errorMessage
 */

/**
 *
 * @param {string} url
 * @returns {UseDownloadFileState}
 */
export const useDownloadFile = (url) => {
  /**
   * @property {UseDownloadFileState} 0 - state
   */
  const [state, setState] = useState({
    loading: true,
    done: false,
    errorMessage: "",
    downloadedUrl: "",
  });

  const { token } = useSelector(stateSelector);

  const headers = new Headers({
    "Access-Control-Allow-Methods": "*",
    Authorization: `Bearer ${token}`,
  });

  const options = {
    method: "GET",
    headers,
  };

  const download = async () => {
    setState({
      loading: true,
      done: false,
      errorMessage: "",
      downloadedUrl: "",
      downloadedFilename: "",
    });

    try {
      const res = await fetch(url, options);
      const disposition = res.headers.get("content-disposition");
      const downloadedFilename =
        getFileNameFromDisposition(disposition) || "DEFAULT_FILENAME";

      const blob = await res.blob();

      const a = await blob.text();
      

      setState({
        loading: false,
        done: true,
        downloadedUrl: createObjectURL(blob),
        downloadedFilename,
      });
    } catch (error) {
      setState({
        loading: false,
        done: true,
        errorMessage: error.message,
      });
    }
  };

  return {
    ...state,
    download,
  };
};
