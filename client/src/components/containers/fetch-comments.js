import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";

const FetchComments = (props) => {
  const { uuid, comments, setComments } = props;
  const [loading, setLoading] = useState(false);

  const fetchComment = useCallback(
    async (uuid) => {
      const url = `http://localhost:5000/api/comment/${uuid}`;
      setLoading(true);
      try {
        const res = await axios.get(url);
        const { status, data } = res;
        setLoading(false);
        return { status, data };
      } catch (e) {
        setLoading(false);
        return e;
      }
    },
    [setLoading]
  );

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const newComments = await fetchComment(uuid);
        const { status, data } = newComments;
        if (status === 200) {
          setComments(data.comments);
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
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <strong>{comment.user.username}</strong>
              {` ${comment.comment}`}
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
