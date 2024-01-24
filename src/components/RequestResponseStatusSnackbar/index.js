import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import clsx from "clsx";

import Snackbar from "@material-ui/core/Snackbar";
import { Fade } from "@material-ui/core";

import { globalSelectors } from "redux/selectors";

import useStyles from "./style";

const SUCCESS_DURATION = 3000;
const ERROR_DURATION = 6000;

export function RequestResponseStatusSnackbar(props) {
  const classes = useStyles();

  /**
   * @type {import("../../typedefs/contestantFormTemplate.typedef").RequestResponse} requestResponse
   */
  const requestResponse = props.requestResponse;
  const { error } = props;
  const [message, setMessage] = React.useState("");

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (requestResponse && requestResponse.message) {
      setMessage(requestResponse.message);
      setOpen(true);

      const timeout = setTimeout(
        () => {
          setOpen(false);
          clearTimeout(timeout);
        },
        error ? ERROR_DURATION : SUCCESS_DURATION
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestResponse]);

  return (
    <Snackbar
      TransitionComponent={Fade}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      className={clsx(classes.root, {
        [classes.success]: !error,
        [classes.error]: error,
      })}
      open={open}
      message={message}
    />
  );
}

const mapStateToProps = createStructuredSelector({
  requestResponse: globalSelectors.makeSelectGlobalRequestResponse(),
  error: globalSelectors.makeSelectGlobalRequestResponseError(),
});

export default connect(mapStateToProps, null)(RequestResponseStatusSnackbar);
