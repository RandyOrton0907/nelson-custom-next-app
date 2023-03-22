import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { DataContext } from "../../stores/GlobalState";

const Toast = ({ msg, handle }) => {
  const { state, dispatch } = useContext(DataContext);
  const [Toast, setToast] = useState(handle);
  if (Toast == true) {
    toast.success(`${msg.msg}`, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  } else {
    toast.error(`${msg.msg}`, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  setTimeout(() => {
    dispatch({ type: "NOFITY", payload: {} });
  }, 3000);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default Toast;
