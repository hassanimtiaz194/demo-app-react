import { Dialog, DialogContent, DialogContentText, DialogTitle, useMediaQuery } from "@material-ui/core";
import BracketSelected from "components/BracketSelected";
import React, { useEffect, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import useStyles from "./style";

function BracketSelectedDialog(props) {
    const classes = useStyles();
    const { showDialog, setShowDialog } = props;
    const [dailogOpen, setDialogOpen] = useState(true);
    const isActive = useMediaQuery('(max-width:600px)');
    /*  const [isOneBracket, setIsOneBracket] = useState(false); */
    const handleClose = (ev) => {
        setDialogOpen(false);
        setShowDialog(false);
        setDialogOpen(true);   
    };
    
    return (
        <Dialog open={dailogOpen} maxWidth="sm" style={{ padding: '16px 24px' }} onClose={dailogOpen}>
            <DialogTitle className={classes.title} disableTypography={true} >
                <Typography className={isActive? classes.heading2:classes.heading1} role="heading" variant="span" aria-level="2" >Please Select a Category from the dropdown below</Typography>
                <IconButton className={classes.closeButton} onClick={handleClose} aria-label='Close'>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <BracketSelected showDialog={showDialog} dailogOpen={dailogOpen} setDialogOpen={setDialogOpen} bracketSelectWidth={isActive ? '54vw' : '30vw'} /* setIsOneBracket={setIsOneBracket} */ />
            </DialogContent>
        </Dialog>
    );
}

export default BracketSelectedDialog;
