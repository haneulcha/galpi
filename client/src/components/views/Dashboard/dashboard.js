import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { errorHandle } from "../../../_actions/error_actions";
import { getDashboard } from "../../../_actions/user_action";
import PaperCard from "../../containers/papercard";

const Dashboard = (params) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [posts, setPosts] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await dispatch(getDashboard());
        let { user, posts } = response.payload;

        setUser(user);
        setPosts(posts);
      } catch (e) {
        dispatch(errorHandle(e));
      }
    }
    fetchData();
  }, [dispatch]);

  return (
    <>
      {user ? (
        <>
          <PaperCard title={`${user.username}님, 안녕하세요 !`}>
            <br />
            <p>이름: {user.name}</p>
            <p>이메일: {user.email}</p>
            <p>갈피: {posts.length} 개</p>
            <p>계정 생성일: {user.createdAt.slice(0, 10)}</p>
          </PaperCard>
        </>
      ) : (
        <p> 유저 정보를 불러오고 있습니다. </p>
      )}
    </>
  );
};

export default Dashboard;
