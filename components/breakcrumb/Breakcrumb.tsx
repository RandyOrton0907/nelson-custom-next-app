import React from "react";
import Link from "next/link";
const Breakcrumb = ({ breakcrumb: { title = "1", href = "1" } }) => {
  return (
    <>
      <section className="nls-s-breadcrumb">
        <div className="nls-container">
          <h2 className="nls-txt-title">{title}</h2>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href={href}>{title}</Link>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Breakcrumb;
