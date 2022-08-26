import React, { useState } from "react";
import { Box, Toolbar, Container } from "@mui/material";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

export default function Page(props) {
  const { window } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Navbar
        onMenuClick={toggleDrawer}
        navItems={navItems}
        title="Saved Manager"
      />

      <Sidebar
        open={drawerOpen}
        onClose={toggleDrawer}
        drawerWidth={drawerWidth}
        navItems={navItems}
        container={container}
      />

      <Container
        disableGutters={true}
        maxWidth={false}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Toolbar />
        <Box sx={{ ...props.innerSx, overflowY: "auto", overflowX: "hidden" }}>
          <Container disableGutters={true} maxWidth="md">
            {props.children}
          </Container>
        </Box>
      </Container>
    </Box>
  );
}
