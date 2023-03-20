import "../styles/style.scss";
import "../styles/loading.scss";
import "../public/js/custom";
import "react-toastify/dist/ReactToastify.css";
import "../styles/orderdetail.scss";
import "../styles/mobileStyle.scss";
import { DataProvider } from "../stores/GlobalState";
import React from "react";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <DataProvider>
        <Component {...pageProps} />
      </DataProvider>
    </>
  );
}

export default MyApp;
