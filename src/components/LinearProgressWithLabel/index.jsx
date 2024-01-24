import * as React from 'react';
import PropTypes from 'prop-types';
import { Grid, LinearProgress, Typography } from '@material-ui/core';
import useStyles from "./style";

function LinearProgressWithLabel(props) {
  const classes = useStyles();
  return (
    <Grid container
      direction="row"
      //role='alert'
      /* aria-label='Uploading' */
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Grid item xs={11}>
        <LinearProgress variant="determinate" {...props} />
      </Grid>
      <Grid item xs={1}>
        {props.loading ?
          <Typography role='alert' /* aria-label='File Uploading' */ variant="body2" color="text.secondary" style={{ textAlign: 'center', display: 'inline-Block', }}>
            <span className={classes.ariahiddenText}>&nbsp;File Uploading&nbsp;</span>{`${Math.round(props.value)}% `}
          </Typography>
          : ''}
      </Grid>
    </Grid>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default LinearProgressWithLabel;