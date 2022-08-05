import React from "react";
import { Typography, Box, Container } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import Popover from "@mui/material/Popover";
import EditSong from "./EditSong";

function Song({
  song: {
    id,
    name,
    artist,
    audio: { url },
  },
  setNowPlaying,
  handleDeleteSong,
  handleEditSong,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleSongChange = () => {
    setNowPlaying(url);
    setIsPlaying(!isPlaying);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditSongOpen = () => {
    setEditDialogOpen(true);
  };

  const handleEditSongClose = () => {
    setEditDialogOpen(false);
  };

  const open = Boolean(anchorEl);
  const pop = open ? "popover" : undefined;

  const handleDelete = () => {
    fetch(`/songs/${id}`, {
      method: "DELETE",
    }).then(() => {
      handleDeleteSong(id);
      handleClose();
    });
  };

  return (
    <Box id={`${id}`} sx={{ display: "flex", pb: "2vh" }}>
      <Container sx={{ display: "flex" }}>
        <Typography sx={{ pr: "0.5em" }}>{name}</Typography>
        <Typography sx={{ pr: "0.5em" }}>-</Typography>
        <Typography>{artist}</Typography>
      </Container>
      <Box sx={{ display: "flex" }}>
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
        <MoreHorizIcon sx={{ cursor: "pointer" }} aria-describedby={pop} onClick={handleClick} />
        <Popover
          id={pop}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Typography
            sx={{
              p: 2,
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "primary.main",
              },
            }}
            onClick={handleEditSongOpen}
          >
            Edit{" "}
          </Typography>
          <Typography
            sx={{
              p: 2,
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "primary.main",
              },
            }}
            onClick={handleDelete}
          >
            Delete
          </Typography>
        </Popover>
      </Box>
      <EditSong
        handleEditSongClose={handleEditSongClose}
        open={editDialogOpen}
        id={id}
        name={name}
        artist={artist}
        handleEditSong={handleEditSong}
      />
    </Box>
  );
}

export default Song;
