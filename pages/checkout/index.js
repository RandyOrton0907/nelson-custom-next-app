import { useContext, useEffect, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { DataContext } from "../../stores/GlobalState";
import { Paypal } from "../../components";
import { postData } from "../../utils/fetchData";
import { useRouter } from "next/router";
const Checkout = (props) => {
  const { state, dispatch } = useContext(DataContext);
  const { auth, cart } = state;
  const [total, setTotal] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.currentPrice * item.quantity;
      }, 0);
      setTotal(res);
    };
    getTotal();
  }, [cart]);

  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    cart: "",
    total: "",
  };
  const [dataOrder, setDataOrder] = useState(initialState);
  const { firstName, lastName, email, phoneNumber, address } = dataOrder;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setDataOrder({ ...dataOrder, [name]: value, cart: cart, total: total });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const [isCheckPay, setIsCheckPay] = useState("");
  const handlePay = (e) => {
    setIsCheckPay(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await postData("order", dataOrder, auth.token);
    if (res.err)
      return dispatch({ type: "NOFITY", payload: { error: res.err } });
    dispatch({ type: "ADD_CART", payload: [] });
    dispatch({ type: "NOFITY", payload: { success: res.success } });
    return router.push(`/checkout/${res.newOrder._id}`);
  };

  return (
    <>
      <DefaultLayout seo={props.seo} breakcrumb={props.breakcrumb}>
        <section className="nls-s-checkout">
          <form onSubmit={handleSubmit}>
            <div className="nls-container">
              <div className="nls-b-left">
                <h2 className="nls-txt-title">Billing Address</h2>

                <div className="nls-form-group ">
                  <label htmlFor="">First Name*</label>
                  <input
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={handleChangeInput}
                  />
                  <span className="message"></span>
                </div>
                <div className="nls-form-group ">
                  <label htmlFor="">Last Name*</label>
                  <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={handleChangeInput}
                  />
                  <span className="message"></span>
                </div>
                <div className="nls-form-group">
                  <label htmlFor="">Email Address*</label>
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleChangeInput}
                  />
                  <span className="message"></span>
                </div>
                <div className="nls-form-group">
                  <label htmlFor="">Phone No*</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handleChangeInput}
                  />
                  <span className="message"></span>
                </div>
                <div className="nls-form-group">
                  <label htmlFor="">Address*</label>
                  <br />
                  <textarea
                    name="address"
                    value={address}
                    onChange={handleChangeInput}
                  ></textarea>
                </div>
              </div>
              <div className="nls-b-right">
                <h2 className="nls-txt-title">Cart Total</h2>
                <div className="nls-b-totals">
                  <div className="nls-b-item title">
                    <span>Product</span>
                    <span>Total</span>
                  </div>
                  <div className="nls-b-list">
                    {Object.keys(cart).length == 0 ? (
                      <div className="nls-b-item">
                        <span>Not Data</span>
                      </div>
                    ) : (
                      cart.map((item) => (
                        <div className="nls-b-item" key={item._id}>
                          <span>
                            {item.name} X {item.quantity}
                          </span>
                          <span>${item.currentPrice}</span>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="nls-b-total">
                    {/* <div className="nls-b-item txt-total">
                    <span>Sub Total</span>
                    <span>$35.00</span>
                  </div> */}
                    <div className="nls-b-item txt-total">
                      <span>Sub Total</span>
                      <span>${total}</span>
                    </div>
                  </div>
                  <div className="nls-b-item title">
                    <span>Product</span>
                    <span>Total</span>
                  </div>
                </div>
                <h2 className="nls-txt-title">Payment Method</h2>

                <div className="nls-b-payment">
                  <div className="nls-form-group">
                    <input
                      type="radio"
                      name="nls-IsCheck"
                      value="delivery"
                      onClick={handlePay}
                      defaultChecked
                    />
                    <label htmlFor="">Payment on delivery</label>
                    <br />
                    <input
                      type="radio"
                      name="nls-IsCheck"
                      value="card"
                      onClick={handlePay}
                    />
                    <label htmlFor="">Payment on payPal or visa card</label>
                    <br />
                  </div>
                </div>
                <div className="nls-form-group">
                  {isCheckPay === "card" ? (
                    <Paypal
                      total={total}
                      state={state}
                      info={dataOrder}
                      dispatch={dispatch}
                      router={router}
                    />
                  ) : (
                    <div className="nls-form-group">
                      <button type="submit">Place Order</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </section>
      </DefaultLayout>
    </>
  );
};
export async function getStaticProps() {
  return {
    props: {
      seo: {
        title: "Nelson - CheckOut",
      },
      breakcrumb: {
        title: "CheckOut",
        href: "/checkOut",
      },
    },
    revalidate: 10,
  };
}
export default Checkout;
