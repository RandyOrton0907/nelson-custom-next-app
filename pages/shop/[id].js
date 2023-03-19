import DefaultLayout from "../../layouts/DefaultLayout";
import Link from "next/link";
import { DataContext } from "../../stores/GlobalState";
import { getData, postData } from "../../utils/fetchData";
import React, { useState, useContext, useEffect } from "react";
import Slider from "react-slick";
import { ProductItem } from "../../components";
import { addToCart, addToCartId } from "../../stores/Action";
import ReactStars from "react-stars";
const DetailProduct = (props) => {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [product, setProduct] = useState(props.onlyProduct);
  const [products, setProducts] = useState(props.products);
  const [vote, setVote] = useState(0);
  const [size, setSize] = useState(product.size[0]);
  const [tab, setTab] = useState(true);
  const [cmt, setCmt] = useState(props.cmt);
  const [user, setUser] = useState(props.user);
  useEffect(() => {
    setCmt(props.cmt);
  }, [props.cmt]);
  const handleChangeSize = (e) => {
    setSize(e.target.value);
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
    slidesToShow: 4,
    slidesToScroll: 2,
    arrows: false,
    focusOnSelect: true,
    swipeToSlide: true,
  };
  const settings_3 = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    arrows: false,
    focusOnSelect: true,
    swipeToSlide: true,
  };
  const { state, dispatch } = useContext(DataContext);
  const { auth, cart } = state;
  const [qty, setQty] = useState(1);
  const handleQty = (e) => {
    setQty(e.target.value);
  };
  const handleVote = (newRating) => {
    setVote(newRating);
  };
  const initialState = {
    _proId: product._id,
    comments: "",
  };
  const [userData, setUserData] = useState(initialState);
  const { comments } = userData;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };
  const handlePost = async (e) => {
    e.preventDefault();
    dispatch({ type: "NOFITY", payload: { loading: true } });
    const res = await postData(
      "cmtProduct",
      { ...userData, _userId: auth.user._id, vote: vote },
      auth.token
    );
    if (res.err)
      return dispatch({ type: "NOFITY", payload: { error: res.err } });
    dispatch({ type: "NOFITY", payload: { success: res.success } });
  };

  return (
    <>
      <DefaultLayout seo={props.seo} breakcrumb={props.breakcrumb}>
        <section className="nls-s-detail">
          <div className="nls-container">
            <div className="nls-b-header">
              <div className="nls-b-item">
                <div className="nls-b-wrapper">
                  <div className="nls-b-slider-for">
                    <Slider
                      asNavFor={nav2}
                      {...settings_1}
                      ref={(c) => setNav1(c)}
                    >
                      {product.images.map((item, index) => (
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
                      {product.images.map((item, index) => (
                        <img key={index} src={item} />
                      ))}
                    </Slider>
                  </div>
                </div>
                <div className="nls-b-content">
                  <h2 href="" className="nls-txt-title">
                    {product.name}
                  </h2>
                  {/* <div className="nls-b-reivew">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                  </div> */}

                  <div className="nls-b-price">
                    <ul>
                      <li>
                        <span className="nls-txt-price">
                          ${product.currentPrice}
                        </span>
                      </li>
                      <li>
                        <del className="nls-txt-price-del">
                          ${product.price}
                        </del>
                      </li>
                    </ul>
                  </div>

                  <div className="nls-b-describe">{product.description}</div>
                  <div className="nls-b-quantity">
                    <form action="">
                      <div className="nls-form-group">
                        <input
                          type="number"
                          value={qty}
                          min="1"
                          max="100"
                          onChange={handleQty}
                        />
                      </div>
                      <div className="nls-form-group">
                        <select
                          className="nls-sele-opti"
                          onChange={handleChangeSize}
                        >
                          {product.size.map((item, index) => (
                            <option key={index} value={item}>
                              Size: {item}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="nls-form-group">
                        <button
                          type="button"
                          onClick={() => {
                            let a = cart.find(
                              (item) => item._id === product._id
                            );
                            if (a != undefined) {
                              dispatch(
                                addToCartId(cart, product._id, qty, size)
                              );
                            } else {
                              dispatch(addToCart(product, cart, qty, size));
                            }
                          }}
                        >
                          add to cart
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="nls-b-meta">
                    <span>CATEGORIES:</span>
                    <ul>
                      <li>
                        {/* <a href="">Electronics</a> */}
                        <Link href="/">{product._idCate}</Link>
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
            <div className="nls-b-body">
              <div className="nls-b-item header">
                <ul>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setTab(true);
                      }}
                    >
                      Description
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setTab(false);
                      }}
                    >
                      Reviews
                    </button>
                  </li>
                </ul>
              </div>
              <div className="nls-b-item body">
                {tab === true ? (
                  <div className="nls-b-describe active">
                    {product.description}
                  </div>
                ) : (
                  <div className="nls-b-reviews active">
                    <h2 className="nls-txt-title">
                      1 Review For Sit Voluptatem
                    </h2>
                    <div className="nls-b-post">
                      <ul>
                        {cmt.length === 0 ? (
                          <li>
                            <span>No Comments</span>
                          </li>
                        ) : (
                          cmt
                            .filter((item) => item._proId == product._id)
                            .map((item) => (
                              <li key={item._id}>
                                <div className="nls-b-item">
                                  <div className="nls-avatar">
                                    <img
                                      src={
                                        user.find(
                                          (us) => us._id == item._userId
                                        ).avatar
                                      }
                                      alt=""
                                    />
                                  </div>
                                  <div className="nls-b-comment">
                                    <ReactStars
                                      className="nls-b-reivew"
                                      count={5}
                                      value={item.vote}
                                      size={24}
                                      color2={"#ffd700"}
                                    />
                                    <div className="nls-b-users">
                                      <ul>
                                        <li>
                                          <span className="nls-txt-user">
                                            {
                                              user.find(
                                                (us) => us._id == item._userId
                                              ).userName
                                            }
                                          </span>
                                        </li>
                                        <li>
                                          <span className="nls-txt-day">
                                            {item.createdAt}
                                          </span>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="nls-b-comments">
                                      {item.comments}
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))
                        )}
                      </ul>
                    </div>
                    <div className="nls-b-post-comments">
                      <ul>
                        <li>
                          <span>Add a review </span>
                        </li>
                        <li>
                          <span>
                            Your email address will not be published. Required
                            fields are marked *
                          </span>
                        </li>
                        <li>
                          <span>Your rating </span>
                        </li>
                      </ul>

                      <div className="nls-form">
                        <form onSubmit={handlePost}>
                          <ReactStars
                            className="nls-b-reivew"
                            count={5}
                            size={24}
                            value={vote}
                            color2={"#ffd700"}
                            onChange={handleVote}
                          />
                          <div className="nls-form-group">
                            <label htmlFor="Comment">Comment</label>
                            <br />
                            <textarea
                              name="comments"
                              value={comments}
                              onChange={handleChangeInput}
                              id=""
                              cols="30"
                              rows="10"
                            ></textarea>
                            <br />
                            <span className="message"></span>
                          </div>
                          <div className="nls-form-group">
                            {Object.keys(auth) == 0 ? (
                              <button disabled typeof="submit">
                                Submit
                              </button>
                            ) : (
                              <button typeof="submit">Submit</button>
                            )}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="nls-b-footer">
              <h2 className="nls-txt-title">Related Products</h2>
              <div className="nls-wrapper">
                <Slider {...settings_3}>
                  {products
                    .filter((item) => item._idCate === product._idCate)
                    .map((item) => (
                      <ProductItem key={item._id} products={item} tab="0" />
                    ))}
                </Slider>
              </div>
            </div>
          </div>
        </section>
      </DefaultLayout>
    </>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`product/${id}`);
  const resAll = await getData(`products`);
  const cmt = await getData("cmtProduct");
  const user = await getData("auth/login");
  return {
    props: {
      onlyProduct: res.product,
      products: resAll.product,
      cmt: cmt.comments,
      user: user.user,
      seo: {
        title: "Nelson - Shop - Detail",
      },
      breakcrumb: {
        title: "Detail Product",
        href: "/shop",
      },
    },
  };
}
export default DetailProduct;
