/**
 * Enum string values.
 * @enum {string}
 */
export const TEAM_MEMBER_USER_TYPES = {
  CONTESTANT_LEADER: "ContestantLeader",
  CONTESTANT_MEMBER: "ContestantMember",
};

export const TEAM_MEMBER_STATUS = {
  ACTIVE: "Active",
  INVITED: "Invited",
};

/**
 * @typedef {Object} TeamMember
 * @property {string} userId
 * @property {string} status
 * @property {string} userType
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} userPicture
 * @property {string} email
 * @property {string} createdAt
 *
 */

/**
 * @typedef {Object} Team
 * @property {string} description
 * @property {string} headline
 * @property {string} status
 * @property {string} teamId
 * @property {string} teamName
 * @property {Array.<TeamMember>} memberList
 *
 */
