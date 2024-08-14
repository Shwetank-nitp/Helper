import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { Popover, Typography } from "@mui/material";

const CustomStyledIconButton = styled(IconButton)(() => ({
  color: "white",
  cursor: "pointer",
}));

function CustomIconButton({ children, hoverText, onClick, ...props }) {
  const [open, setOpen] = useState(false);
  const compRef = useRef(null);

  return (
    <>
      <CustomStyledIconButton
        ref={compRef}
        onMouseEnter={(e) => {
          setOpen(true);
        }}
        onMouseLeave={(e) => {
          setOpen(false);
        }}
        aria-owns={open ? "popover" : undefined}
        aria-haspopup="true"
        onClick={onClick}
        {...props}
      >
        {children}
      </CustomStyledIconButton>
      <Popover
        anchorEl={open ? compRef.current : null}
        open={open}
        sx={{ pointerEvents: "none" }}
        id="popover"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography p={1}>{hoverText}</Typography>
      </Popover>
    </>
  );
}

export default CustomIconButton;
