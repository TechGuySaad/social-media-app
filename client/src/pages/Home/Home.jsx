import React from "react";
import CardComponent from "../../components/Home/CardComponent";
import CreatePost from "../../components/Home/CreatePost";
import Sidebar from "../../components/Home/Sidebar";
import Suggestions from "../../components/Home/Suggestions";
import "./styles/style.css";
import { useEffect, useState } from "react";
import axios from "axios";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/posts/", {
          headers: {
            Authorization: await localStorage.getItem("authToken"),
          },
        });
        setPosts(response?.data.posts);
      } catch (error) {
        console.log(error.message);
      }
    };
    getAllPosts();
  }, [newPost]);

  return (
    <div className="">
      <div className="home-container">
        <Sidebar />
        <div className="posts">
          <CreatePost newPost={newPost} setNewPost={setNewPost} />
          {posts.map((post) => {
            return <CardComponent key={post._id} post={post} />;
          })}
        </div>
        <Suggestions />
      </div>
    </div>
  );
};

export default Home;
