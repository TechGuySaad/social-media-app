import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HouseIcon from "@mui/icons-material/House";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MessageIcon from "@mui/icons-material/Message";
import GroupIcon from "@mui/icons-material/Group";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 375,
        bgcolor: "background.paper",
        borderRight: "1px solid #eaeaea",
        height: 250,
      }}
    >
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
          <Link to="/" style={{ textDecoration: "none", color: "grey" }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HouseIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link to="/chat" style={{ textDecoration: "none", color: "grey" }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <MessageIcon />
                </ListItemIcon>
                <ListItemText primary="Messages" />
              </ListItemButton>
            </ListItem>
          </Link>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Followers" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}
