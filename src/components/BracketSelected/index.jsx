import React, { useEffect, useState } from "react";
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
import { useHistory, useLocation } from "react-router-dom";
import { boolean } from "yup";

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

function BracketSelected(props) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = useState(false);
  const [shrinkState, setShrinkState] = useState(false);
  const { selectedBracketId, brackets, profile, onSelectBracket, setIsOneBracket, showDialog, setDialogOpen } = props;
  const [isLocationChanged, setIsLocationChanged] = useState(false);
  const [isAriaExpanded, setIsAriaExpanded] = useState(false);
  /*   const brackets = props?.brackets;
    const profile = props?.profile; 
    const onSelectBracket = props?.onSelectBracket;*/
  const [bracketValue, setBracketValue] = useState(selectedBracketId)
  const selectBracket = (selectedBracketId) => {
    setUserIdBracketIdPaier(selectedBracketId, profile?.userId);
    onSelectBracket(selectedBracketId);
  };

  const handleChange = (event) => {
    const selectedBracketId = event.target.value;
    setBracketValue(selectedBracketId)
    selectBracket(selectedBracketId);
  };

  const handleClose = () => {
    setOpen(false);
    setIsAriaExpanded(false);
  };

  const handleOpen = () => {
    setOpen(true);
    setIsAriaExpanded(true);
  };
  const location = useLocation();
  useEffect(() => {
    setIsLocationChanged(true);
  }, [location]);

  useEffect(() => {
    const userId = profile?.userId;
    // if bracket is equal to one dont show the bracket
    if (brackets.length === 1 && isLocationChanged) {
      setShow(false);
      setBracketValue(brackets[0].bracketId);
      setIsLocationChanged(false);
      if (location.pathname === '/applications') {
        setIsOneBracket(true);
      }
      return selectBracket(brackets[0].bracketId);
    } else if (brackets.length === 1 && isLocationChanged === false) {
      setShow(false);
      if (location.pathname === '/applications') {
        setIsOneBracket(true);
      }
    }
    else {
      setShow(true);
      if (location.pathname === '/applications') {
        if (showDialog === false) {
          setIsOneBracket(false);
        }
      }
    }
    if (brackets && brackets.length && profile && userId) {
      // if selectedBracketId not equal to null
      if (selectedBracketId) {
        return;
      }
      // getting userid and bracket id from local storage
      const userIdBracketIdPair = localStorage.getItem("userIdBracketIdPair") || "";
      // check local storage if no user has selected a bracket previously
      if (userIdBracketIdPair.indexOf(userId) === -1) {
        return;
      }
      // get only bracketId from userIdBracketIdPair
      const bracketId = getBracketIdFromPair(userIdBracketIdPair);
      // check if bracketid exist
      if (bracketId) {
        setBracketValue(bracketId);
        onSelectBracket(bracketId);
      }
    }

    /* if(selectedBracketId != null) 
       setBracketValue(selectedBracketId);  
     else  
       setBracketValue(""); */
  }, [bracketValue, show, isLocationChanged/* ,  selectedBracketId*/, brackets, profile])

  useEffect(() => {
    if (bracketValue === null || bracketValue === undefined) {
      setShrinkState(false);
    } else {
      setShrinkState(true);
      if (showDialog) {
        if (bracketValue !== null || bracketValue !== undefined) {
          setDialogOpen(false);
          history.push("/applications");
        }
      }
    }

  }, [bracketValue, shrinkState])
  if (!show) {
    return null;
  }
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id='selectBracket' /* id={'label-for-category'} htmlFor={'category-select-input-id'} */ shrink={shrinkState} className={shrinkState ? classes.label : ''}>Select Category</InputLabel>
      <Select
        id={'category-select'}
        open={open && brackets.length !== 1}
        onClose={handleClose}
        onOpen={handleOpen}
        value={bracketValue}
        onChange={handleChange}
        inputProps={{
          //'id': 'category-select-input-id', 
          'aria-labelledby': 'selectBracket',
          //"aria-expanded": isAriaExpanded,
        }}
        SelectDisplayProps={
          {
            "aria-expanded": isAriaExpanded,
            'aria-labelledby': 'selectBracket',
            'role': 'combobox'
          }
        }
        style={{ width: props.bracketSelectWidth }}
      >
        {brackets.map(({ bracketId, bracketName }, index) => (
          <MenuItem key={bracketId} value={bracketId || ''}>
            {bracketName}
          </MenuItem>)
        )}
      </Select>
    </FormControl>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(BracketSelected);
