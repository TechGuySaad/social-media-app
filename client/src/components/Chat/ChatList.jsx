import * as React from "react";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import profileImage from "../../assets/images/1738500336291.jpeg";
import { Badge, Typography } from "@mui/material";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function ChatList() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        maxWidth: 328,
        border: "1px solid #e5e5e5",
        height: 945,
        borderRadius: "5px",
        padding: "10px",
      }}
    >
      <Typography variant="h6" color="initial" sx={{ fontWeight: "bold" }}>
        Messages
      </Typography>
      <List>
        <ListItem
          button
          sx={{
            "&:hover": {
              backgroundColor: "#f5f5f5", // Optional: Custom hover background
              cursor: "pointer",
            },
          }}
        >
          <ListItemAvatar>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                alt="Saad Rahman"
                src={profileImage}
                sx={{ width: 38, height: 38 }}
              />
            </StyledBadge>
          </ListItemAvatar>
          <ListItemText
            primary="Alex Johnson"
            secondary={" Hey how's it going?"}
          />
          <ListItemText secondary={"2h"} />

          <Badge
            badgeContent={4}
            color="black"
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "black", // Sets the badge background to black
                color: "white", // Optional: Changes text color to white for better visibility
              },
            }}
          />
        </ListItem>
        <ListItem
          sx={{
            "&:hover": {
              backgroundColor: "#f5f5f5", // Optional: Custom hover background
              cursor: "pointer",
            },
          }}
        >
          <ListItemAvatar>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                alt="Saad Rahman"
                src={profileImage}
                sx={{ width: 38, height: 38 }}
              />
            </StyledBadge>
          </ListItemAvatar>
          <ListItemText
            primary="Alex Johnson"
            secondary={" Hey how's it going?"}
          />
          <ListItemText secondary={"2h"} />

          <Badge
            badgeContent={4}
            color="black"
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "black", // Sets the badge background to black
                color: "white", // Optional: Changes text color to white for better visibility
              },
            }}
          />
        </ListItem>
        <ListItem
          sx={{
            "&:hover": {
              backgroundColor: "#f5f5f5", // Optional: Custom hover background
              cursor: "pointer",
            },
          }}
        >
          <ListItemAvatar>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                alt="Saad Rahman"
                src={profileImage}
                sx={{ width: 38, height: 38 }}
              />
            </StyledBadge>
          </ListItemAvatar>
          <ListItemText
            primary="Alex Johnson"
            secondary={" Hey how's it going?"}
          />
          <ListItemText secondary={"2h"} />

          <Badge
            badgeContent={4}
            color="black"
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "black", // Sets the badge background to black
                color: "white", // Optional: Changes text color to white for better visibility
              },
            }}
          />
        </ListItem>
      </List>
    </Box>
  );
}
