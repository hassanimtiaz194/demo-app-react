import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { useState } from "react";
import { styled } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';

export const useConfirmDialog = () => {
  const [dialog, setDialog] = useState("");

  const GreenButton = styled(Button)(({ theme }) => ({
    color: "#153116",
    backgroundColor: "#41a546",
    '&:hover': {
      backgroundColor: "#41a546",
    },
    "&:focus": {
      color: "#ffffff",
      backgroundColor: '#000000',
    }
  }));

  const RedButton = styled(Button)(({ theme }) => ({
    color: "#ffffff",
    backgroundColor: "#e91c0d",
    '&:hover': {
      backgroundColor: "#e91c0d",
    },
    "&:focus": {
      color: "#FFFFFF",
      backgroundColor: '#83130B',
    }
  }));

  const open = (title, content) => {
    return new Promise((resolve, reject) => {
      const handleClose = () => {
        setDialog("");
        resolve(false);
      };

      const handleConfirm = () => {
        setDialog("");
        resolve(true);
      };

      setDialog(
        <Dialog
          open={true}
          onClose={handleClose}
          aria-labelledby="confirmation-dialog-title"
          aria-describedby="confirmation-dialog-description"
        >
          <DialogTitle id="confirmation-dialog-title" /* tabIndex={0} */>{title}</DialogTitle>
          <DialogContent /* tabIndex={0} */>{content}</DialogContent>
          <DialogActions>
            <RedButton onClick={handleClose} color="primary" variant="contained">
              No
            </RedButton>
            <GreenButton onClick={handleConfirm}  variant="contained" autoFocus>
              Yes
            </GreenButton>
          </DialogActions>
        </Dialog>
      );
    });
  };

  return {
    open,
    dialog,
  };
};
