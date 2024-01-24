import { CANCEL } from "redux-saga";

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  return Promise.reject(error);
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  const controller = new AbortController();
  const request = fetch(url, { ...options, signal: controller.signal })
    .then(checkStatus)
    .then(parseJSON);

  request[CANCEL] = () => controller.abort();
  return request;
}

/**
 *
 * @param {string} url
 * @param {Object} opts
 * @param {Function} onProgress
 * @returns
 */
export function requestWithProgress(url, opts = {}, onProgress) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open(opts.method || "get", url);

    for (var k in opts.headers || {}) {
      xhr.setRequestHeader(k, opts.headers[k]);
    }

    xhr.onload = (e) => {
      resolve(e.target);
    };
    xhr.onerror = reject;
    if (xhr.upload && onProgress) xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
    xhr.send(opts.body);
  })
    .then(checkStatus)
    .then((res) => {
      return Promise.resolve(JSON.parse(res.responseText));
    });
}

export function downloadFile(url, fileName) {
  var element = document.createElement("a");
  element.setAttribute("href", url);
  element.setAttribute("download", fileName);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
}
