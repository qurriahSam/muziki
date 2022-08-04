import React from "react";
import { Typography, Box, Container } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

function Song({ song: { id, name, artist } }) {
  return (
    <Box id={`${id}`} sx={{ display: "flex", pb: "2vh" }}>
      <Container sx={{ display: "flex" }}>
        <Typography sx={{ pr: "0.5em" }}>{name}</Typography>
        <Typography sx={{ pr: "0.5em" }}>-</Typography>
        <Typography>{artist}</Typography>
      </Container>
      <div>
        <PlayCircleIcon color="primary" sx={{ pr: { md: "24px", xs: "16px" } }} />
      </div>
    </Box>
  );
}

export default Song;
