import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { getComment, deleteComment } from "../../_actions/comment_action";

const FetchComments = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const { uuid, comments, setComments } = props;
  const [loading, setLoading] = useState(false);

  const deleteAComment = async (e) => {
    e.preventDefault();
    const li = e.target.parentElement;

    try {
      await dispatch(deleteComment(li.id)).then((res) => {
        console.log(res.payload);
        console.log("댓글이 삭제되었습니다");
      });
    } catch (e) {
      console.error(e);
    }
  };

  const fetchComment = useCallback(
    async (uuid) => {
      setLoading(true);
      try {
        const res = await dispatch(getComment(uuid));
        const { payload } = res;
        setLoading(false);
        return payload;
      } catch (e) {
        setLoading(false);
        return e;
      }
    },
    [setLoading, dispatch]
  );

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const newComments = await fetchComment(uuid);
        const { comments, message } = newComments;
        if (message === "success") {
          setComments(comments);
          setLoading(false);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [fetchComment, setComments, setLoading, uuid]);

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
                <button onClick={deleteAComment}>⨉</button>
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
