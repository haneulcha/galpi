import React, { useEffect, useState } from "react";
import { Card } from "antd";
import axios from "axios";

const Dashboard = (params) => {
  const [user, setUser] = useState();
  const [posts, setPosts] = useState();

  useEffect(() => {
    async function fetchData() {
      const baseUrl = `http://localhost:5000/api/dashboard`;
      try {
        let { data } = await axios.get(`${baseUrl}`);
        let { user, posts } = data;

        setUser(user);
        setPosts(posts);
        console.log(user);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, []);

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
