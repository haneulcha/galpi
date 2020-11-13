import React, { useState } from "react";
import { Link } from "react-router-dom";
import CommentForm from "./comment-form";
import FetchComments from "./fetch-comments";
import Likes from "./likes";
import "./post-card.css";
import { TagsOutlined, TagsFilled, ZoomInOutlined } from "@ant-design/icons";

const PostCard = ({ index, posts }) => {
  const { uuid, likes, content, url, user } = posts;
  const { username } = user;

  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState([]);

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
      <h1 className="user">{username}</h1>
      <div className="post">
        <img alt="example" src={url} />
      </div>

      <p className="content">{content}</p>
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
      </ul>
      <div className="comments">
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
        />
      </div>
    </li>
  );
};

export default PostCard;
