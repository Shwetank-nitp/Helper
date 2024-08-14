import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import React, { forwardRef, useState } from "react";

const ToggleButton = forwardRef(
  ({ lable = "Select avalable", disabled = true }, ref) => {
    const [isChecked, setIsChecked] = useState(false);
    function handleCheck() {
      setIsChecked((prev) => !prev);
    }
    ref.current = isChecked ? "1" : "0";
    return (
      <FormControl disabled={disabled}>
        <FormControlLabel
          label={lable}
          control={
            <Switch
              color="secondary"
              checked={isChecked}
              onChange={handleCheck}
            />
          }
        />
      </FormControl>
    );
  }
);

export default ToggleButton;
