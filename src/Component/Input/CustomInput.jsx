import { Box, Input, TextField, keyframes, styled } from "@mui/material";
import React, { useState } from "react";

const CustomField = styled("input")(({ theme }) => ({
  padding: theme.spacing(2),
  width: "40vw",
  height: "7vh",
  outline: "none",
  backgroundColor: theme.palette.divider,
  border: `solid ${theme.palette.primary.light}`,
  borderWidth: "1px 0 1px 1px",
  borderTopLeftRadius: theme.shape.borderRadius * 3.5,
  borderBottomLeftRadius: theme.shape.borderRadius * 3.5,
  color: theme.palette.text.primary,
  fontSize: "1rem",
  [theme.breakpoints.down("sm")]: {
    width: "95vw",
    height: "7vh",
    borderRadius: theme.shape.borderRadius * 3.5,
    border: `1px solid ${theme.palette.primary.light}`,
  },
  "&:focus": {
    outline: `2px solid ${theme.palette.primary.dark}`,
  },
  "&:hover": {
    border: `1px solid ${theme.palette.primary.dark}`,
  },
}));

const CustomInput = React.forwardRef(({ ...props }, ref) => {
  return (
    <div>
      <CustomField {...props} ref={ref} placeholder="Search" />
    </div>
  );
});

export default CustomInput;
