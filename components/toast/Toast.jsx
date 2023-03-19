import React, { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { DataContext } from "../../stores/GlobalState";

const Toast = ({ msg }) => {
  const { state, dispatch } = useContext(DataContext);
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
