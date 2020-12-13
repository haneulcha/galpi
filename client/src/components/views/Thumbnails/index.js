import React from "react";
import PostInfiniteScroll from "../../containers/infinite-scroll";
import PostThumbnail from "../../containers/post-thumbnail";

const Thumbnails = (params) => {
  return (
    <div className="thumbnails">
      <h1 className="page-title">방금 갈피된 문장들</h1>
      <div className="notice">
        <span role="img" aria-label="notice to login">
          👀
        </span>
        로그인 하면 직접 포스팅을 하거나
        <br /> 다른 갈피에 댓글을 달 수 있어요
      </div>
      <PostInfiniteScroll
        render={(posts, index) => (
          <PostThumbnail key={`post-${index}`} posts={posts} index={index} />
        )}
      />
    </div>
  );
};

export default Thumbnails;
