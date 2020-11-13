import React from "react";
import { Redirect } from "react-router-dom";

const PostThumbnail = ({ index, posts }) => {
  const { uuid, url, user } = posts;
  const { username } = user;
  const postHandler = (e) => {
    e.preventDefault();
    return <Redirect push to={`/p/${uuid}`} />;
  };

  return (
    <li
      key={`postthumbnail-${index}-by${username}`}
      className="post-thumbnail"
      onClick={postHandler}
    >
      <div className="post">
        <img alt="example" src={url} />
      </div>
    </li>
  );
};

export default PostThumbnail;
