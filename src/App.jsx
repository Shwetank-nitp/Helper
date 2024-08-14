import Navigation from "./Component/Navigation/Navigation";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "./Component/Footer/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authService } from "./Services/AuthService";
import { login } from "./Store/AuthSlice";
import { useSnackBar } from "./hooks/useSnackBar";

function App() {
  const { status } = useSelector((s) => s.AuthSlice);
  const dispatch = useDispatch();
  const { setOpen, setMessage, setSeverity } = useSnackBar();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (status) {
      setLoading(false);
      return;
    }
    authService
      .getAccount()
      .then((data) => {
        dispatch(login(data.message));
        console.log(data);
      })
      .catch((error) => {
        if (error.body?.message === "No token found in cookies") {
          setMessage("Please Login");
          setSeverity("warning");
        } else {
          setMessage(error.body?.message || "Check logs");
          setSeverity("error");
        }
        setOpen(true);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navigation />
      {loading && <Box flexGrow={1}></Box>}
      {!loading && <Outlet />}
      <Footer />
    </Box>
  );
}

export default App;
