import { Button, List, ListItemButton, Popover, styled } from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const CustomSelect = styled(Button)(({ theme }) => ({
  width: "20vw",
  height: "7vh",
  borderRadius: 0,
  borderTopRightRadius: theme.shape.borderRadius * 3.5,
  borderBottomRightRadius: theme.shape.borderRadius * 3.5,
  backgroundColor: theme.palette.divider,
  border: `solid ${theme.palette.primary.light}`,
  borderWidth: "1px 1px 1px 0",
  color: theme.palette.text.primary,
  fontSize: "1rem",
  [theme.breakpoints.down("sm")]: {
    width: "95vw",
    height: "7vh",
    fontSize: "1rem",
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

const Filter = React.forwardRef((props, ref) => {
  const [isUp, setisUp] = useState(false);
  const type = ["country", "bloodGroup", "location"];
  const [value, setValue] = useState(type[0]);
  function handleClose() {
    setisUp((prev) => !prev);
  }
  ref.current = value;
  function handleSelect(e) {
    setValue(e.target.attributes.value.nodeValue);
  }
  const open = isUp; // if up the open = true else false
  return (
    <div>
      <CustomSelect
        id={"selection"}
        endIcon={
          isUp ? (
            <KeyboardArrowUpIcon fontSize="large" />
          ) : (
            <KeyboardArrowDownIcon fontSize="large" />
          )
        }
        onClick={handleClose}
      >
        {value}
      </CustomSelect>
      <Popover
        anchorEl={document.getElementById("selection")}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <List>
          {type.map((item, index) => (
            <ListItemButton value={item} onClick={handleSelect} key={index}>
              {item}
            </ListItemButton>
          ))}
        </List>
      </Popover>
    </div>
  );
});

export default Filter;
