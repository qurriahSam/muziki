import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AddSongDialog from "./AddSongDialog";

const ResponsiveAppBar = ({ user, handleSetUser, handleSetSong }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [addSongDialog, setaddSongDialog] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoutUserMenu = () => {
    handleLogoutClick();
    setAnchorElUser(null);
  };

  const handleAddSongClick = () => {
    setaddSongDialog(!addSongDialog);
  };

  const navigate = useNavigate();

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        handleSetUser(null);
        navigate("/");
      }
    });
    console.log("loggedOut");
  }

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "kalam",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Muz!ki
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem key="Add Song" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Add Song</Typography>
                </MenuItem>
                <MenuItem key="New Playlist" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">New Playlist</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "kalam",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Muz!ki
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                key="Add Song"
                onClick={handleAddSongClick}
                sx={{ my: 2, color: "inherit", display: user ? "block" : "none" }}
              >
                Add Song
              </Button>
              <Button
                key="New Playlist"
                sx={{ my: 2, color: "inherit", display: user ? "none" : "none" }}
              >
                New Playlist
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0, display: { xs: "block", md: "none" } }}>
              <Tooltip title="Login/Logout">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AccountCircleIcon />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Link to="login">
                  <MenuItem
                    key="Login"
                    onClick={handleCloseUserMenu}
                    sx={{ display: user ? "none" : "block" }}
                  >
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                </Link>
                <Link to="signup">
                  <MenuItem key="SignUp" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">SignUp</Typography>
                  </MenuItem>
                </Link>
                <MenuItem
                  key="Logout"
                  onClick={handleLogoutUserMenu}
                  sx={{ display: user ? "block" : "none" }}
                >
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              <Button
                variant="text"
                color="inherit"
                onClick={handleLogoutClick}
                sx={{ display: user ? "block" : "none" }}
              >
                Logout
              </Button>
              <Link to="login" style={{ textDecoration: "none" }}>
                <Button variant="text" color="inherit" sx={{ display: user ? "none" : "block" }}>
                  Login
                </Button>
              </Link>
              <Link to="signup" style={{ textDecoration: "none" }}>
                <Button variant="contained" sx={{ display: user ? "none" : "block" }}>
                  Signup
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <AddSongDialog
        handleAddSongClick={handleAddSongClick}
        open={addSongDialog}
        user={user}
        handleSetSong={handleSetSong}
      />
    </>
  );
};
export default ResponsiveAppBar;
