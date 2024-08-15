import {
  Drawer,
  Stack,
  Typography,
  Badge,
  Box,
  Divider,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ThemeComponent from "./themeComponent";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useSelector } from "react-redux";
import { AvatarLogo } from "./AvatarNav";
import { useNavigate } from "react-router-dom";

function DrowerComponent({ src, name }) {
  const [open, setOpen] = useState(false);
  const { status: isAuth } = useSelector((state) => state.AuthSlice);

  useEffect(() => {
    const menu = document.getElementById("menu");
    function handler() {
      setOpen(true);
    }
    if (menu) {
      menu.addEventListener("click", handler);
    }
    return () => {
      menu && menu.removeEventListener("click", handler);
    };
  }, []);
  const nav = useNavigate();

  function handleNavigation(e) {
    nav(`/${e.target.name}`);
  }

  return (
    <Drawer
      open={open}
      onClose={(e) => {
        setOpen(false);
      }}
      anchor="right"
    >
      <Box width={280} position={"relative"} height={"100vh"}>
        <Stack m={2} direction={"row"} alignItems={"center"} gap={2}>
          <AvatarLogo src={src} /> <Typography variant="h6">{name}</Typography>
        </Stack>
        <Divider />
        <Stack m={2} gap={2} alignItems={"start"}>
          <Button
            startIcon={
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            }
          >
            Notifications
          </Button>
          <Button
            name="donations"
            onClick={handleNavigation}
            startIcon={<AddIcon />}
          >
            Donate Blood
          </Button>
          <Button
            name="requests"
            onClick={handleNavigation}
            startIcon={<AddIcon />}
          >
            Make a new Request
          </Button>
          <Button
            name="profile"
            onClick={handleNavigation}
            startIcon={<AddIcon />}
          >
            view profile
          </Button>
          <div>
            <ThemeComponent />
            Mode
          </div>
        </Stack>
        <Stack
          position={"absolute"}
          width={"100%"}
          bottom={0}
          my={4}
          alignItems={"center"}
        >
          {isAuth ? (
            <Button startIcon={<LogoutIcon />} variant="contained">
              Logout
            </Button>
          ) : (
            <Stack direction={"row"} gap={2}>
              <Button startIcon={<VpnKeyIcon />} variant="contained">
                signIn
              </Button>
              <Button startIcon={<LoginIcon />} variant="contained">
                login
              </Button>
            </Stack>
          )}
        </Stack>
      </Box>
    </Drawer>
  );
}

export default DrowerComponent;
