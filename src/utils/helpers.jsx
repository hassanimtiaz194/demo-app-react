import React from "react";

import {
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-unused-vars
  ContestantFormFieldAnswer,
  // eslint-disable-next-line no-unused-vars
  SectionList,
} from "../typedefs/contestantFormTemplate.typedef";

export const getSubset = (obj, path) => {
  const index = path.indexOf(".");
  if (index === -1) return { [path]: obj[path] };

  const prop = path.substr(0, index);
  const child = obj[prop];
  const restPath = path.substring(index + 1, path.length);
  return { [prop]: getSubset(child, restPath) };
};

export const getSliceByDotNotation = (obj, path) => {
  const paths = path.split(".");
  const value = paths.reduce((p, c) => (p && p[c]) || null, obj);

  let res = {
    [paths[paths.length - 1]]: value,
  };
  for (let i = paths.length - 2; i >= 0; i--) {
    res = {
      [paths[i]]: res,
    };
  }

  return { [paths[paths.length - 1]]: value };
};

export function getFileNameFromDisposition(disposition) {
  let filename;
  if (disposition && disposition.indexOf("attachment") !== -1) {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(disposition);
    if (matches != null && matches[1]) {
      filename = matches[1].replace(/['"]/g, "");
    }
  }
  return filename;
}

/**
 *
 * @param {Array.<ContestantFormFieldAnswer>} answerList
 * @param {ContestantFormFieldAnswer} targetAnswer
 */
export function updateFormAnswerList(answerList, targetAnswer) {
  return answerList.map((answer) => {
    if (answer.sectionId === targetAnswer.sectionId) {
      return { ...targetAnswer };
    }
    return { ...answer };
  });
}

/**
 *
 * @param {Array.<SectionList>} sectionList
 * @returns {Array.<ContestantFormFieldAnswer>}
 */
export function initFormFields(sectionList, entry) {
  return sectionList.map((section) => {
    let answer = null;
    if (entry) {
      const { contentList } = entry;
      const content =
        contentList.find(
          (content) => content.sectionId === section.sectionId
        ) || {};
      answer = content.answer;
    }

    /**
     * @type {ContestantFormFieldAnswer} answerList
     */
    const answerList = {
      answer: answer,
      sectionId: section.sectionId,
    };
    return answerList;
  });
}

/**
 * @param {Array.<ContestantFormFieldAnswer>} answerList
 * @returns {Object}
 */
export function convertFieldAnswerListToObj(answerList) {
  const obj = {};
  answerList.map(({ answer, sectionId }) => {
    if (answer) obj[sectionId] = answer;
  });

  return obj;
}

/**
 *
 * @param {string} label
 * @param {boolean} required
 * @param {Object} props
 */
export function dynamicHtml(label, required, props = {}) {
  return (
    <div
      {...props}
      dangerouslySetInnerHTML={{ __html: `${label}${required ? "<span style='color:red; margin-left: 5px; font-size: 24px;'>*</span>" : ""}` }}
    ></div>
  );
}

/**
 *
 * @param {string} str
 */
export function getCleanTextFromHtmlString(str) {
  return (str || "").replace(/<\/?[^>]+(>|$)/g, "");
}

export function getCleanTextFromHtmlString2(str) {
  const str1= (str || "").replace(/<\/?[^>]+(>|$)/g, "");
  return str1.replace(/&nbsp;/g, '');
}

/**
 *
 * @param {number} bytes
 * @returns {number}
 */
export function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = 0;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}


export function formsValidationSchema(entryValidationSchema, values, errors, eventInfo) {
  if (entryValidationSchema !== null && entryValidationSchema !== undefined) {
    entryValidationSchema.map((array) => {
      // validation Schema for url field
      if (Object.keys(array)[0].match('url')) {
        if (!values[Object.keys(array)[0]]) {
          errors[Object.keys(array)[0]] = Object.values(array)[0];
        } else if (!/^(http:\/\/|https:\/\/|www\.)?[a-zA-Z0-9\-$]+\.[a-zA-Z]{1,5}?[a-zA-Z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\_\=\+\{\[\}\}\|\\\:\;\'\"\,\<\.\>\/?\*\+]{1,500}/g.test(values[Object.keys(array)[0]])) {
          errors[Object.keys(array)[0]] = 'Enter a valid URL';
        }
      }

      // validation Schema for Email field
      if (Object.keys(array)[0].match('email')) {
        if (!values[Object.keys(array)[0]]) {
          errors[Object.keys(array)[0]] = Object.values(array)[0];
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values[Object.keys(array)[0]])) {
          errors[Object.keys(array)[0]] = 'Enter a valid Email Address';
        }
      }

      // validation Schema for password field
      if (Object.keys(array)[0].match('password')) {
        //passord is true
        if (eventInfo.advanceSecurityEnabled === true) {
          if (!values[Object.keys(array)[0]]) {
            errors[Object.keys(array)[0]] = Object.values(array)[0];
          }
          else if (values[Object.keys(array)[0]].length > 7) {
            errors[Object.keys(array)[0]] = 'Be at least 8 characters';
          }
          else if (values[Object.keys(array)[0]].search(/[A-Z]/) === -1) {
            errors[Object.keys(array)[0]] = 'At least one character';
          }
          else if (values[Object.keys(array)[0]].search(/[0-9]/) === -1) {
            errors[Object.keys(array)[0]] = 'At least one number';
          }
          else if (values[Object.keys(array)[0]].search(/[!\@\#\$\%\^\&\*\(\)\_\-\=\+\.\,\;\:\`\~\'\"\[\]\{\}\<\>\?\/]/) === -1) {
            errors[Object.keys(array)[0]] = 'At least one special character';
          }
        }
        if (eventInfo.advanceSecurityEnabled === false) {
          if (!values[Object.keys(array)[0]]) {
            errors[Object.keys(array)[0]] = Object.values(array)[0];
          }
          else if (values[Object.keys(array)[0]].length > 5) {
            errors[Object.keys(array)[0]] = 'Be at least 6 characters';
          }
        }
        if (values.password !== values.confirmPassword) {
          errors[Object.keys(array)[0]] = "Password don't Match";
        }
      }

      // validation Schema for confirm password field
      if (Object.keys(array)[0].match('confirmPassword')) {
        //passord is true
        if (eventInfo.advanceSecurityEnabled === true) {
          if (!values[Object.keys(array)[0]]) {
            errors[Object.keys(array)[0]] = Object.values(array)[0];
          }
          else if (values[Object.keys(array)[0]].length > 7) {
            errors[Object.keys(array)[0]] = 'Be at least 8 characters';
          }
          else if (values[Object.keys(array)[0]].search(/[A-Z]/) === -1) {
            errors[Object.keys(array)[0]] = 'At least one character';
          }
          else if (values[Object.keys(array)[0]].search(/[0-9]/) === -1) {
            errors[Object.keys(array)[0]] = 'At least one number';
          }
          else if (values[Object.keys(array)[0]].search(/[!\@\#\$\%\^\&\*\(\)\_\-\=\+\.\,\;\:\`\~\'\"\[\]\{\}\<\>\?\/]/) === -1) {
            errors[Object.keys(array)[0]] = 'At least one special character';
          }
        }
        if (eventInfo.advanceSecurityEnabled === false) {
          if (!values[Object.keys(array)[0]]) {
            errors[Object.keys(array)[0]] = Object.values(array)[0];
          }
          else if (values[Object.keys(array)[0]].length > 5) {
            errors[Object.keys(array)[0]] = 'Be at least 6 characters';
          }
        }
        if (values.confirmPassword !== values.password) {
          errors[Object.keys(array)[0]] = "Password don't Match";
        }
      }

      // validation Schema for other field
      if (!Object.keys(array)[0].match('password') || !Object.keys(array)[0].match('confirmPassword') || !Object.keys(array)[0].match('url') || !Object.keys(array)[0].match('email')) {
        if (!values[Object.keys(array)[0]]) {
          errors[Object.keys(array)[0]] = Object.values(array)[0];
        }
      }
    });
  }
  return errors;
}