import React from "react";
import Conversation from "../../components/Chat/Conversation";
import ChatList from "../../components/Chat/ChatList";
import "./styles/style.css";

const Chat = () => {
  return (
    <div className="chat">
      <ChatList />
      <Conversation />
    </div>
  );
};

export default Chat;
