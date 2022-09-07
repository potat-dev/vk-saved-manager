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
  console.log("Navbar render");
  const VK = props.vk;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.preventDefault();
    console.log("handleClick");
    setAnchorEl(event.currentTarget);
    // console.log("handleClick", event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
            <div onClick={handleClick}>
              {VK.signedIn && VK.User && (
                <Avatar
                  alt={VK.User.name + " " + VK.User.surname}
                  src={VK.User.photo}
                />
              )}
              {!VK.signedIn && <Avatar />}
            </div>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            disableAutoFocusItem
            id="account-menu"
            open={open}
            onClose={handleClose}
            // onClick={handleClose}
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
            // transitionDuration={0}
          >
            <MenuItem disableTouchRipple disableRipple>
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "GrayText" }}
                  // gutterBottom={auth.signedIn}
                >
                  {VK.signedIn ? "Вы вошли как" : "Вы не вошли в аккаунт"}
                </Typography>
                {VK.signedIn && VK.User && (
                  <Typography variant="h6">
                    {VK.User.name + " " + VK.User.surname}
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
            {VK.signedIn ? (
              <MenuItem onClick={VK.Logout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            ) : (
              <MenuItem onClick={VK.Login}>
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
