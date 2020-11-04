import React from "react";
import { Redirect } from "react-router-dom";
import { Card } from "antd";

const { Meta } = Card;

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
      <Card
        hoverable
        className="postthumbnail-image"
        style={{ width: 240 }}
        cover={<img src={url} alt={`post-by${username}`} />}
      >
        <Meta title={username} />
      </Card>
    </li>
  );
};

export default PostThumbnail;
