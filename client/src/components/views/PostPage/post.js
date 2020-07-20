import React, { useState } from "react";
import axios from "axios";

const Post = () => {
  const [img, setImg] = useState();
  const [color, setColor] = useState("#FFFFFF");
  // 파일 인풋이 변경되면 POST '/post/image'
  // formData 생성해서 보내기 -> json으로 url을 받음 QQQ
  // -> 미리보기 가능?
  // 이를테면 url로도 파일에 접근이 가능한 것?
  function imgUpload(e) {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append("img", img);
    axios.post("/api/post/img", formData).then((res) => {
      console.log(res);
      setImg(res.data.url);
    });
  }
  function colorPick(e) {
    console.log(e.target.value);
    setColor(e.target.value);
  }

  // submit 하면
  //

  // 경로 uri 차이 !?
  // 우선 경로란 ~ ?!
  // useEffect(() => {
  //   // 색깔을 선택했을 때인지, 이미지를 선택했을 때인지

  //   return () => {
  //     cleanup;
  //   };
  // }, [color]);

  return (
    <div>
      posting page
      <input
        type="color"
        id="canvas-color"
        // value={color}
        onChange={colorPick}
      />
      <canvas id="canvas" width="300" height="300"></canvas>
      <form method="post" action="/post" encType="multipart/form-data">
        <input type="file" accept="image/*" onChange={imgUpload} />
        <img
          id="img-preview"
          style={
            (img ? { display: "inline" } : { display: "hidden" },
            { width: 300 })
          }
          src={img}
        />
        <input type="hidden" name="url" value={img} />
        <textarea name="content" maxLength={1000}></textarea>
        <button type="submit">올리기</button>
      </form>
    </div>
  );
};

export default Post;
