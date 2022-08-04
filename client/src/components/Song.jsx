import React from "react";
import { Typography, Box, Container } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import { useState } from "react";

function Song({
  song: {
    id,
    name,
    artist,
    audio: { url },
  },
  setNowPlaying,
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSongChange = () => {
    setNowPlaying(url);
    setIsPlaying(!isPlaying);
  };

  return (
    <Box id={`${id}`} sx={{ display: "flex", pb: "2vh" }}>
      <Container sx={{ display: "flex" }}>
        <Typography sx={{ pr: "0.5em" }}>{name}</Typography>
        <Typography sx={{ pr: "0.5em" }}>-</Typography>
        <Typography>{artist}</Typography>
      </Container>
      <div>
        {isPlaying ? (
          <PauseCircleIcon
            color="primary"
            sx={{ pr: { md: "24px", xs: "16px", cursor: "pointer" } }}
            onClick={handleSongChange}
          />
        ) : (
          <PlayCircleIcon
            color="primary"
            sx={{ pr: { md: "24px", xs: "16px", cursor: "pointer" } }}
            onClick={handleSongChange}
          />
        )}
      </div>
    </Box>
  );
}

export default Song;
