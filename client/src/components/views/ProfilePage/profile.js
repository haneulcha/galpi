import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import PostInfiniteScroll from "../../containers/infinite-scroll";
import PostThumbnail from "../../containers/post-thumbnail";
import { getUser } from "../../../_actions/user_action";
import PaperCard from "../../containers/papercard";

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState();
  // const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        let { user } = await dispatch(getUser(username)).then(
          (res) => res.payload
        );
        console.log("in profile", user);

        setUser(user);
        // setLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, [dispatch, username]);

  return (
    <div className="profile">
      {user ? (
        <>
          <PaperCard title={user.username}>
            <br />
            <h2>이름: {user.name}</h2>
            <p>계정 생성일: {user.createdAt.slice(0, 10)}</p>
          </PaperCard>
          <PostInfiniteScroll
            render={(posts, index) => (
              <PostThumbnail
                key={`postthumbnail-${index}`}
                posts={posts}
                index={index}
              />
            )}
            username={user.username}
          />
        </>
      ) : (
        <p> 해당하는 유저가 없습니다. </p>
      )}
    </div>
  );
};

export default Profile;
