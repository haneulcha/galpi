import React, { useState } from "react";
import axios from "axios";

const CommentForm = ({ uuid, setComments, comments }) => {
  const [comment, setComment] = useState();
  const handleCommentSubmit = async () => {
    const url = `http://localhost:5000/api/comment/${uuid}`;
    try {
      const res = await axios.post(url, comment);
      const { status, data } = res;
      if (status === 200) {
        setComments([...comments, data.savedComment]);
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <form onSubmit={handleCommentSubmit}>
      <input
        placeholder="댓글 달기"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit" disabled={comment ? true : false}>
        게시
      </button>
    </form>
  );
};

export default CommentForm;
