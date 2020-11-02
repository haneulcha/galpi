import React from "react";
import PostInfiniteScroll from "../../containers/infinite-scroll";
import PostCard from "../../containers/post-card";

const Home = (params) => {
  return (
    <>
      <PostInfiniteScroll Component={PostCard} />
    </>
  );
};

export default Home;
