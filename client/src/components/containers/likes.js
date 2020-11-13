import React, { useState, useEffect } from "react";
import axios from "axios";
import { PushpinFilled, PushpinOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const Likes = ({ likes, uuid }) => {
  const loggedInUser = useSelector((state) => state.auth);

  const [likesArray, setLikesArray] = useState([...likes]);
  const [showLikes, setShowLikes] = useState(false);

  const baseUrl = `http://localhost:5050/api/like/${uuid}`;

  const handleLike = async () => {
    await axios.post(`${baseUrl}/like`);
    setLikesArray([...likesArray, loggedInUser.userId]);

    setShowLikes(true);
    console.log("after liking", likesArray);
    return;
  };

  const handleUnlike = async () => {
    await axios.post(`${baseUrl}/unlike`);
    const filteredLikes = likesArray.filter((id) => id !== loggedInUser.userId);
    setLikesArray([...filteredLikes]);
    setShowLikes(false);
    console.log("after unliking", likesArray);
    return;
  };

  useEffect(() => {
    if (likes.includes(loggedInUser.userId)) {
      console.log("user already liked");
      setShowLikes(true);
    }
  }, [likes, loggedInUser.userId]);

  return (
    <div>
      {showLikes ? (
        <PushpinFilled key="likes" onClick={handleUnlike} />
      ) : (
        <PushpinOutlined key="notlikes" onClick={handleLike} />
      )}

      <span>{likesArray.length}</span>
    </div>
  );
};

export default Likes;
