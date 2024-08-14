import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { AvatarLogo } from "../Navigation/AvatarNav";
import { useSnackBar } from "../../hooks/useSnackBar";
import { authService } from "../../Services/AuthService";
import { ErrorService } from "../../Services/Error";
import { login } from "../../Store/AuthSlice";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import SaveIcon from "@mui/icons-material/Save";

let currentEditing = 0;

const EditableText = React.forwardRef(({ value, name }, ref) => {
  const [isEditable, setIsEditable] = useState(false);
  useEffect(() => {
    if (isEditable) currentEditing++;
    else if (!isEditable && currentEditing > 0) currentEditing--;
  }, [isEditable]);
  const [input, setInput] = useState(value);
  function handleEdit() {
    setIsEditable((prev) => !prev);
  }

  function handleInput(e) {
    setInput(e.target.value);
  }
  ref.current = input;
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "nowrap",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      {isEditable && (
        <TextField
          variant="standard"
          value={input}
          onChange={handleInput}
          margin="dense"
          required
          name={name}
        />
      )}
      {!isEditable && (
        <Typography fontWeight={400} variant="h6">
          {input}
        </Typography>
      )}
      <IconButton sx={{ height: "max-content" }} onClick={handleEdit}>
        {isEditable ? <DoneIcon /> : <EditIcon />}
      </IconButton>
    </Box>
  );
});

const ImageComponet = React.forwardRef(({ src }, ref) => {
  const [image, setImage] = useState(null);
  function handleUpload() {
    const inputImg = document.getElementById("uploadImage");
    inputImg.click();
  }
  function handleImageChange(e) {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
  }
  if (image) {
    src = URL.createObjectURL(image);
  }
  ref.current = image;
  return (
    <Box
      sx={{ cursor: "pointer", position: "relative" }}
      onClick={handleUpload}
    >
      <AvatarLogo src={src} height="100px" width="100px" />
      <input
        width={"0px"}
        height={"0px"}
        id="uploadImage"
        type="file"
        accept="img"
        onChange={handleImageChange}
        hidden
      />
      <AddAPhotoIcon
        sx={{ position: "absolute", bottom: "2px", right: "2px" }}
      />
    </Box>
  );
});

function Profile() {
  const { status, user } = useSelector((s) => s.AuthSlice);
  const nav = useNavigate();
  if (!status) {
    console.log("im true", status);
    nav("/");
  }

  const obj = {
    fullname: {
      fieldName: "Full Name",
      value: user?.fullname,
      ref: useRef(null),
    },
    email: {
      fieldName: "Email",
      value: user?.email,
      ref: useRef(null),
    },
    gender: {
      fieldName: "Gender",
      value: user?.gender,
      ref: useRef(null),
    },
    country: {
      fieldName: "Country",
      value: user?.country,
      ref: useRef(null),
    },
    location: {
      fieldName: "Location",
      value: user?.location,
      ref: useRef(null),
    },
  };

  const [loading, setLoading] = useState(false);

  function handelBack() {
    nav("../");
  }
  const avatarRef = useRef(null);
  const { setMessage, setOpen, setSeverity } = useSnackBar();
  const dispatch = useDispatch();

  async function handleUpdateAccountInfo() {
    const data = {
      fullname: obj.fullname.ref.current,
      location: obj.location.ref.current,
      country: obj.country.ref.current,
      gender: obj.gender.ref.current,
      email: obj.email.ref.current,
    };

    return await authService.updateAccountInfo(data);
  }
  async function handleUpdateProfileImage() {
    if (!avatarRef.current) return;
    return await authService.updateProfilePicture(avatarRef.current);
  }

  async function handelUpdate() {
    const genderCheck = ["male", "female"].includes(
      String(obj.gender.ref.current).toLocaleLowerCase()
    );
    if (!genderCheck) {
      setMessage("gender can be male or female only");
      setSeverity("warning");
      setOpen(true);
      console.warn("gender can be male or female");
      return;
    }
    if (currentEditing > 0) {
      setMessage("first finish edititng");
      setSeverity("warning");
      setOpen(true);
      console.warn("first finish edititng");
      return;
    }
    try {
      setLoading(true);
      const updateInfo = handleUpdateAccountInfo();
      const updateAvatar = handleUpdateProfileImage();
      await Promise.all([updateAvatar, updateInfo]);
      const getAccountInfo = await authService.getAccount();
      dispatch(login(getAccountInfo.message));
      setMessage("Update!");
      setSeverity("success");
    } catch (error) {
      if (error instanceof ErrorService) {
        console.log(error.message);
        console.log(error?.body);
      } else console.log(error); // CODE error
      setMessage(error.body?.message || "Somthing went Wrong, check logs");
      setSeverity("error");
    } finally {
      setOpen(true);
      setLoading(false);
    }
  }

  return (
    <Box flexGrow={1} sx={{ margin: "2rem auto" }}>
      <Card sx={{ width: "500px" }}>
        <CardHeader title={"User Profile"} />
        <CardContent>
          <Stack gap={2} alignItems={"center"}>
            <ImageComponet src={user?.profileAvatar} ref={avatarRef} />
            {Object.keys(obj).map((key, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "95%",
                  alignItems: "center",
                  height: "3rem",
                }}
              >
                <Typography fontWeight={300} variant="h6">
                  {obj[key].fieldName}
                </Typography>
                <EditableText
                  ref={obj[key].ref}
                  value={obj[key].value}
                  name={key}
                />
              </Box>
            ))}
          </Stack>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <LoadingButton
            loading={loading}
            loadingPosition="start"
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handelUpdate}
          >
            save
          </LoadingButton>
          <Button variant="text" onClick={handelBack}>
            back
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default Profile;
