import React, { useState, useEffect } from "react";
import { PushpinFilled, PushpinOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { postLike, postUnlike } from "../../_actions/like_action";

const Likes = ({ likes, uuid }) => {
  const loggedInUser = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [likesArray, setLikesArray] = useState([...likes]);
  const [showLikes, setShowLikes] = useState(false);

  const handleLike = async (e) => {
    e.preventDefault();
    try {
      await dispatch(postLike(uuid)).then((res) => {
        console.log(res.payload);
        console.log("like done");
      });
    } catch (e) {
      console.error(e);
    }

    setLikesArray([...likesArray, loggedInUser.userId]);

    setShowLikes(true);

    return;
  };

  const handleUnlike = async (e) => {
    e.preventDefault();
    try {
      await dispatch(postUnlike(uuid)).then((res) => {
        console.log(res.payload);
        console.log("like done");
      });
    } catch (e) {
      console.error(e);
    }

    const filteredLikes = likesArray.filter((id) => id !== loggedInUser.userId);
    setLikesArray([...filteredLikes]);
    setShowLikes(false);

    return;
  };

  useEffect(() => {
    if (likes.includes(loggedInUser.userId)) {
      console.log("user already liked");
      setShowLikes(true);
    }
  }, [likes, loggedInUser.userId]);

  return (
    <div className="likes">
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
