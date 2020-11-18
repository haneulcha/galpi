import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import PostInfiniteScroll from "../../containers/infinite-scroll";
import PostThumbnail from "../../containers/post-thumbnail";
import { getUser } from "../../../_actions/user_action";

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        let { user } = await dispatch(getUser(username)).then(
          (res) => res.payload
        );

        setUser(user);
        setLoading(false);
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
          <Card
            title={`${user.username}`}
            loading={loading}
            style={{ width: "100%" }}
            bordered="true"
          >
            <p>이름: {user.name}</p>
            <p>이메일: {user.email}</p>
          </Card>
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
