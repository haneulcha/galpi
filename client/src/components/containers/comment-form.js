import React, { useState } from "react";

import axios from "axios";

const CommentForm = ({ uuid, setComments, comments }) => {
  const [comment, setComment] = useState("");

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:5000/api/comment/${uuid}`;
    console.log("comment", comment);
    try {
      const res = await axios.post(url, { comment });
      const { status, data } = res;
      console.log("res data", data);
      if (status === 200) {
        setComments([...comments, data.savedComment]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  return (
    <form className="comment-form">
      <input placeholder="댓글 달기" value={comment} onChange={handleComment} />
      <button onClick={handleCommentSubmit}>게시</button>
    </form>
  );
};

export default CommentForm;
