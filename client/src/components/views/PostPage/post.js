import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CommentForm from "../../containers/comment-form";
import { Link } from "react-router-dom";

const Post = () => {
  const { uuid } = useParams();
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const postUrl = `http://localhost:5050/api/post/${uuid}`;
      const commentsUrl = `http://localhost:5050/api/comment/${uuid}`;
      try {
        let { postRes } = await axios.get(postUrl);
        let { commentsRes } = await axios.get(commentsUrl);
        let { post } = postRes;
        let { comments } = commentsRes;

        setPost(post);
        setComments(comments);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  });

  return (
    <>
      {post && (
        <>
          <div className="postcard-image">
            <img src={post.url} alt={`${post.user}의 포스팅`} />
          </div>
          <div className="postcard-user">
            <Link to={`/username/${post.user}`}>{post.user}</Link>
          </div>

          <div className="postcard-content">
            <h3>{post.likeCount}</h3>
            <p>{post.content}</p>
          </div>
          <div className="postcard-comments">
            {comments && (
              <ul>
                {comments.map((comment, index) => (
                  <li key={index}>
                    <str>{comment.user}</str>
                    {` ${comment.comment}`}
                  </li>
                ))}
              </ul>
            )}
            <CommentForm
              uuid={uuid}
              comments={comments}
              setComments={setComments}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Post;
