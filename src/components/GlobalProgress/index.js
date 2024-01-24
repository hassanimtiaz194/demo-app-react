import React from "react";
import { LinearProgress } from "@material-ui/core";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { globalSelectors } from "redux/selectors";

import useStyles from "./style";

export function GlobalProgress(props) {
  const classes = useStyles();

  const { isLoading } = props;

  return isLoading ? <LinearProgress className={classes.root} /> : "";
}

const mapStateToProps = createStructuredSelector({
  isLoading: globalSelectors.makeSelectGlobalProgressIsLoading(),
});

export default connect(mapStateToProps, null)(GlobalProgress);
