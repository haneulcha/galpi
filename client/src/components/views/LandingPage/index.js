import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing">
      <div className="intro wrapper">
        <h1>
          말은 제주로
          <br />
          <span>
            글은 <strong>갈피</strong>로
          </span>
        </h1>
        <p>좋아하는 문장들을 원하는 이미지에 옮겨 포스팅 해보세요 !</p>
        <button>
          <Link to="/register">회원가입</Link>
        </button>
        <button>
          <Link to="/login">로그인</Link>
        </button>
      </div>
      <span className="bgr-img"></span>
    </div>
  );
};

export default Landing;
