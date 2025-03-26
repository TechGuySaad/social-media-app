import React from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import Chatbar from "./Chatbar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Conversation = () => {
  return (
    <Box
      sx={{
        height: 945,
        maxWidth: 1000,
        bgcolor: "#fafafa",
        borderRadius: 2,
        p: 2,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 1,
        border: "1px solid #e5e5e5",
      }}
    >
      <Chatbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Sender's bubble */}

        <Box
          sx={{
            maxWidth: "70%",
            p: 1.5,
            bgcolor: "primary.main",
            color: "white",
            borderRadius: 4,
            borderBottomRightRadius: 0,
            alignSelf: "flex-end",
          }}
        >
          <Typography>Hey, how’s the project going?</Typography>
        </Box>

        {/* Receiver's bubble */}
        <Box
          sx={{
            maxWidth: "70%",
            p: 1.5,
            bgcolor: "grey.300",
            borderRadius: 4,
            borderBottomLeftRadius: 0,
          }}
        >
          <Typography>Almost done! Will share updates soon.</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          columnGap: "10px",
          borderTop: "1px solid #e5e5e5",
          padding: "15px",
        }}
      >
        <TextField
          id="outlined-multiline-flexible"
          label="Type a message"
          multiline
          maxRows={4}
          sx={{ width: "100%" }}
        />

        <Button variant="contained" sx={{ backgroundColor: "black" }}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Conversation;
