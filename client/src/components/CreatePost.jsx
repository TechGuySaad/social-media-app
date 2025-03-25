import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";

export default function CreatePost() {
  return (
    <Card
      sx={{
        maxWidth: 575,
        border: "2px solid #eaeaea",
        padding: "10px",
        height: 168,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      elevation={0}
    >
      <Box
        sx={{
          display: "flex",
          justifyItems: "start",
          alignItems: "start",
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              A
            </Avatar>
          }
        />
        <TextField
          id="outlined-basic"
          label="What's on your mind?"
          variant="outlined"
          fullWidth
          multiline // Enables multiline (textarea-like)
          rows={3} // Sets default visible rows (controls height)
          sx={{
            // Customize the label color (black by default, but explicitly set for consistency)
            "& .MuiInputLabel-root": {
              color: "black", // Label text color (default state)
            },
            // Customize the border on focus (from previous solution)
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "0",
                // borderColor: "grey.300", // Default border
              },
              "&:hover fieldset": {
                borderColor: "grey.500", // Hover border (optional)
              },
              "&.Mui-focused fieldset": {
                borderColor: "black", // Focused border
              },
            },
            // Optional: Ensure the input text is also black
            "& .MuiInputBase-input": {
              color: "black", // Text color inside the input
            },
          }}
        />
      </Box>

      <CardActions
        disableSpacing
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          sx={{
            "&:hover": {
              color: "black", // Optional: Change text color to white
            },
          }}
          startIcon={<PhotoOutlinedIcon />}
        >
          Photo
        </Button>

        <Button variant="contained" sx={{ backgroundColor: "black" }}>
          Post
        </Button>
      </CardActions>
    </Card>
  );
}
