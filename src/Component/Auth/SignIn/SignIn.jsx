import React from "react";
import {
  Box,
  Button,
  FormLabel,
  Paper,
  Stack,
  TextField,
  styled,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ErrorService } from "../../../Services/Error";
import { useSnackBar } from "../../../hooks/useSnackBar";
import { authService } from "../../../Services/AuthService";
import { login } from "../../../Store/AuthSlice";

const CustomStack = styled(Stack)(({ theme }) => ({
  width: "420px",
  padding: "1rem",
  [theme.breakpoints.down("sm")]: {
    width: "90vw",
  },
}));

function SignIn() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  function handleBack() {
    nav("../");
  }
  const { setMessage, setOpen, setSeverity } = useSnackBar();
  async function handleSubmitDemo(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formEntry = Object.fromEntries(formData);
    const { email, password } = formEntry;
    try {
      const res = await authService.login(email, password);
      dispatch(login(res.message));
      setMessage("Login Successful");
      setSeverity("success");
      nav("/");
    } catch (error) {
      //API errors
      if (error instanceof ErrorService) {
        console.log(error.message);
        console.log(error?.body);
      } else console.log(error); // CODE error
      setSeverity("error");
      setMessage(error.body?.message || "Some thing went wrong check the logs");
    } finally {
      setOpen(true);
    }
  }

  return (
    <Paper elevation={5} sx={{ width: "max-content", margin: "4rem auto" }}>
      <form onSubmit={handleSubmitDemo}>
        <CustomStack>
          <FormLabel>Login Details</FormLabel>
          <TextField
            margin="dense"
            variant="filled"
            placeholder="Email"
            required
            label="Email"
            name="email"
          />

          <TextField
            margin="dense"
            variant="filled"
            placeholder="Password"
            label="Password"
            required
            type="password"
            name="password"
          />
          <Box
            sx={{
              display: "flex",
              gap: ".75rem",
              justifyContent: "end",
              marginTop: "1rem",
            }}
          >
            <Button variant="contained" type="submit">
              Submit
            </Button>
            <Button variant="contained" color="error" onClick={handleBack}>
              Back
            </Button>
          </Box>
        </CustomStack>
      </form>
    </Paper>
  );
}

export default SignIn;
