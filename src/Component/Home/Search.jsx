import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  styled,
} from "@mui/material";
import React, { useRef, useState } from "react";
import CustomInput from "../Input/CustomInput";
import Filter from "./Filter";
import ToggleButton from "../Button/ToggleButton";
import SearchIcon from "@mui/icons-material/Search";
import SearchCard from "./SearchCard";
import { useSelector } from "react-redux";
import { donationService } from "../../Services/DonationService";
import { requestService } from "../../Services/RequestService";

const Display = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    justifyContent: "center",
    gap: theme.spacing(2),
  },
}));

const SubmitButton = styled(Button)(() => ({
  maxWidth: "20rem",
  width: "95%",
  alignSelf: "center",
  margin: "1rem 0",
}));

function Search() {
  const inputRef = useRef(null);
  const switchRef = useRef(null);
  const [type, setType] = useState(null);
  const filterRef = useRef(null);
  const { status: isAuth } = useSelector((state) => state.AuthSlice);
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState([]);
  const [isChecked, setIsChecked] = useState(true);
  
  async function handleSearch() {
    if (!isAuth) {
      setOpen(true);
      return;
    }

    try {
      const query = {
        input: inputRef.current.value,
        avalable: Number(switchRef.current) ? true : false,
        type,
        filter: filterRef.current,
      };
      let res;
      switch (type) {
        case "don":
          {
            if (isChecked) {
              res = await donationService.searchDonation(
                query.input,
                query.filter
              );
            } else {
              console.log("unchecked", query.avalable);
              res = await donationService.searchDonation(
                query.input,
                query.filter,
                query.avalable
              );
            }
            res = [...res.message.search];
          }
          break;
        case "req":
          {
            if (isChecked) {
              res = await requestService.searchRequests(
                query.input,
                query.filter
              );
            } else {
              res = await requestService.searchRequests(
                query.input,
                query.filter,
                query.avalable
              );
            }
            res = [...res.message.search];
          }
          break;
        default:
          if (isChecked) {
            const res1 = donationService.searchDonation(
              query.input,
              query.filter
            );
            const res2 = requestService.searchRequests(
              query.input,
              query.filter
            );
            const promise = await Promise.all([res1, res2]);
            res = [...promise[0].message.search, ...promise[1].message.search];
          } else {
            const res1 = donationService.searchDonation(
              query.input,
              query.filter,
              query.avalable
            );
            const res2 = requestService.searchRequests(
              query.input,
              query.filter,
              query.avalable
            );
            const promise = await Promise.all([res1, res2]);
            res = [...promise[0].message.search, ...promise[1].message.search];
          }
          break;
      }
      
      setResult(res);
    } catch (error) {
      console.log(error);
    }
  }

  function handleType(e) {
    setType(e.target.value);
  }

  function handleToggle() {
    setOpen((prev) => !prev);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          margin: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack direction={"column"}>
          <Display>
            <CustomInput ref={inputRef} />
            <Filter ref={filterRef} />
          </Display>
          <Display
            sx={{ alignItems: "start", margin: "1rem 0" }}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <ToggleButton disabled={isChecked} ref={switchRef} />
            <FormGroup>
              <FormControlLabel
                label="include all"
                control={
                  <Checkbox
                    defaultChecked
                    onChange={() => setIsChecked((prev) => !prev)}
                  />
                }
              />
            </FormGroup>
            <FormControl>
              <FormLabel sx={{ display: "inline-block" }}>Type</FormLabel>
              <RadioGroup row onChange={handleType}>
                <FormControlLabel
                  value={"don"}
                  control={<Radio color="secondary" />}
                  label="Donation"
                />
                <FormControlLabel
                  value={"req"}
                  control={<Radio color="secondary" />}
                  label="Requests"
                />
              </RadioGroup>
            </FormControl>
          </Display>
          <SubmitButton
            onClick={handleSearch}
            startIcon={<SearchIcon />}
            variant="contained"
          >
            search
          </SubmitButton>
        </Stack>
        {result.map((item, index) => (
          <SearchCard info={item} key={index} />
        ))}
      </Box>
      <Dialog open={open} onClose={handleToggle}>
        <DialogTitle>Login to search</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This feature requires account. Please <strong>Singin</strong> or{" "}
            <strong>Login</strong> in order to use this feature.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToggle}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Search;
