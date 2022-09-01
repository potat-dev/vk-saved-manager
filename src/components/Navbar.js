import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Avatar,
  Tooltip,
} from "@mui/material";

import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Login from "@mui/icons-material/Login";

export default function Navbar(props) {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const auth = props.auth;

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar component="nav">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={props.onMenuClick}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {props.title}
        </Typography>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {props.navItems.map((item) => (
            <Button key={item} sx={{ color: "#fff" }}>
              {item}
            </Button>
          ))}
        </Box>
        <Box sx={{ flexGrow: 0, ml: 2 }}>
          <Tooltip title="Аккаунт">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {auth.signedIn && auth.user && (
                <Avatar
                  alt={auth.user.name + " " + auth.user.surname}
                  src={auth.user.photo}
                />
              )}
              {!auth.signedIn && <Avatar />}
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorElUser}
            id="account-menu"
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            PaperProps={{
              elevation: 0,
              variant: "outlined",
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 3,
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "GrayText" }}
                  // gutterBottom={auth.signedIn}
                >
                  {auth.signedIn ? "Вы вошли как" : "Вы не вошли в аккаунт"}
                </Typography>
                {auth.signedIn && auth.user && (
                  <Typography variant="h6">
                    {auth.user.name + " " + auth.user.surname}
                  </Typography>
                )}
              </Box>
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            {auth.signedIn ? (
              <MenuItem onClick={auth.signOut}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            ) : (
              <MenuItem onClick={auth.signIn}>
                <ListItemIcon>
                  <Login fontSize="small" />
                </ListItemIcon>
                Login
              </MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
