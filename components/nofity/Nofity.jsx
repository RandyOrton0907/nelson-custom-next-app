import { useContext } from "react";
import { Loading, Toast } from "../../components";
import { DataContext } from "../../stores/GlobalState";
import React from "react";

const Nofity = () => {
  const { state, dispatch } = useContext(DataContext);
  const { nofity } = state;

  return (
    <>
      {nofity.loading && <Loading />}
      {nofity.error && (
        <Toast
          msg={{ msg: nofity.err, title: "Error" }}
          handleShow={() => {
            dispatch({ type: "NOTIFY", payload: {} });
          }}
        />
      )}
      {nofity.success && (
        <Toast msg={{ msg: nofity.success, title: "Success" }} />
      )}
    </>
  );
};

export default Nofity;
