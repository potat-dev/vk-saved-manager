import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Avatar,
  AppBar,
  Toolbar,
  Tooltip,
} from "@mui/material";

export default function Navbar(props) {
  const VK = props.vk;

  return (
    <AppBar component="nav">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={props.onMenuClick}
          sx={{ mr: 2 }}
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
            <div>
              {VK.signedIn && VK.User && (
                <Avatar
                  alt={VK.User.name + " " + VK.User.surname}
                  src={VK.User.photo}
                />
              )}
              {!VK.signedIn && <Avatar />}
            </div>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
