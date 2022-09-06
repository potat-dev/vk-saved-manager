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
  const VK = props.vk;

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
              {VK.signedIn && VK.User && (
                <Avatar
                  alt={VK.User.name + " " + VK.User.surname}
                  src={VK.User.photo}
                />
              )}
              {!VK.signedIn && <Avatar />}
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
