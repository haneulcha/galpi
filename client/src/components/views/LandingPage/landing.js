import React from "react";
import PaperCard from "./papercard";
const Landing = () => {
  return (
    <div>
      <PaperCard title={`마음에 드는 문장을 갈피에 남겨보세요.`}>
        <p>
          당신을 사로 잡은 문장들을 책 밖으로 꺼내주세요.
          <br />
          문장들을 이미지 카드에 새겨 더 오래 기억해보세요.
          <br />
          한 구절, 한 구절 당신의 글이 될 거예요.
          <br />
          톡 치면 인생의 문장이 입에서 술술 흘러나와
          <br />
          멋있는 사람으로 보일 그 날까지... <br />
        </p>
      </PaperCard>
    </div>
  );
};

export default Landing;
