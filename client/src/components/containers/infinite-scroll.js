import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { errorHandle } from "../../_actions/error_actions";
import { getPosts } from "../../_actions/post_action";
import { LoadingOutlined } from "@ant-design/icons";

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

  const handleInitial = useCallback(
    async (page) => {
      setLoading(true);
      try {
        let response = await dispatch(getPosts(page, username));
        const { posts, message } = response.payload;
        if (message === "ok") {
          setPosts((items) => [...items, ...posts]);
          setLoading(false);
        }
      } catch (e) {
        dispatch(errorHandle(e.response));
        setLoading(false);
      }
    },
    [dispatch, username]
  );

  useEffect(() => {
    handleInitial(page.current);
  }, [handleInitial]);

  useEffect(() => {
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
  }, [element]);

  return (
    <div className="infinite-scroll-wrapper">
      {posts ? (
        <>
          <ul className="posts-list">
            {posts.map((posts, index) => props.render(posts, index))}
          </ul>
        </>
      ) : (
        <p> 마지막 포스트 입니다 ! </p>
      )}
      {loading && <LoadingOutlined />}
      <div ref={(ref) => setElement(ref)} />
    </div>
  );
};

export default PostInfiniteScroll;
