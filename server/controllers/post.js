const postsModel = require("../models/posts");
const likeModel = require("../models/likes");
const commentModel = require("../models/comment");
const userModel = require("../models/user");
const followModel = require("../models/follows");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

async function handleCreatePost(req, res) {
  try {
    const { content } = req.body;
    const { userId, firstName, lastName } = req.user;
    const mediaFile = req.file;

    // Validate required fields
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // At least content or media file must be provided
    if (!content && !mediaFile) {
      return res.status(400).json({
        success: false,
        message: "Either content or a media file is required",
      });
    }

    // Prepare post data
    const postData = {
      userId,
      firstName,
      lastName,
      content: content || "",
    };

    // Handle media file if present
    if (mediaFile) {
      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "video/mp4",
      ];
      if (!allowedTypes.includes(mediaFile.mimetype)) {
        // Remove the uploaded file since it's invalid
        fs.unlinkSync(mediaFile.path);
        return res.status(400).json({
          success: false,
          message: "Only JPEG, PNG, GIF images and MP4 videos are allowed",
        });
      }

      postData.mediaUrl = `/uploads/posts/${mediaFile.filename}`;
      postData.mediaType = mediaFile.mimetype.startsWith("image")
        ? "image"
        : "video";
    }

    // Create post in database
    const newPost = await postsModel.create(postData);

    // Return success response
    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: {
        ...newPost.toObject(),
        fullMediaUrl: newPost.mediaUrl
          ? `${req.protocol}://${req.get("host")}${newPost.mediaUrl}`
          : null,
      },
    });
  } catch (error) {
    console.error("Error creating post:", error);

    // Clean up uploaded file if an error occurred
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }

    // Handle multer errors
    if (error instanceof multer.MulterError) {
      return res.status(error.code === "LIMIT_FILE_SIZE" ? 413 : 400).json({
        success: false,
        message:
          error.code === "LIMIT_FILE_SIZE"
            ? "File too large. Maximum size is 25MB"
            : "File upload error",
        error: error.message,
      });
    }

    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: error.message,
      });
    }

    // Handle other errors
    return res.status(500).json({
      success: false,
      message: "Internal server error while creating post",
      error: error.message,
    });
  }
}

// Get all posts of a user
async function handleGetPosts(req, res) {
  try {
    const userId = req?.user?.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const followingIds = await followModel.distinct("followingId", {
      followerId: userId,
    });

    const targetUserIds = [userId, ...followingIds];
    const posts = await postsModel
      .find({
        userId: { $in: targetUserIds },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Successfully retrieved posts",

      posts,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving posts", error: error.message });
  }
}

// Get a single post
async function handleGetPost(req, res) {
  try {
    const postId = req?.params?.postId;
    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    const post = await postsModel.findOne({ _id: postId });
    if (!post) return res.status(404).json({ message: "Post not found" });

    return res.status(200).json({ message: "Successfully fetched post", post });
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving post", error });
  }
}

// Edit a Post
async function handleEditPost(req, res) {
  try {
    const postId = req?.params?.postId;
    const { content } = req?.body;

    if (!postId || !content) {
      return res
        .status(400)
        .json({ message: "Post ID and content are required" });
    }

    const editedPost = await postsModel.findOneAndUpdate(
      { _id: postId },
      { content },
      { new: true }
    );

    if (!editedPost) return res.status(404).json({ message: "Post not found" });

    return res
      .status(200)
      .json({ message: "Successfully edited post", editedPost });
  } catch (error) {
    return res.status(500).json({ message: "Error editing post", error });
  }
}

// Delete a Post
async function handleDeletePost(req, res) {
  try {
    const postId = req?.params?.postId;
    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    const deletedPost = await postsModel.findOneAndDelete({ _id: postId });

    if (!deletedPost)
      return res.status(404).json({ message: "Post not found" });

    return res.status(200).json({ message: "Successfully deleted the post" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting post", error });
  }
}

// Like a Post
async function handleLikePost(req, res) {
  try {
    const userId = req?.user?.userId;
    const postId = req?.params?.postId;

    if (!userId || !postId) {
      return res
        .status(400)
        .json({ message: "User ID and Post ID are required" });
    }

    await likeModel.create({ userId, postId });

    const countLikes = await likeModel.countDocuments({ postId });

    const updatedPost = await postsModel.findOneAndUpdate(
      { _id: postId },
      { likesCount: countLikes },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Successfully liked post", updatedPost });
  } catch (error) {
    return res.status(500).json({ message: "Error liking post", error });
  }
}

// Unlike a Post
async function handleUnlikePost(req, res) {
  try {
    const userId = req?.user?.userId;
    const postId = req?.params?.postId;

    if (!userId || !postId) {
      return res
        .status(400)
        .json({ message: "User ID and Post ID are required" });
    }

    const deletedLike = await likeModel.findOneAndDelete({ postId, userId });

    if (!deletedLike)
      return res.status(404).json({ message: "Like not found" });

    const countLikes = await likeModel.countDocuments({ postId });

    const updatedPost = await postsModel.findOneAndUpdate(
      { _id: postId },
      { likesCount: countLikes },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Successfully unliked post", updatedPost });
  } catch (error) {
    return res.status(500).json({ message: "Error unliking post", error });
  }
}

// Get all Likes on a Post
async function handleGetAllLikes(req, res) {
  try {
    const postId = req?.params?.postId;
    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    const likes = await likeModel.find({ postId });

    return res
      .status(200)
      .json({ message: "Successfully fetched likes", likes });
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving likes", error });
  }
}

// Add a Comment
async function handleAddComment(req, res) {
  try {
    const userId = req?.user?.userId;
    const postId = req?.params?.postId;
    const { content } = req?.body;

    if (!userId || !postId || !content) {
      return res
        .status(400)
        .json({ message: "User ID, Post ID, and content are required" });
    }

    const comment = await commentModel.create({ userId, postId, content });

    return res
      .status(201)
      .json({ message: "Successfully added comment", comment });
  } catch (error) {
    return res.status(500).json({ message: "Error adding comment", error });
  }
}

// Get all Comments on a Post
async function handleGetComments(req, res) {
  try {
    const postId = req?.params?.postId;
    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    const allComments = await commentModel.find({ postId });

    return res
      .status(200)
      .json({ message: "Successfully retrieved comments", allComments });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving comments", error });
  }
}

// Delete a Comment
async function handleDeleteComment(req, res) {
  try {
    const userId = req?.user?.userId;
    const postId = req?.params?.postId;
    const commentId = req?.params?.commentId;

    if (!userId || !postId || !commentId) {
      return res
        .status(400)
        .json({ message: "User ID, Post ID, and Comment ID are required" });
    }

    const deletedComment = await commentModel.findOneAndDelete({
      _id: commentId,
      postId,
      userId,
    });

    if (!deletedComment)
      return res.status(404).json({ message: "Comment not found" });

    return res
      .status(200)
      .json({ message: "Successfully deleted comment", deletedComment });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting comment", error });
  }
}

module.exports = {
  handleCreatePost,
  handleEditPost,
  handleDeletePost,
  handleLikePost,
  handleUnlikePost,
  handleAddComment,
  handleDeleteComment,
  handleGetPosts,
  handleGetPost,
  handleGetComments,
  handleGetAllLikes,
};
