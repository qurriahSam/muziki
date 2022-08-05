import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, LinearProgress } from "@mui/material";

export default function EditSong({ handleEditSongClose, open, id, name, artist, handleEditSong }) {
  const [songUpload, setSongUpload] = useState({
    name: name,
    artist: artist,
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (prop) => (event) => {
    setSongUpload({ ...songUpload, [prop]: event.target.value });
  };

  const handleSongSubmit = () => {
    const editSong = async () => {
      try {
        setIsUploading(true);
        const url = `/songs/${id}`;
        const response = await fetch(url, {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify(songUpload),
        });
        const song = await response.json();
        console.log(song);
        if (song.id) {
          setIsUploading(false);
          handleEditSong(song);
          console.log("song updated in db", song);
          setSongUpload({
            name: name,
            artist: artist,
          });
        } else {
          setIsUploading(false);
          console.log("song server error", song);
          setSongUpload({
            name: name,
            artist: artist,
          });
        }
      } catch (error) {
        setIsUploading(false);
        console.log("signup error", error);
      }
    };
    editSong();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleEditSongClose}
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

            <Button
              variant="contained"
              disabled={isUploading}
              onClick={handleSongSubmit}
              sx={{ display: "block", marginTop: "10px" }}
              size="small"
            >
              {isUploading ? "Updating..." : "Update"}
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditSongClose} autoFocus>
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
