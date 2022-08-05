import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box } from "@mui/material";
import Song from "./Song";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

const dashboard = {
  height: "75vh",
  marginTop: "5vh",
};

function Dashboard({ user, songs, setSongs }) {
  const [nowPlaying, setNowPlaying] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      const songsFetch = async () => {
        try {
          const response = await fetch(`/songs/${user.id}`);
          const songs = await response.json();
          setSongs(songs);
          console.log(songs);
          //setNowPlaying(songs[0].audio.url);
        } catch (error) {
          console.log("fetch songs error", error);
        }
      };
      songsFetch();
    }
  }, [user]);

  const handleDeleteSong = (id) => {
    const updatedSongs = songs.filter((song) => {
      return song.id !== id;
    });
    console.log(updatedSongs);
    setSongs(updatedSongs);
  };

  const handleEditSong = (editedSong) => {
    const updatedSongs = songs.filter((song) => {
      return song.id !== editedSong.id;
    });
    setSongs([...updatedSongs, editedSong]);
  };

  const displaySongs =
    songs.length === 0
      ? "no songs"
      : songs.map((song) => (
          <Song
            key={song.id}
            song={song}
            setNowPlaying={setNowPlaying}
            nowPlaying={nowPlaying}
            handleDeleteSong={handleDeleteSong}
            handleEditSong={handleEditSong}
          />
        ));

  const icons = {
    play: <PlayCircleIcon color="secondary" fontSize="large" />,
    pause: <PauseCircleIcon color="secondary" fontSize="large" />,
  };

  return (
    <div style={dashboard}>
      <Box maxWidth="md" sx={{ border: "1px solid #D8D8D8", mx: "auto" }}>
        <Container
          sx={{
            display: "flex",
            border: "1px solid #D8D8D8",
            textAlign: "center",
          }}
          disableGutters
        >
          <Box sx={{ width: "100%", height: "6vh", pt: "2vh", backgroundColor: "#fff176" }}>
            Songs
          </Box>
          {/* <Box sx={{ width: "50%", height: "6vh", pt: "2vh" }}>Playlist</Box> */}
        </Container>
        <Container maxWidth="md" sx={{ py: "2vh", height: "58vh", overflowY: "scroll" }}>
          {displaySongs}
        </Container>
      </Box>

      <Container sx={{ pt: "10px" }}>
        <AudioPlayer
          autoPlay
          showJumpControls
          src={nowPlaying}
          customIcons={icons}
          style={{ height: "10vh", boxShadow: "none" }}
        />
      </Container>
    </div>
  );
}

export default Dashboard;
