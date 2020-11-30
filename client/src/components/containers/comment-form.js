import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postComment } from "../../_actions/comment_action";
import { errorHandle } from "../../_actions/error_actions";

const CommentForm = ({ uuid, setComments, comments }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(postComment(uuid, { comment }));
      const { newComment, message } = response.payload;

      if (message === "ok") {
        setComments([...comments, newComment]);
      }
    } catch (e) {
      dispatch(errorHandle(e));
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
