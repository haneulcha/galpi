import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { errorHandle } from "../../../_actions/error_actions";
import { auth, deleteUser, getDashboard } from "../../../_actions/user_action";
import PaperCard from "../../containers/papercard";

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [user, setUser] = useState();
  const [posts, setPosts] = useState();
  const [password, setPassword] = useState("");

  const deleteUserHandler = async (e) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      e.preventDefault();
      let data = {
        password,
      };
      try {
        await dispatch(deleteUser(data));
        alert("삭제 되었습니다");
        await dispatch(auth());
        history.push("/");
      } catch (e) {
        dispatch(errorHandle(e.response));
      }
    }
    e.preventDefault();
    return;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await dispatch(getDashboard());
        let { user, posts } = response.payload;

        setUser(user);
        setPosts(posts);
      } catch (e) {
        dispatch(errorHandle(e.response));
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
            <p>갈피: {posts} 개</p>
            <p>계정 생성일: {user.createdAt.slice(0, 10)}</p>
            <br />
            <h2 className="account-delete">계정 삭제</h2>
            <form onSubmit={deleteUserHandler} className="account-delete">
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호 확인"
              />
              <input type="submit" value="🗑" />
            </form>
          </PaperCard>
        </>
      ) : (
        <p> 유저 정보를 불러오고 있습니다. </p>
      )}
    </>
  );
};

export default Dashboard;
