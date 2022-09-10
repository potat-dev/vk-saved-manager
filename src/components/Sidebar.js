import React from "react";
import {
  Box,
  Toolbar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Drawer,
} from "@mui/material";

import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Login from "@mui/icons-material/Login";

export default function Sidebar(props) {
  const VK = props.vk;

  const drawer = (
    <Box onClick={props.toggleDrawer}>
      <Toolbar sx={{ alignItems: "center", px: 2 }} disableGutters>
        <Typography variant="h6">{props.title}</Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton disableTouchRipple disableRipple>
            <Box>
              <Typography variant="subtitle2" sx={{ color: "GrayText" }}>
                {VK.signedIn ? "Вы вошли как" : "Вы не вошли в аккаунт"}
              </Typography>
              {VK.signedIn && VK.User && (
                <Typography variant="h6">
                  {VK.User.name + " " + VK.User.surname}
                </Typography>
              )}
            </Box>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {VK.signedIn && (
          <ListItem disablePadding>
            <ListItemButton onClick={props.onClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        )}
        <ListItem disablePadding>
          <ListItemButton onClick={VK.signedIn ? VK.Logout : VK.Login}>
            <ListItemIcon>
              {VK.signedIn ? (
                <Logout fontSize="small" />
              ) : (
                <Login fontSize="small" />
              )}
            </ListItemIcon>
            <ListItemText primary={VK.signedIn ? "Logout" : "Login"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {props.navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton onClick={props.onClose}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box component="nav">
      <Drawer
        container={props.container}
        variant="temporary"
        open={props.open}
        onClose={props.onClose}
        ModalProps={{ keepMounted: true }} // Better open performance on mobile.
        sx={{
          // display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: props.drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
