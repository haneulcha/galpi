import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "../../_actions/post_action";

// GET posts
const PostInfiniteScroll = (props) => {
  const { username = null } = props;
  const dispatch = useDispatch();
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
      setLoading(true);
      try {
        let { status, data } = await dispatch(getPosts(pageNum, username)).then(
          (res) => res.payload
        );
        console.log("fetch data", status);
        console.log("fetch data", data);
        setLoading(false);
        return { status, data };
      } catch (e) {
        setLoading(false);
        return e;
      }
    },
    [username, dispatch]
  );

  const handleInitial = useCallback(
    async (page) => {
      const { status, data } = await fetchData(page);
      if (status === 200) {
        setPosts((posts) => [...posts, ...data.posts.values()]);
      }
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
      {posts ? (
        <ul className="posts-list">
          {posts.map((posts, index) => props.render(posts, index))}
        </ul>
      ) : (
        <p> 마지막 포스트 입니다 ! </p>
      )}

      {loading && <div>Loading...</div>}
      <div ref={setElement} />
    </div>
  );
};

export default PostInfiniteScroll;
