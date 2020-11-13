import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

// GET posts
const PostInfiniteScroll = ({ username = null, Component }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [element, setElement] = useState(null);
  const page = useRef(1);
  const prevY = useRef(0);

  const loadMore = () => {
    page.current++;
    handleInitial(page.current);
  };

  // intersectionObserver setting
  const observerCallback = (entries) => {
    const firstEntry = entries[0];
    const y = firstEntry.boundingClientRect.y;

    if (prevY.current > y) {
      loadMore();
    }
    prevY.current = y;
  };

  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  };

  const observer = useRef(new IntersectionObserver(observerCallback, options));

  // data fetching
  const fetchData = useCallback(
    async (pageNum) => {
      let url;

      if (!username) {
        url = `http://localhost:5050/api/post?&page=${pageNum}&limit=10`;
      } else {
        url = `http://localhost:5050/api/post?username=${username}page=${pageNum}&limit=10`;
      }

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
    [username]
  );

  const handleInitial = useCallback(
    async (page) => {
      const newPosts = await fetchData(page);
      const { status, data } = newPosts;
      if (status === 200) setPosts((images) => [...images, ...data.posts]);
    },
    [fetchData]
  );

  useEffect(() => {
    handleInitial(page.current);

    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [handleInitial, element]);

  return (
    <div className="infinite-scroll-wrapper">
      {posts && (
        <ul className="posts-list">
          {posts.map((posts, index) => (
            <Component key={`post-${index}`} index={index} posts={posts} />
          ))}
        </ul>
      )}

      {loading && <div>Loading...</div>}
      <div ref={setElement} />
    </div>
  );
};

export default PostInfiniteScroll;
