import React, { useEffect } from "react";

import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { Button, DialogActions, DialogContent } from "@material-ui/core";
import { useLocation } from "react-router-dom";

export function SessionExpiredDialog(props) {
  let previosLocationKey;
  const location = useLocation();
  const {
    onAppLogout,
    onGoLoginPage
  } = props;

  function logout() {
    //onAppLogout()
    onGoLoginPage()
  }

  return (
    <div>
      <Dialog open={props.sessionExpired || false}>
        <DialogTitle tabIndex={0}>Session Expired</DialogTitle>
        <DialogContent tabIndex={0}>
          Your session has expired. Please log back in.
        </DialogContent>
        <DialogActions>
          <Button onClick={logout} color="primary">
            Log In
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SessionExpiredDialog;