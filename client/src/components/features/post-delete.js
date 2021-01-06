import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { deletePost } from "../../_actions/post_action";
import { errorHandle } from "../../_actions/error_actions";

const DeleteAPost = ({ uuid }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const deletePostHandle = async (e) => {
    e.preventDefault();
    try {
      await dispatch(deletePost(uuid));
      window.alert("삭제되었습니다");
      return history.push("/");
    } catch (e) {
      dispatch(errorHandle(e.response));
    }
  };

  return <DeleteOutlined onClick={deletePostHandle} />;
};

export default DeleteAPost;
