import React, { useState } from "react";
import {
  BarsOutlined,
  AppstoreOutlined,
  ToTopOutlined,
} from "@ant-design/icons";
import PostInfiniteScroll from "../../containers/infinite-scroll";
import PostCard from "../../containers/post-card";
import PostThumbnail from "../../containers/post-thumbnail";

const Home = (params) => {
  const [view, setView] = useState("wide");

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="home">
      <div className="view-option">
        <BarsOutlined onClick={() => setView("wide")} />
        <AppstoreOutlined onClick={() => setView("thumbnail")} />
        <ToTopOutlined onClick={scrollToTop} />
      </div>
      <PostInfiniteScroll
        view={view}
        render={
          view === "wide"
            ? (posts, index) => (
                <PostCard
                  key={`postcard-${index}`}
                  posts={posts}
                  index={index}
                />
              )
            : (posts, index) => (
                <PostThumbnail
                  key={`postcard-${index}`}
                  posts={posts}
                  index={index}
                />
              )
        }
      />
    </div>
  );
};

export default Home;
