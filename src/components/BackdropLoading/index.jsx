import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import useStyles from "./styles";

export default function BackdropLoading(props) {
  const classes = useStyles();
  const { show } = props;
  const [open, setOpen] = React.useState(show);

  React.useEffect(() => {
    setOpen(show);
  }, [show]);

  return (
    <Backdrop className={classes.backdrop} open={open} role='alert' aria-hidden='false' aria-label="Loading">
      <CircularProgress 
      color="inherit"
        />
    </Backdrop>
  );
}
