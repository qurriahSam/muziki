import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";

export default function AlertDialog({ handleAddSongClick, open, user }) {
  const [songUpload, setSongUpload] = useState({
    name: "",
    artist: "",
  });

  //useEffect(() => console.log(user.id));

  const handleChange = (prop) => (event) => {
    setSongUpload({ ...songUpload, [prop]: event.target.value });
  };

  const handleSongSubmit = () => {
    const sendSong = async () => {
      try {
        const url = "/songs";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ ...songUpload, user_id: user.id }),
        });
        const song = await response.json();
        if (song.id) {
          console.log("created in db", song);
          setSongUpload({
            name: "",
            artist: "",
          });
        } else {
          console.log("song server error", song);
          setSongUpload({
            name: "",
            artist: "",
          });
        }
      } catch (error) {
        console.log("signup error", error);
      }
    };
    sendSong();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleAddSongClick}
        aria-labelledby="AddSong-dialog-title"
        aria-describedby="AddSong-dialog-description"
      >
        <DialogTitle id="AddSong-dialog-title">{"Add Song:"}</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              fullWidth
              label="Title"
              id="songName"
              size="small"
              margin="normal"
              value={songUpload.name}
              onChange={handleChange("name")}
            />
            <TextField
              fullWidth
              label="Artist"
              id="artist"
              size="small"
              margin="normal"
              value={songUpload.artist}
              onChange={handleChange("artist")}
            />
            <Button variant="contained" component="label">
              attach mp3
              <input hidden accept="audio/*" type="file" />
            </Button>
            <Button variant="contained" onClick={handleSongSubmit}>
              Upload
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddSongClick} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
