import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import { decrease, deleteCart, increase } from "../../stores/Action";
import { DataContext } from "../../stores/GlobalState";
import { Modals } from "../../components";
const Cart = (props) => {
  const { state, dispatch } = useContext(DataContext);
  const { auth, cart } = state;
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.currentPrice * item.quantity;
      }, 0);
      setTotal(res);
    };
    getTotal();
  }, [cart]);
  return (
    <DefaultLayout seo={props.seo} breakcrumb={props.breakcrumb}>
      <section className="nls-s-carts">
        <div className="nls-container">
          <div className="nls-b-header">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(cart).length == 0 ? (
                  <tr className="nls-b-item">
                    <td colSpan="6">There are no products in the cart</td>
                  </tr>
                ) : (
                  cart.map((item) => (
                    <tr className="nls-b-item" key={item._id}>
                      <td data-column="Image">
                        <a href="">
                          <img src={item.images[0]} alt="" />
                        </a>
                      </td>
                      <td data-column="Product">
                        <a href="">Black Cable Restorer</a>
                        <Link href={"/shop/" + item._id}>{item.name}</Link>
                      </td>
                      <td data-column="Price">
                        <span>${item.currentPrice}</span>
                      </td>
                      <td data-column="Quantity">
                        <div className="nls-form-group">
                          <input
                            type="text"
                            value={item.quantity}
                            onChange={() => {}}
                            min="0"
                            max="100"
                          />
                          <button
                            className="nls-btn-plus"
                            type="button"
                            onClick={() => {
                              dispatch(increase(cart, item._id));
                            }}
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                          <button
                            className="nls-btn-minus"
                            type="button"
                            onClick={() => {
                              dispatch(decrease(cart, item._id));
                            }}
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                        </div>
                      </td>
                      <td data-column="Total">
                        <span>${item.currentPrice * item.quantity}</span>
                      </td>
                      <td data-column="Remove">
                        <Modals itemId={item._id} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="nls-b-body">
            <div className="nls-b-left">
              {/* <div className="nls-b-item">
                <h2 className="nls-txt-title">Calculate Shipping</h2>
                <form action="">
                  <div className="nls-form-group nls-input-50">
                    <select name="" id="">
                      <option value="">Select</option>
                      <option value="">Bangladesh</option>
                    </select>
                  </div>

                  <div className="nls-form-group nls-input-50">
                    <select name="" id="">
                      <option value="">Select</option>
                      <option value="">Bangladesh</option>
                    </select>
                  </div>
                  <div className="nls-form-group nls-input-50">
                    <input type="text" />
                  </div>
                  <div className="nls-form-group nls-input-50">
                    <button>Estimate</button>
                  </div>
                </form>
              </div> */}
              <div className="nls-b-item">
                <h2 className="nls-txt-title">Discount Coupon Code</h2>
                <form action="">
                  {/* <div className="nls-form-group nls-input-50">
                    <input type="text" />
                  </div> */}
                  <div className="nls-form-group nls-input-50">
                    <button>Estimate</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="nls-b-right">
              <div className="nls-b-item">
                <div className="nls-b-content">
                  <h2 className="nls-txt-title">Cart Summary</h2>
                  <div className="nls-b-contents">
                    <div className="nls-b-items">
                      <span>Sub Total</span>
                      <span>${total} </span>
                    </div>
                    <div className="nls-b-items">
                      <span>Discount</span>
                      <span>$00.00 </span>
                    </div>
                  </div>
                  <div className="nls-b-totals">
                    <span>Sub Total</span>
                    <span>${total}</span>
                  </div>
                </div>
                <div className="nls-btn">
                  {Object.keys(auth).length === 0 ? (
                    <Link href="/user">Checkout</Link>
                  ) : (
                    <Link href="/checkout">Checkout</Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};
export async function getStaticProps() {
  return {
    props: {
      seo: {
        title: "Nelson - Cart",
      },
      breakcrumb: {
        title: "Cart",
        href: "/cart",
      },
    }, // will be passed to the page component as props
  };
}
export default Cart;
