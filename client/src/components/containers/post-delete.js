import React from "react";
import { useDispatch } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import { deletePost } from "../../_actions/post_action";
import { errorHandle } from "../../_actions/error_actions";

const DeleteAPost = (props) => {
  const dispatch = useDispatch();
  const { history, uuid } = props;

  const deletePostHandle = async (e) => {
    e.preventDefault();
    try {
      await dispatch(deletePost(uuid));
      alert("포스트가 삭제되었습니다");
      return history.replace("/home");
    } catch (e) {
      dispatch(errorHandle(e.response));
    }
  };

  return <DeleteOutlined onClick={deletePostHandle} />;
};

export default DeleteAPost;
