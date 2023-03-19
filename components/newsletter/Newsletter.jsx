import React from "react";
const Newsletter = () => {
  return (
    <>
      <section className="nls-s-newsletters">
        <div className="nls-container">
          <div className="nls-b-item">
            <h2>Subscribe Our Newsletter</h2>
            <p>Subscribe Today for free and save 10% on your first purchase.</p>
          </div>
          <div className="nls-b-item">
            <form action="">
              <div className="nls-form-group">
                <input
                  type="text"
                  placeholder="Enter Your Email Address Here..."
                />
                <button className="nls-btn">SUBSCRIBE!</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
export default Newsletter;
