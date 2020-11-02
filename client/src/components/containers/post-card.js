import React, { useState } from "react";
import { Link } from "react-router-dom";
import CommentForm from "./comment-form";
import FetchComments from "./fetch-comments";

const PostCard = ({ index, posts }) => {
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <li key={index} className="postcard">
      <div className="postcard-image">
        <img src={posts.url} alt={posts.user} />
      </div>
      <div className="postcard-user">
        <Link to={`/username/${posts.user}`}>{posts.user}</Link>
      </div>
      <div className="postcard-content">
        <h3>{posts.likeCount}</h3>
        <p>{posts.content}</p>
      </div>
      <div className="postcard-comments">
        {comments && (
          <span onClick={() => setShowComment(!showComment)}>댓글</span>
        )}
        {loading ? <div>loading...</div> : null}
        {showComment && (
          <FetchComments
            uuid={posts.uuid}
            setLoading={setLoading}
            comments={comments}
            setComments={setComments}
          />
        )}
        <CommentForm
          uuid={posts.uuid}
          comments={comments}
          setComments={setComments}
        />
      </div>
    </li>
  );
};

export default PostCard;
