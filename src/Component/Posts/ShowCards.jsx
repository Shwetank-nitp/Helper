import React from "react";
import RequestCard from "./RequestCard";
import { Box } from "@mui/material";

function ShowCards({ array = [] }) {
  return (
    <Box
      sx={{
        margin: "2rem auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(0, 300px))",
        gap: "2rem",
        maxWidth: "90vw",
        height: "max-content",
        justifyContent: "center",
      }}
      component={"div"}
    >
      {array.map((info, index) => (
        <RequestCard info={info} key={index} />
      ))}
    </Box>
  );
}

export default ShowCards;
