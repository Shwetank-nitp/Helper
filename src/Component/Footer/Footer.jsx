import { Box, Typography, styled } from "@mui/material";
import React from "react";

const FooterBox = styled(Box)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.divider
      : theme.palette.primary.main,
  padding: theme.spacing(2),
  textAlign: "center",
}));

const CustomAncharTag = styled("a")(({ theme }) => ({
  color:
    theme.palette.mode === "dark"
      ? theme.palette.primary.dark
      : theme.palette.secondary.dark,
  marginLeft: "1rem",
  display: "inline-block",
}));

function Footer() {
  const links = [
    { name: "github", url: "https://mui.com/material-ui/react-table/" },
    { name: "help", url: "https://mui.com/material-ui/react-table/" },
    { name: "privacy policy", url: "https://mui.com/material-ui/react-table/" },
    {
      name: "goverment website",
      url: "https://mui.com/material-ui/react-table/",
    },
    { name: "join us", url: "https://mui.com/material-ui/react-table/" },
  ];
  return (
    <FooterBox>
      <Box sx={{ width: "60vw", margin: "auto" }}>
        <Typography color={"white"}>Welcome to B-Help.</Typography>
        <CustomAncharTag href="*">learn more</CustomAncharTag>
        <Box>
          {links.map((item, index) => (
            <CustomAncharTag key={index} href={item.url}>
              {item.name}
            </CustomAncharTag>
          ))}
        </Box>
      </Box>
    </FooterBox>
  );
}

export default Footer;
