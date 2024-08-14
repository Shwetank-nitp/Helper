import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Paper,
  Stack,
  Typography,
  capitalize,
  styled,
  useTheme,
} from "@mui/material";
import React from "react";
import { AvatarLogo } from "../Navigation/AvatarNav";

const CustomCard = styled(Card)(({ theme }) => ({
  width: "40vw",
  [theme.breakpoints.down("sm")]: {
    width: "90vw",
  },
}));

function SearchCard({ info }) {
  const data = {
    name: info?.user.fullname,
    bloodType: info?.bloodGroup,
    location: info?.location,
    country: info?.country,
    gender: info?.user.gender,
  };
  
  const theme = useTheme();
  return (
    <Paper elevation={5} sx={{ margin: ".5rem 0" }}>
      <CustomCard>
        <Box>
          <CardHeader
            avatar={<AvatarLogo src={info?.user.profileAvatar} />}
            title={info?.type}
            subheader={info.valid ? "avalable" : "completed"}
          ></CardHeader>
          <CardContent>
            <Stack>
              {Object.keys(data).map((item, index) => (
                <Stack
                  direction={"row"}
                  key={index}
                  justifyContent={"space-between"}
                >
                  <Typography sx={{ textTransform: "capitalize" }}>
                    {item}
                  </Typography>
                  <Typography
                    textTransform={"capitalize"}
                    fontWeight={"300"}
                    color={theme.palette.primary}
                  >
                    {data[item]}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </CardContent>
        </Box>
      </CustomCard>
    </Paper>
  );
}

export default SearchCard;
