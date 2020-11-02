import React from "react";
import { Redirect } from "react-router-dom";

const PostThumbnail = ({ index, posts }) => {
  const postHandler = (e) => {
    e.preventDefault();
    return <Redirect push to={`/p/${posts.uuid}`} />;
  };

  return (
    <li key={`post-${index}`} className="postthumbnail">
      <div className="postthumbnail-image" onClick={postHandler}>
        <img src={posts.url} alt={posts.user} />
      </div>
    </li>
  );
};

export default PostThumbnail;
