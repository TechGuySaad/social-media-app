import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";

import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import ProfileImage from "../../assets/images/1738500336291.jpeg";

function Chatbar() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fafafa",
        borderBottom: "1px solid #e5e5e5",
        paddingBottom: "8px",
      }}
      elevation={0}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",

          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Avatar - Left-aligned */}
        <Box sx={{ display: "flex", alignItems: "center", columnGap: "10px" }}>
          <IconButton sx={{ p: 0 }}>
            <Avatar alt="Saad Rahman" src={ProfileImage} />
          </IconButton>
          <Box>
            <Typography
              variant="body1"
              sx={{ fontWeight: "light", color: "black" }}
            >
              Saad Rahman
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: "light", color: "green" }}
            >
              Online
            </Typography>
          </Box>
        </Box>

        {/* Navigation Links - Right-aligned with spacing */}
        <Box>
          <IconButton>
            <InfoOutlinedIcon sx={{ color: "black" }} />
          </IconButton>
        </Box>
      </Container>
    </AppBar>
  );
}
export default Chatbar;
