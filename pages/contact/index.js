import DefaultLayout from "../../layouts/DefaultLayout";
import React, { useState, useEffect } from "react";
const Contact = (props) => {
  return (
    <>
      <DefaultLayout seo={props.seo} breakcrumb={props.breakcrumb}>
        <section className="nls-s-contact">
          <div className="nls-container">
            <div className="nls-b-header">
              <h2 className="nls-txx-title">Write Us</h2>
            </div>
            <div className="nls-b-body">
              <div className="nls-b-item">
                <div className="nls-form-group">
                  <label htmlFor="">Name</label>
                  <input type="text" />
                </div>
                <div className="nls-form-group">
                  <label htmlFor="">Email</label>
                  <input type="text" />
                </div>
                <div className="nls-form-group">
                  <input type="checkbox" name="" id="" />
                  <label htmlFor="">I am not a robot</label>
                </div>
              </div>
              <div className="nls-b-item">
                <div className="nls-form-group">
                  <label htmlFor="Message">Message</label>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="6"
                    placeholder="Type Your Message Of Here"
                  ></textarea>
                </div>
                <div className="nls-form-group">
                  <button className="nls-btn">Send Message</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="nls-s-map">
          <div className="nls-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3723769865123!2d106.68103831411644!3d10.782765262026775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x924dd3ae5910f6e!2zMTDCsDQ2JzU3LjkiTiAxMDbCsDQwJzU5LjYiRQ!5e0!3m2!1svi!2s!4v1667375492869!5m2!1svi!2s"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </DefaultLayout>
    </>
  );
};

export async function getStaticProps() {
  return {
    props: {
      seo: {
        title: "Nelson - Contact",
      },
      breakcrumb: {
        title: "Contact",
        href: "/contact",
      },
    },
    revalidate: 10,
  };
}
export default Contact;
