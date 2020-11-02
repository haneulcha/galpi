import React from "react";
import { Card } from "antd";

const { Meta } = Card;

const Posts = ({ posts }) => {
  return (
    <>
      {posts.map((e) => {
        const url = e.imgurl;
        const createdAt = e.createdAt;
        return (
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={url} />}
          >
            <Meta title={createdAt} />
          </Card>
        );
      })}
    </>
  );
};

export default Posts;
