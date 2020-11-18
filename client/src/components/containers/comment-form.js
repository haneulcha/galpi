import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postComment } from "../../_actions/comment_action";

const CommentForm = ({ uuid, setComments, comments }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await dispatch(postComment(uuid, { comment }));
      const { status, data } = res;

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
      <button onClick={handleCommentSubmit}>↑</button>
    </form>
  );
};

export default CommentForm;
