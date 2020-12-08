import React from "react";
import Modal from "./modal";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { errorHide } from "../../../_actions/error_actions";

const ErrorModal = (params) => {
  const dispatch = useDispatch();

  const name = useSelector((state) => state.error.name);
  const message = useSelector((state) => state.error.message);
  const isOpen = useSelector((state) => state.error.isOpen);

  const hideModal = (params) => {
    dispatch(errorHide());
  };

  if (message === "You are already logged in") {
    return <Redirect to="/home" />;
  }

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
