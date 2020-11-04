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
      <div className="postcard-wrapper">
        <div className="postcard-image">
          <img alt="example" src={url} />
        </div>

        <div className="postcard-image-info">책정보</div>
      </div>
      <div className="postcard-wrapper">
        <div className="postcard-user">{username}</div>
        <div className="postcard-content">{content}</div>
        <div className="postcard-features">
          {
            <>
              <Likes likes={likes} uuid={uuid} />
              <CommentToggle />
              <Link to={`/p/${uuid}`}>
                <ZoomInOutlined key="link" />
              </Link>
            </>
          }
        </div>
        <div className="postcard-comments">
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
      </div>
    </li>
  );
};

export default PostCard;
