import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../Store/ThemeSlice";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import CustomIconButton from "../Button/CustomIconButton";
import { IconButton } from "@mui/material";

function ThemeComponent() {
  const { mode } = useSelector((state) => state.ThemeSlice);
  const dispatch = useDispatch();
  function handleMode() {
    if (mode === "light") {
      dispatch(setTheme("dark"));
    } else {
      dispatch(setTheme("light"));
    }
  }
  return (
    <IconButton onClick={handleMode}>
      {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}

export default ThemeComponent;
