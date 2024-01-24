import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import timezones from "assets/timezones.json";

export default function TimezoneSelect(props) {
  let { selectedTimeZone, handleChange,isAriaExpanded,setIsAriaExpanded } = props;
  
  return (
    <Autocomplete
      options={timezones}
      value={selectedTimeZone}
      onChange={handleChange}
      disableClearable={true}
      getOptionLabel={(option) => option.label || ""}
      onOpen={setIsAriaExpanded(true)}
      onClose={setIsAriaExpanded(false)}
      getOptionSelected={(option, value) => {
        if (value === "") return true;

        return option === value;
      }}
      renderInput={({ inputProps, ...params }) => (
        <TextField
          {...params}
          inputProps={{
            ...inputProps,
            "aria-label": "Choose a time zone",
            'aria-expanded': isAriaExpanded
          }}
          label="Choose a time zone"
          variant="outlined"
          
        />
      )}
    />
  );
}
