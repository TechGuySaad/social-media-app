import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import CommentIcon from "@mui/icons-material/Comment";

export default function CardComponent({ post }) {
  const imgPath = `http://localhost:8000${post?.mediaUrl}`;
  // console.log(post);
  return (
    <Card
      sx={{
        maxWidth: "675px",
        // minHeight: "740px",
        minHeight: post?.mediaUrl ? "740px" : "fit-content",
        width: "100%", // Ensures it can grow to m
        border: "1px solid #eaeaea",
        padding: "0px 10px",
      }}
      elevation={0}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {post.firstName[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${post.firstName} ${post.lastName}`}
        subheader="2h"
      />

      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {post?.content}
        </Typography>
      </CardContent>
      {post?.mediaUrl && (
        <CardMedia component="img" height="542" image={imgPath} alt="Web Dev" />
      )}
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton>
          <CommentIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
