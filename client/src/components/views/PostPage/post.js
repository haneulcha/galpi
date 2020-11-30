import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAPost } from "../../../_actions/post_action";
import Likes from "../../containers/likes";
import CommentForm from "../../containers/comment-form";
import FetchComments from "../../containers/comments";
import { errorHandle } from "../../../_actions/error_actions";

const Post = () => {
  const dispatch = useDispatch();
  const { uuid } = useParams();
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await dispatch(getAPost(uuid));
        setPost(response.payload.post);
      } catch (e) {
        dispatch(errorHandle(e));
      }
    }
    fetchData();
  }, [uuid, dispatch]);

  return (
    <div className="body-wrapper">
      {post && (
        <section className="a-post">
          <div className="user">
            <Link to={`/username/${post.user.username}`}>
              {post.user.username}
            </Link>
          </div>

          <div className="image">
            <img src={post.url} alt={`${post.user.username}의 포스팅`} />
          </div>

          <div className="content">
            <p>{post.content}</p>
          </div>

          <Likes likes={post.likes} uuid={post.uuid} />

          {comments && (
            <FetchComments
              uuid={uuid}
              comments={comments}
              setComments={setComments}
            />
          )}
          <CommentForm
            uuid={uuid}
            comments={comments}
            setComments={setComments}
          />
        </section>
      )}
    </div>
  );
};

export default Post;
