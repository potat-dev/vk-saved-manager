import React from "react";
import {
  Box,
  Toolbar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Drawer,
} from "@mui/material";

export default function Sidebar(props) {
  const drawer = (
    <Box onClick={props.toggleDrawer}>
      <Toolbar sx={{ alignItems: "center" }}>
        <Typography variant="h6">MUI</Typography>
      </Toolbar>
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
          display: { xs: "block", sm: "none" },
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
