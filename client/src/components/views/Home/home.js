import React from "react";
import PostInfiniteScroll from "../../containers/infinite-scroll";
import PostCard from "../../containers/post-card";

const Home = (params) => {
  return (
    <>
      <PostInfiniteScroll
        render={(posts, index) => (
          <PostCard key={`post-${index}`} posts={posts} index={index} />
        )}
      />
    </>
  );
};

export default Home;
