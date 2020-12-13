import React from "react";
import Modal from "./modal";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { errorHide } from "../../../_actions/error_actions";
import { auth } from "../../../_actions/user_action";

const ErrorModal = (params) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const name = useSelector((state) => state.error.name);
  const message = useSelector((state) => state.error.message);
  const isOpen = useSelector((state) => state.error.isOpen);

  const hideModal = async (e) => {
    e.preventDefault();
    dispatch(errorHide());

    if (message === "You are already logged in") {
      await dispatch(auth());
      return history.push("/");
    }
    if (message === "You must be logged in") {
      await dispatch(auth());
      return history.push("/login");
    }
    return;
  };

  return (
    <>
      {isOpen && (
        <Modal>
          <div className="modal">
            <div className="error-message">
              <h1>{name}</h1>
              <p>{message}</p>
              <button onClick={hideModal} className="submit-btn">
                확인
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ErrorModal;
