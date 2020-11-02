import React, { useState } from "react";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const getBase64 = (img, cb) => {
  const reader = new FileReader();
  reader.onloadend = () => {
    cb(reader.result);
  };
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("JPG/PNG 파일만 업로드 하세요.");
  }
  // const isLt2M = file.size / 1024 / 1024 < 2;
  // if(!isLt2M){
  //     message.error('이미지 용량은 2MB 이하만 가능합니다. ')
  // }
  return isJpgOrPng;
};

export const Preview = (props) => {
  const [loading, setLoading] = useState(false);
  const { url, setUrl, setOpt } = props;

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imgUrl) => {
        setUrl(imgUrl); // prop: setImgurl

        setOpt(true);
        setLoading(false);
      });
    }
  };
  const uploadBtn = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8, fontSize: "0.75em" }}>배경 이미지</div>
    </div>
  );

  return (
    <Upload
      name="background-img"
      listType="picture-card"
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      customRequest={dummyRequest}
      className="preview-image"
    >
      {url ? (
        <img
          src={url}
          alt="preview"
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        uploadBtn
      )}
    </Upload>
  );
};
