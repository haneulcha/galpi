import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CommentForm from "./comment-form";
import FetchComments from "./comments";
import Likes from "./likes";
import "./post-card.css";
import { TagsOutlined, TagsFilled, ZoomInOutlined } from "@ant-design/icons";
import DeleteAPost from "./post-delete";

const PostCard = ({ index, posts }) => {
  const { uuid, likes, content, url, user, createdAt } = posts;
  const { username } = user;
  const userId = useSelector((state) => state.user.userId);

  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState([]);

  const contentStyle = {
    display: showComment ? "none" : "inherit",
  };

  const CommentToggle = (params) => {
    return (
      <div onClick={() => setShowComment(!showComment)}>
        {!showComment ? (
          <TagsOutlined key="comment" />
        ) : (
          <TagsFilled key="comment" />
        )}

        <span>댓글</span>
      </div>
    );
  };

  return (
    <li key={`postcard-${index}-by${username}`} className="postcard">
      <h1 className="user">
        <Link to={`/username/${username}`}>{username}</Link>
      </h1>
      <div className="post">
        <img alt={`${username}'s post`} src={url} />
      </div>

      <p className="content" style={contentStyle}>
        {content}
      </p>
      <div className="date">
        <p>{createdAt.slice(0, 10)}</p>
      </div>
      <ul className="features">
        <li>
          <Likes likes={likes} uuid={uuid} />
        </li>
        <li>
          <CommentToggle />
        </li>
        <li>
          <Link to={`/p/${uuid}`}>
            <ZoomInOutlined key="link" />
          </Link>
        </li>
        {userId === user._id && (
          <li>
            <DeleteAPost uuid={uuid} />
          </li>
        )}
      </ul>

      {showComment && (
        <FetchComments
          uuid={uuid}
          comments={comments}
          setComments={setComments}
        />
      )}

      <CommentForm
        uuid={uuid}
        comments={comments}
        setComments={setComments}
        setShowComment={setShowComment}
      />
    </li>
  );
};

export default PostCard;
