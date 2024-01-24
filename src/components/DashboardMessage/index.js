import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  dashboardSelectors,
  contestantFormTemplateSelectors,
} from "redux/selectors";

import useStyles from "./styles";

const HIDE_MSG_TIMESTAMP_PREFIX = "hide-message-timestamp-";

const canShowMsg = (bracketId, phaseId) => {
  const timestamp = localStorage.getItem(createKey(bracketId, phaseId)) || -1;
  const timestamp24HoursBefore = new Date().getTime() - 24 * 60 * 60 * 10000;

  return timestamp < timestamp24HoursBefore;
};

const createKey = (bracketId, phaseId) => {
  return `${HIDE_MSG_TIMESTAMP_PREFIX}${bracketId}${phaseId}`;
};

export function DashboardMessage(props) {
  const classes = useStyles(props);

  //   state props
  const { bracketId, phaseId, dashboardMsg } = props;

  React.useEffect(() => {}, [bracketId, phaseId]);

  React.useEffect(() => {
    if (dashboardMsg && canShowMsg(bracketId, phaseId)) {
      const timer = setTimeout(() => {
        setDashboardMsgClosed(!dashboardMsg);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [dashboardMsg, bracketId, phaseId]);

  const [dashboardMsgClosed, setDashboardMsgClosed] = React.useState(true);

  const handleClose = (ev) => {
    localStorage.setItem(createKey(bracketId, phaseId), new Date().getTime());
    setDashboardMsgClosed(true);
  };

  return (
    <Drawer anchor="top" open={!dashboardMsgClosed}>
      <Grid className={classes.root}>
        <Container className={classes.container}>
          <div
            className={classes.dangerousHtml}
            dangerouslySetInnerHTML={{ __html: dashboardMsg }}
          ></div>
        </Container>
        <IconButton onClick={handleClose} className={classes.closeIcon}>
          <CancelIcon fontSize="small" />
        </IconButton>
      </Grid>
    </Drawer>
  );
}

const mapStateToProps = createStructuredSelector({
  dashboardMsg: dashboardSelectors.makeSelectDashboardMsg(),
  phaseId: dashboardSelectors.makeSelectCurrentPhaseNumber(),
  bracketId: contestantFormTemplateSelectors.makeSelectContestantFormTemplateSelectedBracketId(),
});

export default connect(mapStateToProps, null)(DashboardMessage);
