import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAPost } from "../../../_actions/post_action";
import { errorHandle } from "../../../_actions/error_actions";
import Likes from "../../containers/likes";
import CommentForm from "../../containers/comment-form";
import FetchComments from "../../containers/comments";
import DeleteAPost from "../../containers/post-delete";

const Post = () => {
  const { uuid } = useParams();
  const dispatch = useDispatch();
  const { loggedIn, userId } = useSelector((state) => ({
    loggedIn: state.user.loggedIn,
    userId: state.user.userId,
  }));
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await dispatch(getAPost(uuid));
        setPost(response.payload.post);
      } catch (e) {
        dispatch(errorHandle(e.response));
      }
    }
    fetchData();
  }, [uuid, dispatch]);

  return (
    <div className="body-wrapper">
      {post && (
        <section className="a-post">
          <div className="a-post-header">
            <div className="user">
              <Link to={`/user/${post.user.username}`}>
                {post.user.username}
              </Link>
            </div>
            {userId === post.user._id && (
              <div className="delete">
                <DeleteAPost uuid={uuid} />
              </div>
            )}
          </div>

          <div className="image">
            <img src={post.url} alt={`${post.user.username}의 포스팅`} />
          </div>

          <div className="content">
            <p>{post.content}</p>
          </div>
          <div className="date">
            <p>{post.createdAt.slice(0, 10)}</p>
          </div>
          {loggedIn && <Likes likes={post.likes} uuid={post.uuid} />}
          {comments && (
            <FetchComments
              uuid={uuid}
              comments={comments}
              setComments={setComments}
            />
          )}
          {loggedIn && (
            <CommentForm
              uuid={uuid}
              comments={comments}
              setComments={setComments}
            />
          )}
        </section>
      )}
    </div>
  );
};

export default Post;
