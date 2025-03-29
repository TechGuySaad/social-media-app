import React from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import Chatbar from "./Chatbar";
import ChatBubble from "./ChatBubble";

const Conversation = () => {
  return (
    <Box
      sx={{
        height: "85vh",
        maxWidth: 1000,
        bgcolor: "#fafafa",
        borderRadius: 2,
        p: 2,
        display: "flex",
        flexDirection: "column",
        border: "1px solid #e5e5e5",
      }}
    >
      {/* Chat Header */}
      <Chatbar />

      {/* Chat Messages Section - Consistent spacing */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          px: 1,
          mb: 1,
          "& > *": {
            marginTop: "4px !important", // Consistent top margin
            marginBottom: "4px !important", // Consistent bottom margin
          },
        }}
      >
        {/* Additional bubbles - all will have consistent spacing */}
        <ChatBubble isSender={true} />
        <ChatBubble isSender={false} />
        <ChatBubble isSender={true} />
        <ChatBubble />
        <ChatBubble isSender={true} />
        <ChatBubble />
        <ChatBubble isSender={true} />
        <ChatBubble />
        <ChatBubble isSender={true} />
        <ChatBubble />
        <ChatBubble isSender={true} />
        <ChatBubble />
        <ChatBubble isSender={true} />
        <ChatBubble />
        <ChatBubble isSender={true} />
        <ChatBubble />
        <ChatBubble isSender={true} />
        <ChatBubble />
        <ChatBubble isSender={true} />
        <ChatBubble />
        <ChatBubble isSender={true} />
        <ChatBubble />
      </Box>

      {/* Chat Input Section */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          pt: 2,
          borderTop: "1px solid #e5e5e5",
          flexShrink: 0,
        }}
      >
        <TextField
          id="outlined-multiline-flexible"
          label="Type a message"
          multiline
          maxRows={4}
          sx={{ flex: 1 }}
        />
        <Button variant="contained" sx={{ backgroundColor: "black" }}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Conversation;
