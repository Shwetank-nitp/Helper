import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";

function PopUp({ open, onClose, submitHandler, loading = false }) {
  const [blood, setBlood] = useState("");
  function handleBloodChange(e) {
    setBlood(e.target.value);
  }
  const bloodTypes = [
    { value: "A-", label: "A-" },
    { value: "A+", label: "A+" },
    { value: "B-", label: "B-" },
    { value: "B+", label: "B+" },
    { value: "AB-", label: "AB-" },
    { value: "AB+", label: "AB+" },
    { value: "O-", label: "O-" },
    { value: "O+", label: "O+" },
  ];

  return (
    <Dialog
      open={open}
      component={"form"}
      onClose={onClose}
      onSubmit={submitHandler}
    >
      <DialogTitle>Fill the request form</DialogTitle>
      <DialogContent>
        <TextField
          label="country"
          fullWidth
          variant="filled"
          required
          margin="dense"
          name="country"
        />
        <TextField
          label="location"
          fullWidth
          variant="filled"
          required
          margin="dense"
          name="location"
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="bloodtype">BloodType</InputLabel>
          <Select
            variant="filled"
            value={blood}
            onChange={handleBloodChange}
            required
            name="bloodGroup"
          >
            {bloodTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <LoadingButton loading={loading} variant="contained" type="submit">
          Submit
        </LoadingButton>
        <Button onClick={onClose} variant="contained" color="error">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PopUp;
