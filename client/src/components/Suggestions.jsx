import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "@mui/material";
import profileImage from "../assets/images/1738500336291.jpeg";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Suggestions() {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 375,
        bgcolor: "background.paper",
        border: "1px solid rgba(189, 189, 189, 0.94)",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <h3>People you may know</h3>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem
            disablePadding
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              columnGap: "10px",
              marginTop: "10px",
            }}
          >
            <Avatar
              alt="Saad Rahman"
              src={profileImage}
              sx={{ width: 38, height: 38 }}
            />
            <ListItemText
              primary="Saad Rahman"
              //   sx={{ backgroundColor: "black" }}
            />

            <Button
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid rgba(189, 189, 189, 0.94)",
              }}
              disableElevation
            >
              Add
            </Button>
          </ListItem>{" "}
          <ListItem
            disablePadding
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              columnGap: "10px",
              marginTop: "10px",
            }}
          >
            <Avatar
              alt="Saad Rahman"
              src={profileImage}
              sx={{ width: 38, height: 38 }}
            />
            <ListItemText
              primary="Saad Rahman"
              //   sx={{ backgroundColor: "black" }}
            />

            <Button
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid rgba(189, 189, 189, 0.94)",
              }}
              disableElevation
            >
              Add
            </Button>
          </ListItem>{" "}
          <ListItem
            disablePadding
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              columnGap: "10px",
              marginTop: "10px",
            }}
          >
            <Avatar
              alt="Saad Rahman"
              src={profileImage}
              sx={{ width: 38, height: 38 }}
            />
            <ListItemText
              primary="Saad Rahman"
              //   sx={{ backgroundColor: "black" }}
            />

            <Button
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "black",
                border: "1px solid rgba(189, 189, 189, 0.94)",
              }}
              disableElevation
            >
              Add
            </Button>
          </ListItem>{" "}
        </List>
      </nav>
    </Box>
  );
}
