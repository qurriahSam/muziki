import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box } from "@mui/material";
import Song from "./Song";

const dashboard = {
  height: "75vh",
  marginTop: "10vh",
};

function Dashboard({ user, songs, setSongs }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      const songsFetch = async () => {
        try {
          const response = await fetch("/songs");
          const songs = await response.json();
          setSongs(songs);
          console.log(songs);
        } catch (error) {
          console.log("fetch songs error", error);
        }
      };
      songsFetch();
    }
  }, [user]);

  const displaySongs = songs.map((song) => <Song key={song.id} song={song} />);

  return (
    <div style={dashboard}>
      <Box maxWidth="md" sx={{ border: "1px solid red", mx: "auto" }}>
        <Container maxWidth="md">{displaySongs}</Container>
      </Box>

      <Container>Player</Container>
    </div>
  );
}

export default Dashboard;
