import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, LinearProgress } from "@mui/material";

export default function AlertDialog({ handleAddSongClick, open, user }) {
  const [songUpload, setSongUpload] = useState({
    name: "",
    artist: "",
    audio: null,
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (prop) => (event) => {
    setSongUpload({ ...songUpload, [prop]: event.target.value });
  };

  const handleFileChange = (event) => {
    setSongUpload({ ...songUpload, audio: event.target.files[0] });
  };

  const handleSongSubmit = () => {
    const songData = new FormData();
    for (const key in songUpload) {
      songData.append(key.toString(), songUpload[key]);
    }
    songData.append("user_id", user.id.toString());

    const sendSong = async () => {
      try {
        setIsUploading(true);
        const url = "/songs";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: songData,
        });
        const song = await response.json();
        if (song.id) {
          setIsUploading(false);
          console.log("song created in db", song);
          setSongUpload({
            name: "",
            artist: "",
            audio: null,
          });
        } else {
          setIsUploading(false);
          console.log("song server error", song);
          setSongUpload({
            name: "",
            artist: "",
            audio: null,
          });
        }
      } catch (error) {
        setIsUploading(false);
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
              disabled={isUploading}
            />
            <TextField
              fullWidth
              label="Artist"
              id="artist"
              size="small"
              margin="normal"
              value={songUpload.artist}
              onChange={handleChange("artist")}
              disabled={isUploading}
            />
            <Button variant="contained" component="label" size="small" disabled={isUploading}>
              attach mp3 .
              <input accept="audio/*" type="file" onChange={handleFileChange} />
            </Button>
            <Button
              variant="contained"
              disabled={isUploading}
              onClick={handleSongSubmit}
              sx={{ display: "block", marginTop: "10px" }}
              size="small"
            >
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddSongClick} autoFocus>
            Close
          </Button>
        </DialogActions>
        <LinearProgress
          thickness={4}
          color="secondary"
          sx={{ display: isUploading ? "block" : "none" }}
        />
      </Dialog>
    </div>
  );
}
