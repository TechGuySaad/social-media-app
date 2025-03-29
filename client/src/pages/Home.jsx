import React from "react";
import CardComponent from "../components/Home/CardComponent";
import CreatePost from "../components/Home/CreatePost";
import Sidebar from "../components/Home/Sidebar";
import Suggestions from "../components/Home/Suggestions";
import "./styles/style.css";
const Home = () => {
  return (
    <div className="">
      <div className="home-container">
        <Sidebar />
        <div className="posts">
          <CreatePost />
          <CardComponent />
          <CardComponent />
          <CardComponent />
        </div>
        <Suggestions />
      </div>
    </div>
  );
};

export default Home;
