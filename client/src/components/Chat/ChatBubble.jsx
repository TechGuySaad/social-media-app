import React from "react";
import { Box, Typography } from "@mui/material";

const ChatBubble = ({ message, isSender }) => {
  return (
    <Box
      sx={{
        maxWidth: "75%",
        p: 1.5,
        bgcolor: isSender ? "primary.main" : "black", // Different colors
        color: "white",
        borderRadius: 2,
        // Distinct border radius for each type
        borderBottomRightRadius: isSender ? 0 : 8,
        borderBottomLeftRadius: isSender ? 8 : 0,
        // Consistent top corners
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        alignSelf: isSender ? "flex-end" : "flex-start",
        mb: 1,
        boxShadow: 1,
        position: "relative",
      }}
    >
      <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
        {message ||
          (isSender
            ? "Hey, how's the project going?"
            : "Almost done! Will share updates soon.")}
      </Typography>
    </Box>
  );
};

export default ChatBubble;
