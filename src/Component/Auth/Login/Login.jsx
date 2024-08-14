import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  styled,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../Store/AuthSlice";
import { ErrorService } from "../../../Services/Error";
import { authService } from "../../../Services/AuthService";
import { useSnackBar } from "../../../hooks/useSnackBar";

const CustomStack = styled(Stack)(({ theme }) => ({
  width: "600px",
  padding: "1rem",
  [theme.breakpoints.down("sm")]: {
    width: "90vw",
  },
}));

function Login() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  function handleBack() {
    nav("../");
  }

  const { setMessage, setOpen, setSeverity } = useSnackBar();

  async function handleSubmitDemo(e) {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const res = await authService.createAccount(formData);
      setSeverity("success");
      setMessage("Account created");
      dispatch(login(res.message));
      nav("/");
    } catch (error) {
      if (error instanceof ErrorService) {
        //API errors
        console.log(error.message);
        console.log(error?.body);
      } else console.log(error); // CODE error
      setSeverity("error");
      setMessage(error.body?.message || "Somthing went wrong check logs");
    } finally {
      setOpen(true);
    }
  }
  return (
    <Paper elevation={5} sx={{ width: "max-content", margin: "4rem auto" }}>
      <form onSubmit={handleSubmitDemo}>
        <CustomStack>
          <FormLabel>Personal Details</FormLabel>
          <TextField
            margin="dense"
            variant="filled"
            placeholder="Full Name"
            required
            label="Full Name"
            name="fullname"
          />
          <TextField
            margin="dense"
            variant="filled"
            placeholder="Email"
            label="Email"
            required
            type="emial"
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
          <TextField
            margin="dense"
            variant="filled"
            placeholder="Country"
            label="Country"
            required
            name="country"
          />
          <TextField
            margin="dense"
            variant="filled"
            placeholder="Location"
            label="Locaiton (optional)"
            name="location"
          />
          <TextField type="file" name="avatar" margin="dense" required />
          <FormControl margin="dense" required>
            <FormLabel>Select Gender</FormLabel>
            <RadioGroup name="gender">
              <FormControlLabel
                control={<Radio />}
                label="Male"
                value={"male"}
              />
              <FormControlLabel
                control={<Radio />}
                label="Female"
                value={"female"}
              />
            </RadioGroup>
          </FormControl>
          <Box sx={{ display: "flex", gap: ".75rem", justifyContent: "end" }}>
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

export default Login;
