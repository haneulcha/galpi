import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { useDispatch } from "react-redux";

import { getDashboard } from "../../../_actions/user_action";

const Dashboard = (params) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [posts, setPosts] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        let result = await dispatch(getDashboard);

        let { user, posts } = result;

        setUser(user);
        setPosts(posts);
        console.log(user);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, [dispatch]);

  return (
    <>
      {user ? (
        <>
          <Card
            title={`${user.username}님, 안녕하세요 !`}
            loading={false}
            style={{ width: 500 }}
            bordered="true"
          >
            <p>이름: {user.name}</p>
            <p>이메일: {user.email}</p>
            <p>갈피: {posts.length} 개</p>
          </Card>
        </>
      ) : (
        <Card loading={true} style={{ width: 500 }} />
      )}
    </>
  );
};

export default Dashboard;
