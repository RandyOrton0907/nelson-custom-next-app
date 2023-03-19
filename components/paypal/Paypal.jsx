import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import React, { useContext, useRef, useState } from "react";
import { postData } from "../../utils/fetchData";
const Paypal = ({ total, state, info, dispatch, router }) => {
  const initialOptions = {
    "client-id": process.env.PAYPAL_CLIENT_ID,
    currency: "USD",
    intent: "capture",
  };
  const { auth } = state;
  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: `${total}`,
                  },
                },
              ],
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(async function () {
            // Your code here after capture the order
            const res = await postData(
              "order",
              { ...info, pay: true, payerId: data.payerID },
              auth.token
            );
            return router.push(`/checkout/${res.newOrder._id}`);
          });
        }}
      />
    </PayPalScriptProvider>
  );
};

export default Paypal;
