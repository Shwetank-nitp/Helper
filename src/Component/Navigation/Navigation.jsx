import {
  AppBar,
  Badge,
  Box,
  Stack,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddIcon from "@mui/icons-material/Add";
import CustomIconButton from "../Button/CustomIconButton";
import AvatarNav from "./AvatarNav";
import MenuIcon from "@mui/icons-material/Menu";
import DrowerComponent from "./DrowerComponent";
import ThemeComponent from "./themeComponent";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PopUp from "../Posts/PopUp";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useSnackBar } from "../../hooks/useSnackBar";
import { authService } from "../../Services/AuthService";
import { logout as authLogout } from "../../Store/AuthSlice";
import { ErrorService } from "../../Services/Error";
import { donationService } from "../../Services/DonationService";

const CustomNavLink = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  [theme.breakpoints.up("xs")]: {
    display: "none",
  },
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

function Navigation() {
  const [open, setOpen] = useState(false);

  const { status: isAuth, user } = useSelector((state) => state.AuthSlice);

  const { setMessage, setOpen: setOpenSnackBar, setSeverity } = useSnackBar();
  const [loading, setLoading] = useState(false);

  function handleToggle() {
    setOpen((prev) => !prev);
  }

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    try {
      const res = await donationService.makeDonation(data);
      console.log(res);
      setMessage("Made Donation");
      setSeverity("success");
    } catch (error) {
      if (error instanceof ErrorService) {
        console.log(error.message);
        console.log(error.body.message);
      } else {
        console.error(error);
      }
      setMessage(error.body.message || "somthing went wrong, check logs");
      setSeverity("error");
    } finally {
      setLoading(false);
      setOpenSnackBar(true);
      handleToggle();
    }
  }
  console.log("navigation");

  const dispatch = useDispatch();
  async function logout() {
    try {
      const res = await authService.logout();
      dispatch(authLogout());
      setMessage("logout done!");
      setSeverity("success");
      console.log(res); // remove me later!
    } catch (error) {
      //API errors
      if (error instanceof ErrorService) {
        console.log(error.message);
        console.log(error?.body);
      } else console.log(error); // CODE error
      setMessage(error.body?.message || "Somthing went Wrong, check logs");
      setSeverity("error");
    } finally {
      setOpenSnackBar(true);
    }
  }
  return (
    <AppBar position="sticky">
      <Toolbar
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          component={Link}
          to={"/"}
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <SelfImprovementIcon sx={{ mr: 1 }} />
          Boodbank
        </Typography>
        <CustomNavLink>
          {isAuth && (
            <>
              <CustomIconButton
                onClick={handleToggle}
                hoverText={"Donate Blood"}
              >
                <AddIcon />
              </CustomIconButton>
              <CustomIconButton hoverText={"Notifications"}>
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              </CustomIconButton>
              <AvatarNav src={user?.profileAvatar} />
            </>
          )}
          {isAuth ? (
            <CustomIconButton onClick={logout} hoverText={"Logout"}>
              <LogoutIcon />
            </CustomIconButton>
          ) : (
            <Stack direction={"row"} gap={2}>
              <CustomIconButton
                component={Link}
                to={"./login"}
                hoverText={"Login"}
              >
                <LoginIcon />
              </CustomIconButton>
              <CustomIconButton
                component={Link}
                to={"./signin"}
                hoverText={"Signin"}
              >
                <VpnKeyIcon />
              </CustomIconButton>
            </Stack>
          )}
          <ThemeComponent />
        </CustomNavLink>
        <CustomIconButton
          id={"menu"}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          <MenuIcon />
        </CustomIconButton>
        <DrowerComponent src={user?.profileAvatar} name={user?.fullname} />
      </Toolbar>
      <PopUp
        open={open}
        loading={loading}
        onClose={handleToggle}
        submitHandler={submitHandler}
      />
    </AppBar>
  );
}

export default Navigation;
