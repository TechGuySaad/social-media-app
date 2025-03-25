import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import webDevImage from "../assets/images/web-dev.jpg";
import CommentIcon from "@mui/icons-material/Comment";

export default function CardComponent() {
  return (
    <Card
      sx={{ maxWidth: 575, border: "1px solid #eaeaea", padding: "0px 10px" }}
      elevation={0}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            A
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Alex Johnson"
        subheader="2h"
      />

      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Just launched my new portfolio website! Check it out and let me know
          what you think. #webdev #portfolio
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        height="542"
        image={webDevImage}
        alt="Web Dev"
      />
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
