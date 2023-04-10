import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { DataContext } from "../../stores/GlobalState";
import Cookies from "js-cookie";
import { deleteCart } from "../../stores/Action";
import Modal from "react-modal";
import filterSearch from "../../utils/filterSearch";
import { useRouter } from "next/router";
const Header = () => {
  const { state, dispatch } = useContext(DataContext);
  const { auth, cart } = state;
  const router = useRouter();
  const [total, setTotal] = useState(0);
  const logUser = () => {
    return (
      <>
        <div className="nls-btn-hvr">
          <Link href="">
            <i class="fa-solid fa-user"></i>
          </Link>
          <ul className="nls-b-content">
            <li>
              <div className="nls-b-item nls-loguser">
                <div className="nls-content-info">
                  <div className="nls-b-left">
                    <img
                      className="nls-item-avt"
                      src={auth.user.avatar}
                      alt=""
                    />
                  </div>
                  <div className="nls-b-right">
                    <span>
                      {auth.user.firstName + " " + auth.user.lastName}
                    </span>
                    <span>{auth.user.email}</span>
                  </div>
                </div>
              </div>
              <ul className="nls-b-item">
                <li>
                  <Link href="/user/profile">My account</Link>
                </li>
                <li>
                  <Link href="/cart">Cart</Link>
                </li>
                <li>
                  <Link href="/wishlist">Wishlist</Link>
                </li>
                <li>
                  <button
                    className="nls-btn-log"
                    type="button"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </>
    );
  };
  const handleLogout = () => {
    dispatch({ type: "NOFITY", payload: { loading: true } });
    Cookies.remove("refreshtoken", { path: "api/auth/accessToken" });
    localStorage.removeItem("firstLogin");
    dispatch({ type: "AUTH", payload: {} });
    dispatch({ type: "ADD_ORDER", payload: {} });
    dispatch({ type: "NOFITY", payload: { success: "Logged Out!" } });
    return router.push("/");
  };

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.currentPrice * item.quantity;
      }, 0);
      setTotal(res);
    };
    getTotal();
  }, [total]);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpenMobile, setIsOpenMobile] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function OpenMobile() {
    setIsOpenMobile(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  function closeModalMobile() {
    setIsOpenMobile(false);
  }

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    filterSearch({ router, search: search });
  };

  return (
    <>
      <header>
        <div className="nls-container">
          <div className="nls-b-hdr">
            <Link href="/">
              <div className="nls-b-logo">
                <img
                  src="https://htmldemo.net/nelson/nelson/assets/images/logo.png"
                  alt=""
                />
              </div>
            </Link>
            <div className="nls-b-nav">
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/shop">Shop</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>
            <div className="nls-b-meta">
              <button
                className="nls-open-search nls-btn-hv"
                type="button"
                onClick={openModal}
              >
                <i className="fa-light fa-magnifying-glass"></i>
              </button>
              {Object.keys(auth).length === 0 ? (
                <div className="nls-btn-hvr">
                  {Object.keys(auth).length == 0 ? (
                    <Link href="/user">
                      <i className="fa-light fa-user"></i>
                    </Link>
                  ) : (
                    <Link href="/user/profile">
                      <i className="fa-light fa-user"></i>
                    </Link>
                  )}

                  <ul className="nls-b-content">
                    <li>
                      <h2 className="nls-txt-title">My account</h2>
                      <ul className="nls-b-item">
                        <li>
                          <Link href="/user">Login</Link>
                        </li>
                        <li>
                          {Object.keys(auth).length == 0 ? (
                            <Link href="/user">Checkout</Link>
                          ) : (
                            <Link href="/checkout">Checkout</Link>
                          )}
                        </li>
                        <li>
                          {Object.keys(auth).length == 0 ? (
                            <Link href="/user">My Account</Link>
                          ) : (
                            <Link href="/account">My Account</Link>
                          )}
                        </li>
                        <li>
                          <Link href="/cart">Cart</Link>
                        </li>
                        <li>
                          <Link href="/wishlist">Wishlist</Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              ) : (
                logUser()
              )}
              <div className="nls-btn-hvr">
                <Link href="/cart">
                  <i className="fa-light fa-cart-shopping"></i>
                </Link>
                <span className="nls-sp-qty">{cart.length}</span>
                <div className="nls-b-content carts">
                  <div className="nls-b-header">
                    {Object.keys(cart).length == 0 ? (
                      <div className="nls-b-item">
                        <span>No Item</span>
                      </div>
                    ) : (
                      cart.map((item) => (
                        <div className="nls-b-item" key={item._id}>
                          <div className="nls-img">
                            <img src={item.images[0]} alt="" />
                          </div>
                          <div className="nls-content-item">
                            <div className="nls-b-header">
                              <Link href="">{item.name}</Link>
                            </div>
                            <div className="nls-b-body">
                              <span>
                                {item.quantity} × ${item.currentPrice}
                              </span>
                            </div>
                          </div>

                          <div
                            className="nls-del"
                            onClick={() => {
                              dispatch(deleteCart(cart, item._id));
                            }}
                          >
                            <i className="fa-solid fa-trash-can-xmark"></i>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="nls-b-body carts">
                    <h5>
                      Subtotal: <span>${total}</span>
                    </h5>
                  </div>
                  <div className="nls-b-footer btn">
                    <Link href="/cart">View Cart</Link>
                    {Object.keys(auth).length == 0 ? (
                      <Link href="/user">Checkout</Link>
                    ) : (
                      <Link href="/checkout">Checkout</Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="nls-mobile-header">
        <div className="nls-container">
          <div className="nls-b-logo">
            <Link href="/">
              <img
                src="https://htmldemo.net/nelson/nelson/assets/images/logo.png"
                alt=""
              />
            </Link>
          </div>
          <div className="nls-mobile-nav">
            <ul>
              <li>
                <Link href="/cart">
                  <i className="fa-light fa-cart-shopping"></i>
                </Link>
              </li>
              <li>
                <button
                  className="nls-bars-nav"
                  type="button"
                  onClick={OpenMobile}
                >
                  <i className="fa-regular fa-bars"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="nls-modal active"
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className="nls-screen-black active">
          <div className="nls-b-action">
            <button
              className="nls-btn-close"
              type="button"
              onClick={closeModal}
            >
              <i className="fa fa-times"></i>
            </button>
          </div>
          <div className="nls-modal-search">
            <div className="nls-container">
              <form action="/shop" method="GET">
                <div className="nls-form-group">
                  <input
                    type="text"
                    placeholder=""
                    name="search"
                    value={search}
                    onChange={handleSearch}
                  />
                  <button type="reset">
                    <i className="fa fa-times"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={modalIsOpenMobile}
        className="nls-modal active"
        onRequestClose={closeModalMobile}
        ariaHideApp={false}
      >
        <div className="nls-mobile-menu active">
          <div className="nls-b-nav active">
            <div className="nls-b-close">
              <button type="button" onClick={closeModalMobile}>
                <i className="fa-regular fa-xmark"></i>
              </button>
            </div>
            <div className="nls-mobile-nav">
              <div className="nls-b-header">
                <div className="nls-b-search">
                  <form action="/shop" method="GET">
                    <div className="nls-form-group">
                      <input
                        type="text"
                        placeholder="Search ..."
                        name="search"
                        value={search}
                        onChange={handleSearch}
                      />
                      <button type="reset" className="nls-btn-clear">
                        <i className="fa-regular fa-xmark"></i>
                      </button>
                      <button className="nls-btn-search" type="submit">
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="nls-b-body">
                <div className="nls-b-item">
                  <ul>
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li>
                      <Link href="/shop">Shop</Link>
                    </li>
                    <li>
                      <Link href="/blog">Blog</Link>
                    </li>
                    <li>
                      <Link href="/contact">Contact</Link>
                    </li>
                  </ul>
                </div>
                <div className="nls-b-item style-2">
                  <ul>
                    <li>
                      {Object.keys(auth).length === 0 ? (
                        <Link href="/user">Login</Link>
                      ) : (
                        <Link href="/user/profile">My Account</Link>
                      )}
                    </li>
                    <li>
                      <Link href="/cart">Cart</Link>
                    </li>
                    <li>
                      <Link href="/wishlist">Wishlist</Link>
                    </li>
                  </ul>
                </div>
                <div className="nls-b-item">
                  <span>(1245) 2456 012</span>
                  <span>info@yourdomain.com</span>
                </div>
              </div>
              <div className="nls-b-footer">
                <ul>
                  <li>
                    <a href="">
                      <i className="fa-brands fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <i className="fa-brands fa-google-plus-g"></i>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <i className="fa-brands fa-pinterest"></i>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <i className="fa-brands fa-vimeo-v"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default Header;
