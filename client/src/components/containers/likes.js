import React, { useState, useEffect } from "react";
import { PushpinFilled, PushpinOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { postLike, postUnlike } from "../../_actions/like_action";
import { errorHandle } from "../../_actions/error_actions";

const Likes = ({ likes, uuid }) => {
  const loggedInUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [likesArray, setLikesArray] = useState([...likes]);
  const [showLikes, setShowLikes] = useState(false);

  const handleLike = async (e) => {
    e.preventDefault();
    try {
      await dispatch(postLike(uuid));
      setLikesArray([...likesArray, loggedInUser.userId]);
      setShowLikes(true);
    } catch (e) {
      dispatch(errorHandle(e));
    }
  };

  const handleUnlike = async (e) => {
    e.preventDefault();
    try {
      await dispatch(postUnlike(uuid));
      let filteredLikes = likesArray.filter((id) => id !== loggedInUser.userId);
      setLikesArray([...filteredLikes]);
      setShowLikes(false);
    } catch (e) {
      dispatch(errorHandle(e));
    }
  };

  useEffect(() => {
    if (likes.includes(loggedInUser.userId)) {
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
