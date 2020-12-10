import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postComment } from "../../_actions/comment_action";
import { errorHandle } from "../../_actions/error_actions";

const CommentForm = ({
  uuid,
  setComments,
  comments,
  setShowComment = null,
}) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    let data = {
      comment,
    };
    try {
      const response = await dispatch(postComment(uuid, data));
      const { newComment, message } = response.payload;

      if (message === "ok") {
        setComments([...comments, newComment]);
        if (setShowComment) setShowComment(true);
      }
    } catch (e) {
      dispatch(errorHandle(e.response));
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
