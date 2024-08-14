import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { useSelector } from "react-redux";
import { AvatarLogo } from "../Navigation/AvatarNav";
import { ErrorService } from "../../Services/Error";
import { useSnackBar } from "../../hooks/useSnackBar";
import { useLocation } from "react-router-dom";
import { donationService } from "../../Services/DonationService";
import { requestService } from "../../Services/RequestService";

const CustomCard = styled(Card)(({ theme }) => ({
  height: "max-content",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  [theme.breakpoints.up("sm")]: {
    minWidth: "270px",
  },
}));

function RequestCard({ info, isDonation = true }) {
  const { user } = useSelector((s) => s.AuthSlice);
  const data = {
    name: user?.fullname,
    bloodtype: info?.bloodGroup,
    country: info?.country,
    location: info?.location,
    date: (() => {
      const date = new Date(info?.updatedAt);
      return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    })(),
    gender: user?.gender,
    valid: isDonation ? info?.avalable : info?.requestValid,
  };
  const [hidden, setHidden] = useState(false);
  const { setOpen, setMessage, setSeverity } = useSnackBar();
  const location = useLocation().pathname;
  async function handleDelete() {
    try {
      switch (location) {
        case "/requests":
          {
            const res = await requestService.deleteRequest(info._id);
            console.log(res);
            setMessage("Deleted");
            setSeverity("info");
            setHidden(true);
          }
          break;
        case "/donations":
          {
            const res = await donationService.removeDonation(info._id);
            console.log(res);
            setMessage("Deleted");
            setSeverity("info");
            setHidden(true);
          }
          break;
        default:
          console.log("not a valid endpoint");
          setMessage("location not matching");
          setSeverity("warning");
          break;
      }
    } catch (error) {
      if (error instanceof ErrorService) {
        console.log(error.message);
        console.log(error.body.message);
      } else console.log(error);
      setMessage(error.body?.message || "somthing went wrong check logs");
      setSeverity("error");
    } finally {
      setOpen(true);
    }
  }
  return (
    <Paper elevation={5} sx={{ display: !hidden ? "block" : "none" }}>
      <CustomCard>
        <CardHeader
          avatar={<AvatarLogo src={user?.profileAvatar} />}
          title={data?.name}
          subheader={data?.valid ? "Valid" : "Completed"}
          color="white"
        />
        <CardContent>
          <Stack gap={2}>
            {Object.keys(data).map(
              (item) =>
                item != "valid" && (
                  <Stack
                    direction={"row"}
                    key={item}
                    justifyContent={"space-between"}
                  >
                    <Typography>{item}</Typography>
                    <Typography>{data[item]}</Typography>
                  </Stack>
                )
            )}
          </Stack>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "end" }}>
          <Button>Update</Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
          <IconButton sx={{ marginLeft: "auto" }}>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </CustomCard>
    </Paper>
  );
}

export default RequestCard;
