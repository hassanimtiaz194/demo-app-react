/**
 * Enum string values.
 * @enum {string}
 */
export const FIELD_TYPE = {
  PARAGRAPH: "paragraph",
  TEXTBOX: "textbox",
  SELECT: "select",
  URL: "url",
  CHECKBOX: "checkbox",
  RADIO: "radio",
  TEXTAREA: "textarea",
  RICH_TEXT: "richtext",
  HEADING: "heading",
  FILE: "file",
  VIDEO: "skild-video",
  PASSWORD: "password",
  EMAIL: "email",
  PAGE_BREAK: "pagebreak",
};

/**
 * Enum string values.
 * @enum {string}
 */
export const HEADING_SIZE = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "wide",
};

/**
 * User registration page status and messages
 * @enum {string}
 */
export const USER_REGISTRATION_PAGE_STATUS = {
  REGISTRATION_IS_ENDED: 1,
  REGISTRATION_NOT_STARTED: -1,
  REGISTRATION_STARTED: 0,
  REGISTRATION_NOT_STARTED_MESSAGE:
    "Contestant Registration Period Not Begun Message",
  REGISTRATION_IS_ENDED_MESSAGE: "Contestant Registration Period Ended Message",
  SUBMISSION_NOT_STARTED_MESSAGE:
    "Submission Period Not Begun Message",
    SUBMISSION_ENDED_MESSAGE: "Submission Deadline Expired Message",
};

/**
 * Field
 * @typedef {Object} Field
 * @property {boolean} caDisplay
 * @property {string} labelText
 * @property {string} sublabel
 * @property {boolean} required
 * @property {FIELD_TYPE} type
 * @property {string} size
 * @property {string} filetype
 * @property {number} maxLength
 * @property {number} maxFileSizeNumber
 * @property {Array.<string>} optionName
 *
 */

/**
 * Section List
 * @typedef {Object} SectionList
 * @property {FIELD_TYPE} type - The type of the section (e.g. paragraph or headline)
 * @property {Field} paramMap - Each section can have a children, where each child can be
 * @property {number} sectionId - ID of the section
 * either paragraph, headhline or etc.abs
 */

/**
 * Contestant Form
 * @typedef {Object} ContestantFormTemplate
 * @property {boolean} active - Indicates whether the form active or not.
 * @property {number} bracketId - The selected bracket ID
 * @property {string} message
 * @property {number} phaseNumber
 * @property {Array.<SectionList>} sectionList
 */

/**
 * @typedef {Object} ContestantFormFieldAnswer
 * @property {string} answer - Value for the given field in the form
 * @property {number} displayOrder
 * @property {number} sectionId - This is basically the section if of the given field
 *
 */

/**
 * Contestant form to be submitted
 * @typedef {Object} ContestantForm
 * @property {Array.<ContestantFormFieldAnswer>} answerList
 * @property {number} bracketId
 * @property {number} phaseNumber
 * @property {string} teamId
 */

/**
 * Abstract response based on the http returned response
 * @typedef {Object} RequestResponse
 * @property {Error} error
 * @property {string} message
 */
