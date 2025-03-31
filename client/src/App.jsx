import "./App.css";
import Home from "./pages/Home/Home";
import Chat from "./pages/Chat/Chat";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const [user, setUser] = useState({});
  return (
    <>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/chat" element={<Chat />} />
        <Route
          path="/login"
          element={<Login user={user} setUser={setUser} />}
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
