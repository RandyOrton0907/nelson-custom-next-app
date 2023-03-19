import React from "react";
import {
  Footer,
  Header,
  Seo,
  Breakcrumb,
  Nofity,
  Newsletter,
} from "../components";
const DefaultLayout = ({
  seo = {},
  showFooter = true,
  children,

  breakcrumb = false,
}) => {
  return (
    <>
      <Seo seo={seo} />
      <Header />
      <Nofity />
      {breakcrumb && <Breakcrumb breakcrumb={breakcrumb} />}

      {children}
      {<Newsletter></Newsletter>}
      {showFooter && <Footer />}
    </>
  );
};
export default DefaultLayout;
