import React, { useEffect, useCallback } from "react";
import axios from "axios";

const FetchComments = (props) => {
  const { uuid, setLoading, comments, setComments } = props;

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
          setComments(data.comment);
          setLoading(false);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [fetchComment, setComments, setLoading, uuid]);

  return (
    <ul>
      {comments.map((comment, index) => (
        <li key={index}>
          <str>{comment.user}</str>
          {` ${comment.comment}`}
        </li>
      ))}
    </ul>
  );
};

export default FetchComments;
