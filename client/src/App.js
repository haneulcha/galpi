import React from "react";
import Post from "./components/views/PostPage/post";
import Home from "./components/views/LandingPage/landing";
import { Router, Link } from "@reach/router";

function App() {
  return (
    <Router>
      <Home path="/" />
      <Post path="/post" />
    </Router>
  );
}

export default App;
