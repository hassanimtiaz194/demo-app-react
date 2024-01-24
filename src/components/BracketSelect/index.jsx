import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  contestantFormTemplateSelectors,
  profileSelectors,
} from "redux/selectors";
import { contestantFormTemplateActions } from "redux/actions";

import useStyles from "./style";

const USER_ID_BRACKET_ID_PAIR_KEY = "userIdBracketIdPair";

const getBracketIdFromPair = (userId) => {
  const userIdBracketIdPair =
    localStorage.getItem(USER_ID_BRACKET_ID_PAIR_KEY) || "";
  if (userIdBracketIdPair.indexOf(userId) === -1) {
    localStorage.removeItem();
    return null;
  }
  const index = userIdBracketIdPair.indexOf("bracketId:");
  if (index === -1) return null;

  return parseInt(
    userIdBracketIdPair.substr(index + 10, userIdBracketIdPair.length)
  );
};

const setUserIdBracketIdPaier = (bracketId, userId) => {
  localStorage.setItem(
    USER_ID_BRACKET_ID_PAIR_KEY,
    `userId:${userId}bracketId:${bracketId}`
  );
};

function BracketSelect(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(false);
const selectedBracketId = props.selectedBracketId || "";
  
  const { brackets, profile } = props;

  const { onSelectBracket } = props;

  const selectBracket = (selectedBracketId) => {
    setUserIdBracketIdPaier(selectedBracketId, profile.userId);
    onSelectBracket(selectedBracketId);
  };

  const handleChange = (event) => {
    const selectedBracketId = event.target.value;
    selectBracket(selectedBracketId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  React.useEffect(() => {
    if (brackets && brackets.length && profile && profile.userId) {
      if (selectedBracketId) return;

      const { userId } = profile;

      // If it's the only bracket then pre-select it and don't show the dropdown
      if (brackets.length === 1) {
        return selectBracket(brackets[0].bracketId);
      } else {
        setShow(true);
      }

      const userIdBracketIdPair =
        localStorage.getItem("userIdBracketIdPair") || "";
      if (userIdBracketIdPair.indexOf(userId) === -1) return;

      const bracketId = getBracketIdFromPair(userIdBracketIdPair);
      if (bracketId) onSelectBracket(bracketId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, brackets]);

  const content = (
    <FormControl className={classes.formControl}>
      <InputLabel className={classes.label}>Select Bracket</InputLabel>
      <Select
        open={open && brackets.length !== 1}
        onClose={handleClose}
        onOpen={handleOpen}
        value={selectedBracketId}
        onChange={handleChange}
        style={{ width: props.bracketSelectWidth }}
      >
        {brackets.map((bracket) => {
          return (
            <MenuItem key={bracket.bracketId} value={bracket.bracketId}>
              {bracket.bracketName}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );

  return show ? content : "";
}

const mapStateToProps = createStructuredSelector({
  selectedBracketId: contestantFormTemplateSelectors.makeSelectContestantFormTemplateSelectedBracketId(),
  brackets: contestantFormTemplateSelectors.makeSelectContestantFormTemplateBracketList(),
  profile: profileSelectors.makeSelectProfile(),
});

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    onSelectBracket: (selectedBracketId) => {
      dispatch(contestantFormTemplateActions.selectBracket(selectedBracketId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BracketSelect);
