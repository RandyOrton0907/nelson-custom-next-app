import React, { useState } from "react";
import Link from "next/link";
import Modal from "react-modal";
import {
  addToCart,
  addToCartId,
  addWishlist,
  deleteWishlist,
} from "../../stores/Action";
import Slider from "react-slick";
import { useEffect } from "react";
const ProductItem = ({ products, tab, disp, wishlist, cart, qty }) => {
  function createMarkup(items) {
    return { __html: items };
  }
  const [nav1, setNav1] = useState("");
  const [nav2, setNav2] = useState("");
  const [Qty, setQty] = useState(1);

  const handleQty = (e) => {
    setQty(e.target.value);
  };
  const settings_1 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  const settings_2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    focusOnSelect: true,
    swipeToSlide: true,
  };
  // custom modal quicview
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      {tab == "0" ? (
        <div className="nls-b-item" key={products._id}>
          <div className="nls-b-products">
            <span className="nls-b-price-percent">
              {products.discount ? products.discount + "%" : ""}
            </span>

            <div className="nls-img">
              <Link href={"/shop/" + products._id}>
                <img src={products.images[0]} alt="" />
                <img className="nls-img-hide" src={products.images[1]} alt="" />
              </Link>
            </div>
            <div className="nls-b-content">
              <Link href={"/shop/" + products._id} className="nls-txt-title-t2">
                {products.name}
              </Link>
              <div className="nls-b-price">
                <ul>
                  <li>
                    <span className="nls-txt-price">
                      ${products.currentPrice}
                    </span>
                  </li>
                  <li>
                    <del className="nls-txt-price-del">
                      {products.price ? "$" + products.price : ""}
                    </del>
                  </li>
                </ul>
              </div>
            </div>
            <div className="nls-b-action">
              <ul>
                <li>
                  <button
                    className="nls-add-to-cart"
                    type="button"
                    onClick={() => {
                      let a = cart.find((item) => item._id === products._id);
                      if (a != undefined) {
                        disp(addToCartId(cart, products._id, qty));
                      } else {
                        disp(addToCart(products, cart, qty));
                      }
                    }}
                  >
                    <i className="fa-solid fa-cart-plus"></i>
                  </button>
                </li>
                <li>
                  <button
                    className="nls-quick-views"
                    type="button"
                    onClick={openModal}
                  >
                    <i className="fa-solid fa-eye"></i>
                  </button>
                </li>
                <li>
                  <button
                    className="nls-add-wishlist"
                    type="button"
                    onClick={() => {
                      const a = wishlist.find(
                        (item) => item._id == products._id
                      );
                      a
                        ? disp(deleteWishlist(wishlist, products._id))
                        : disp(addWishlist(products, wishlist));
                    }}
                  >
                    <i className="fa-regular fa-heart"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="nls-b-item" key={products._id}>
          <div className="nls-img">
            <Link href={"/shop/" + products._id}>
              <img src={products.images[0]} alt="" />
              <img className="nls-img-hide" src={products.images[1]} alt="" />
            </Link>
          </div>
          <div className="nls-b-content">
            <Link href={"/shop/" + products._id} className="nls-txt-title">
              {products.name}
            </Link>
            <div className="nls-b-reivew">
              {/* <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i> */}
            </div>

            <div className="nls-b-price">
              <ul>
                <li>
                  <span className="nls-txt-price">
                    ${products.currentPrice}
                  </span>
                </li>
                <li>
                  <del className="nls-txt-price-del">
                    {products.price ? "$" + products.price : ""}
                  </del>
                </li>
              </ul>
            </div>

            <div
              className="nls-b-describe"
              dangerouslySetInnerHTML={createMarkup(products.description)}
            ></div>
          </div>
        </div>
      )}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className="nls-modal active"
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className="nls-b-quick-view active">
          <div className="nls-b-view">
            <div className="nls-b-close">
              <button className="nls-btn-close" onClick={closeModal}>
                x
              </button>
            </div>
            <div className="nls-b-item">
              <div className="nls-b-wrapper">
                <div className="nls-b-slider-for">
                  <Slider
                    asNavFor={nav2}
                    {...settings_1}
                    ref={(c) => setNav1(c)}
                  >
                    {products.images.map((item, index) => (
                      <img key={index} src={item} />
                    ))}
                  </Slider>
                </div>
                <div className="nls-b-slider-nav">
                  <Slider
                    {...settings_2}
                    asNavFor={nav1}
                    ref={(c) => setNav2(c)}
                  >
                    {products.images.map((item, index) => (
                      <img key={index} src={item} />
                    ))}
                  </Slider>
                </div>
              </div>
              <div className="nls-b-content">
                <a href="" className="nls-txt-title">
                  {products.name}
                </a>
                <div className="nls-b-reivew">
                  {/* <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-regular fa-star"></i>
                  <i className="fa-regular fa-star"></i> */}
                </div>

                <div className="nls-b-price">
                  <ul>
                    <li>
                      <span className="nls-txt-price">
                        ${products.currentPrice}
                      </span>
                    </li>
                    <li>
                      <del className="nls-txt-price-del">${products.price}</del>
                    </li>
                  </ul>
                </div>

                <div className="nls-b-describe">{products.description}</div>
                <div className="nls-b-quantity">
                  <form action="">
                    <div className="nls-form-group">
                      <input
                        type="number"
                        value={Qty}
                        min="1"
                        max="100"
                        onChange={handleQty}
                      />
                    </div>
                    <div className="nls-form-group">
                      <button
                        onClick={() => {
                          let a = cart.find(
                            (item) => item._id === products._id
                          );
                          if (a != undefined) {
                            disp(addToCartId(cart, products._id, qty));
                          } else {
                            disp(addToCart(products, cart, qty));
                          }
                        }}
                      >
                        add to cart
                      </button>
                    </div>
                  </form>
                </div>
                <div className="nls-b-wishlist-compeare">
                  <ul>
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          const a = wishlist.find(
                            (item) => item._id == products._id
                          );
                          a
                            ? disp(deleteWishlist(wishlist, products._id))
                            : disp(addWishlist(products, wishlist));
                        }}
                      >
                        Add to Wishlist
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="nls-b-meta">
                  <span>CATEGORIES:</span>
                  <ul>
                    <li>
                      <Link href="">{products.category}</Link>
                    </li>
                  </ul>
                </div>

                <div className="nls-b-share">
                  <span>SHARE THIS PRODUCT</span>
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
        </div>
      </Modal>
    </>
  );
};

export default ProductItem;
