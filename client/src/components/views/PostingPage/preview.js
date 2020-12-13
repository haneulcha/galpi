import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const getBase64 = (img, cb) => {
  const reader = new FileReader();
  reader.onloadend = () => {
    cb(reader.result);
  };
  reader.readAsDataURL(img);
};

export const Preview = ({ setUrl, setOpt }) => {
  const [loading, setLoading] = useState(false);

  const handleChange = (info) => {
    setLoading(true);
    let img = info.target.files[0];

    getBase64(img, (imgUrl) => {
      setUrl(imgUrl); // prop: setImgurl

      setOpt(true);
      setLoading(false);
    });
  };

  return (
    <div className="canvas-image">
      <label htmlFor="canvas-image">
        {loading ? <LoadingOutlined /> : <PlusOutlined />}배경 이미지
      </label>
      <form>
        <input
          type="file"
          name="canvas-image"
          id="canvas-image"
          accept="image/png, image/jpeg"
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </form>
    </div>
  );
};
