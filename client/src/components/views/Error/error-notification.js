import React from "react";
import { useSelector, useDispatch } from "react-redux";

const ErrorNotification = (params) => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.error.status);
  const name = useSelector((state) => state.error.name);
  const message = useSelector((state) => state.error.message);
  const isOpen = useSelector((state) => state.error.isOpen);
};

export default ErrorNotification;
