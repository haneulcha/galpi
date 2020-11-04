import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "antd";
import { useParams } from "react-router-dom";
import PostInfiniteScroll from "../../containers/infinite-scroll";
import PostThumbnail from "../../containers/post-thumbnail";

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const baseUrl = `http://localhost:5000/api/user/${username}`;
      try {
        let { data } = await axios.get(baseUrl);
        let { user } = data;

        setUser(user);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, [username]);

  return (
    <div>
      {user ? (
        <>
          <Card
            title={`${user.username}의 갈피들`}
            loading={loading}
            style={{ width: 500 }}
            bordered="true"
          >
            <p>이름: {user.name}</p>
            <p>이메일: {user.email}</p>
          </Card>
          <PostInfiniteScroll
            Component={PostThumbnail}
            username={user.username}
          />
        </>
      ) : (
        <Card loading={loading} style={{ width: 500 }} />
      )}
    </div>
  );
};

export default Profile;
