import React from "react";
import { useHistory } from "react-router-dom";

const PostThumbnail = ({ index, posts }) => {
  const { uuid, url, user, content, createdAt } = posts;
  const { username } = user;
  const history = useHistory();
  const postHandler = () => {
    return history.push(`/p/${uuid}`);
  };

  return (
    <li
      key={`postthumbnail-${index}-by${username}`}
      className="post-thumbnail-li"
      onClick={postHandler}
    >
      <div className="post">
        <img alt={`${username}'s post`} src={url} />
      </div>
      <div className="info">
        <h2>{username}</h2>
        <p>{content}</p>

        <p className="date">{createdAt.slice(0, 10)}</p>
      </div>
    </li>
  );
};

export default PostThumbnail;
