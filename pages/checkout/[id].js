import Link from "next/link";
import React, { useState } from "react";
import DefaulLayout from "../../layouts";
import { getData } from "../../utils/fetchData";
const OrderDetail = (props) => {
  const [order, setOrder] = useState(props.order);
  return (
    <>
      <DefaulLayout seo={props.seo} breakcrumb={props.breakcrumb}>
        <section className="nls-s-order-detail">
          <div className="nls-container">
            <div className="nls-b-header">
              <h2 className="nls-txt-title">
                Thanks for your Order, {order.firstName + " " + order.lastName}{" "}
                !
              </h2>
            </div>
            <div className="nls-b-body">
              <div className="nls-title">
                <h2 className="nls-txt-title">Receipt</h2>
                <span> Receipt Voucher : {order._id} </span>
              </div>
              <div className="nls-b-receipt">
                {order.cart.map((item) => (
                  <div className="nls-b-item" key={item._id}>
                    <div className="nls-b-receipt-header">
                      <img className="nls-img" src={item.images[0]} alt="" />
                      <span className="nls-txt-tl"> {item.name} </span>
                      <span className="nls-txt-tl"> ${item.currentPrice} </span>
                      <span className="nls-txt-tl">
                        {" "}
                        Qty : {item.quantity}{" "}
                      </span>
                      <span className="nls-txt-tl"> Size : {item.size} </span>
                      <span className="nls-txt-tl">
                        {" "}
                        ${item.currentPrice * item.quantity}{" "}
                      </span>
                    </div>
                    <div className="nls-b-receipt-body">
                      <h2>Track Order</h2>
                      <div>
                        <div className="nls-delivary">
                          {props.delivered === true ? (
                            <span className="nls-delivary-width nls-delivary-width-100"></span>
                          ) : (
                            <span className="nls-delivary-width nls-delivary-width-50"></span>
                          )}
                        </div>
                        <div className="nls-b-receipt-delivary">
                          <span>Out for delivary</span>
                          <span>Delivered</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="nls-b-footer">
              <div>
                <h2>
                  <strong>Order Details</strong>
                </h2>
                <span>
                  {/* {" "}
                  <strong>Total </strong>: ${order.total} */}
                </span>
              </div>
              <div>
                <span>
                  payment methods :{" "}
                  {order.pay === true
                    ? "Payment on payPal or visa card"
                    : "Payment on delivery"}
                </span>
                <span>
                  {" "}
                  <strong>Total </strong>: ${order.total}
                </span>
              </div>
              <div>
                <span>delivery address: {order.address}</span>
                <span>
                  <span>
                    <strong>payment status </strong>:{" "}
                    {order.pay === true ? "already paid" : "unpaid"}
                  </span>
                </span>
              </div>
              <div>
                <span>Payment Id: {order.payerId}</span>
                <span></span>
              </div>
              <div className="nls-b-return">
                <Link href="/shop">Continue Shopping</Link>
              </div>
            </div>
          </div>
        </section>
      </DefaulLayout>
    </>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`order/${id}`);
  return {
    props: {
      order: res.order,
      seo: {
        title: "Nelson - Order Detail",
      },
      breakcrumb: {
        title: "Order Detail",
        href: "/order/" + res.order._id,
      },
    },
  };
}
export default OrderDetail;
