import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import useStyles from "./styles";

export default function TimezoneSelect(props) {
  const classes = useStyles();
  let {
    selectedValue,
    isRequired,
    handleChange,
    label,
    options,
    renderOption,
    filterOptions,
  } = props;
  const [poperrOpen, setPoperrOpen] = useState(false);

  let inputValue = "";
  let inputRef;
  if (selectedValue) {
    inputValue = selectedValue.label;
  }

  return (
    <Autocomplete
      options={options}
      onInputChange={(event, value) => {
        inputValue = value;
      }}
      onChange={(event, value) => {
        if (value) {
          inputValue = value.label;
        }
        handleChange(event, value);
      }}
      classes={{
        option: classes.option,
        inputRoot: classes.inputRoot,
      }}
      open={poperrOpen}
      onOpen={(ev) => {
        setPoperrOpen(true);
        inputRef.focus();
      }}
      onClose={() => {
        setPoperrOpen(false);
      }}
      filterOptions={(options, state) => {
        return filterOptions(options, state.inputValue);
      }}
      openOnFocus={true}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={renderOption}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            {...params.inputProps}
            label={label}
            value={inputValue}
            variant="outlined"
            inputRef={(input) => {
              inputRef = input;
            }}
            onMouseDown={(ev) => {
              //   have to overwrite this
              //   to prevent popper close
            }}
            required={isRequired}
            fullWidth
            inputProps={{
              autoComplete: "disabled", // disable autocomplete and autofill
            }}
          />
        );
      }}
    />
  );
}


Using MUI Grid (built on top of Flexbox and makes it easier to create grid-based layouts using Flexbox)
===============
<Container>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6">Left Content</Typography>
            <Typography variant="body1">Some text here</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6">Right Content</Typography>
            <Typography variant="body1">Some text here</Typography>
          </Grid>
        </Grid>
    </Container>

Using MUI
========
<Box  style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <Box>
          <Typography variant="h6">Left Content</Typography>
          <Typography variant="body1">Some text here</Typography>
        </Box>

        <Box>
          <Typography variant="h6">Right Content</Typography>
          <Typography variant="body1">Some text here</Typography>
        </Box>
      </Box>

