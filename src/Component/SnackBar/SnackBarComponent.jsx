import {
  Alert,
  Button,
  Snackbar,
  Stack,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useSnackBar } from "../../hooks/useSnackBar";

function SnackBarComponent({ vertical = "bottom", horizontal = "right" }) {
  const { message, button, severity, open, setOpen } = useSnackBar();
  function handleClose() {
    setOpen(false);
  }
  const action = (
    <Stack direction={"row"} gap={2} alignItems={"center"}>
      {!!button && button.message && (
        <Button id={"snackbarid"} onClick={button.handler}>
          {button.message}
        </Button>
      )}
      <CloseIcon fontSize="small" onClick={handleClose} />
    </Stack>
  );
  return (
    <Snackbar
      open={open}
      autoHideDuration={2500}
      sx={{ padding: 0 }}
      anchorOrigin={{ vertical, horizontal }}
      onClose={handleClose}
    >
      <Alert action={action} severity={severity} variant="standard">
        {String(message)}
      </Alert>
    </Snackbar>
  );
}

export default SnackBarComponent;
