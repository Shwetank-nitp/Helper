import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import CustomIconButton from "../Button/CustomIconButton";
import AddIcon from "@mui/icons-material/Add";
import PopUp from "./PopUp";
import ShowCards from "./ShowCards";
import { donationService } from "../../Services/DonationService";
import { ErrorService } from "../../Services/Error";
import { useSnackBar } from "../../hooks/useSnackBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { requestService } from "../../Services/RequestService";

function AllPosts() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { status: isAuth } = useSelector((state) => state.AuthSlice);
  const handleOnClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const nav = useNavigate();
  const location = useLocation().pathname;
  useEffect(() => {
    if (!isAuth) nav("/");
  }, [isAuth]);
  const { setOpen: setSnackbarOpen, setMessage, setSeverity } = useSnackBar();
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        switch (location) {
          case "/requests":
            {
              const res = await requestService.getAllReqDocs(signal);
              setDonations(res.message.accepters);
            }
            break;
          case "/donations":
            {
              const res = await donationService.getAllDonDocs(signal);
              setDonations(res.message.doners);
            }
            break;
          default:
            console.log("not a valid endpoint");
            break;
        }
      } catch (error) {
        console.error(error);
      }
    })();
    return () => {
      controller.abort("unmount-fetch");
    };
  }, [location]);

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    if (!data) {
      return;
    }
    try {
      switch (location) {
        case "/donations":
          {
            const res = await donationService.makeDonation(data);
            setMessage("Posted Donation");
            setSeverity("success");
            setDonations((prev) => [...prev, res.message]);
          }
          break;
        case "/requests":
          {
            const res = await requestService.makeRequest(data);
            setMessage("Posted Request");
            setSeverity("success");
            setDonations((prev) => [...prev, res.message]);
          }
          break;
        default:
          console.log("not a valid endpoint");
          break;
      }
    } catch (error) {
      if (error instanceof ErrorService) {
        console.log(error.message);
        console.log(error);
      } else console.log(error);
      setMessage(error.body.message || "Check logs");
      setSeverity("error");
    } finally {
      setSnackbarOpen(true);
      setLoading(false);
      handleClose();
    }
  }

  return (
    <Box
      flexGrow={1}
      sx={{
        display: "grid",
      }}
    >
      <ShowCards array={donations} />

      {/** AddButton to add new requests */}
      <Box
        sx={{
          position: "sticky",
          bottom: "2rem",
          margin: "0 2rem 2rem 0",
          alignSelf: "end",
          justifySelf: "end",
        }}
      >
        <CustomIconButton
          sx={{
            backgroundColor: "primary.dark",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
          hoverText="Make Request"
          onClick={handleOnClick}
        >
          <AddIcon fontSize="large" />
        </CustomIconButton>
      </Box>
      <PopUp
        open={open}
        onClose={handleClose}
        submitHandler={submitHandler}
        loading={loading}
      />
    </Box>
  );
}

export default AllPosts;
