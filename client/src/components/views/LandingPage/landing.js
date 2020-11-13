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
      {/* <img src="bg-img-2.jpg" alt="a highlighted book" /> */}
      <span className="bgr-img"></span>
    </div>
    // <div className="papercards">
    //   <PaperCard title={`마음에 드는 문장을 갈피에 남겨보세요.`}>
    //     <p>
    //       <br />
    //       <br />
    //       당신을 사로 잡은 문장들을 책 밖으로 꺼내보세요.
    //       <br />
    //       이미지 카드에 새겨 더 오래 기억해보세요.
    //       <br />
    //       한 구절, 한 구절 당신의 글이 될 거예요.
    //       <br />
    //       <br />
    //       톡 치면 인생의 문장이 입에서 술술 흘러나와
    //       <br />
    //       멋있는 사람으로 보일 그 날까지... <br />
    //     </p>
    //   </PaperCard>
    // </div>
  );
};

export default Landing;
