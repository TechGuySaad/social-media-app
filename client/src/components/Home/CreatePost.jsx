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
import axios from "axios";
import { useState, useRef } from "react";

export default function CreatePost({ newPost, setNewPost, user }) {
  const [postContent, setPostContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handlePictureButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleChange = (event) => {
    setPostContent(event.target.value);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!postContent.trim()) {
      setError("Post content cannot be empty");
      return;
    }

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("content", postContent);

      if (selectedFile) {
        formData.append("media", selectedFile);
      }

      const response = await axios.post(
        "http://localhost:8000/api/posts/",
        formData,
        {
          headers: {
            Authorization: await localStorage.getItem("authToken"),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setNewPost(response?.data?.newPost);
      setPostContent("");
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset file input
      }
    } catch (err) {
      console.error("Error creating post:", err);
      setError(
        err.response?.data?.message ||
          "Failed to create post. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: "675px",
        width: "100%",
        border: "2px solid #eaeaea",
        padding: "10px",
        minHeight: 168,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        margin: "0 auto",
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
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
              src={`http://localhost:8000${user.pfp}`}
            />
          }
        />
        <TextField
          id="post-content"
          label="What's on your mind?"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={postContent}
          onChange={handleChange}
          error={!!error}
          helperText={error}
          sx={{
            "& .MuiInputLabel-root": {
              color: "black",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "0",
              },
              "&:hover fieldset": {
                borderColor: "grey.500",
              },
              "&.Mui-focused fieldset": {
                borderColor: "black",
              },
            },
            "& .MuiInputBase-input": {
              color: "black",
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
        <div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="image/*,video/*"
          />
          <Button
            onClick={handlePictureButtonClick}
            sx={{
              "&:hover": {
                color: "black",
              },
            }}
            startIcon={<PhotoOutlinedIcon />}
          >
            Photo
          </Button>
          {selectedFile && (
            <span style={{ marginLeft: "10px" }}>
              {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
            </span>
          )}
        </div>

        <Button
          variant="contained"
          sx={{ backgroundColor: "black" }}
          onClick={handleSubmit}
          disabled={!postContent || isLoading}
        >
          {isLoading ? "Posting..." : "Post"}
        </Button>
      </CardActions>
    </Card>
  );
}
