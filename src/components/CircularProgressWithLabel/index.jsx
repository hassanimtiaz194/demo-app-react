import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from '@material-ui/core/Typography';
import {Box} from '@material-ui/core';

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" size={80}  {...props}/>
      <Box
      style={{
        padding: '31px 00px 0px 6px',
        textAlign: 'center',
      }}
        sx={{
           position: 'absolute', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography style={{textAlign:'center',marginLeft:20}} variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`} <br />
          {props.isAlmostDone&&(
            `Almost done`
          )}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default CircularProgressWithLabel;