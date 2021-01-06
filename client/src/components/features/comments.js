import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { getComment, deleteComment } from "../../_actions/comment_action";
import { errorHandle } from "../../_actions/error_actions";

const FetchComments = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);
  const { uuid, comments, setComments } = props;
  const [loading, setLoading] = useState(false);

  const deleteAComment = async (event) => {
    event.preventDefault();
    const li = event.target.parentElement;

    try {
      await dispatch(deleteComment(li.id));
      let filteredComment = comments.filter((item) => item._id !== li.id);
      setComments([...filteredComment]);
      alert("댓글이 삭제되었습니다");
    } catch (e) {
      dispatch(errorHandle(e.response));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await dispatch(getComment(uuid));
        const { comments, message } = response.payload;
        if (message === "ok") {
          setComments(comments);
          setLoading(false);
        }
      } catch (e) {
        dispatch(errorHandle(e.response));
      }
    };
    fetchData();
  }, [setComments, dispatch, uuid]);

  return (
    <>
      {loading && <LoadingOutlined />}
      {comments ? (
        <ul className="comments-list">
          {comments.map((comment, index) => (
            <li key={index} id={comment._id}>
              <strong>{comment.user.username}</strong>
              {` ${comment.comment}`}
              {userId === comment.user._id && (
                <button onClick={deleteAComment}>×</button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <span>첫 댓글을 달아보세요</span>
      )}
    </>
  );
};

export default FetchComments;
