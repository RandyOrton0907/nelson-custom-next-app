import React, { useState } from "react";
import DefaultLayout from "../layouts";
import Slider from "react-slick";
import Link from "next/link";
import { getData } from "../utils/fetchData";
import { ProductItem } from "../components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function Home(props) {
  const settingBanner = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  const settingBrand = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: false,
  };
  const [products, setProducts] = useState(props.products);
  const [popular, setPopular] = useState(true);
  const [blog, setBlog] = useState(props.blog);

  return (
    <>
      <DefaultLayout seo={props.seo}>
        <section className="nls-s-banner">
          <Slider {...settingBanner}>
            <div className="nls-b-banner tab-1">
              <div className="nls-b-content">
                <h2>
                  Creative Design
                  <br />
                  Modern & Exclusive Furniture
                </h2>
                <Link className="nls-btn-content" href="/shop">
                  Shop now
                </Link>
              </div>
            </div>
            <div className="nls-b-banner tab-2">
              <div className="nls-b-content">
                <h2>
                  Creative Design
                  <br />
                  Modern & Exclusive Furniture
                </h2>
                <Link className="nls-btn-content" href="/shop">
                  Shop now
                </Link>
              </div>
            </div>
          </Slider>
        </section>

        <section className="nls-s-furniture">
          <div className="nls-container">
            <div className="nls-b-item">
              <div className="nls-img">
                <Link href="/shop">
                  <img
                    src="https://htmldemo.net/nelson/nelson/assets/images/banner/banner1.jpg"
                    alt=""
                  />
                </Link>
              </div>
              <div className="nls-b-content">
                <h2>
                  OFFICE <br />
                  FURNITURE
                </h2>
                <Link href="/shop">SHOP NOW</Link>
              </div>
            </div>
            <div className="nls-b-item">
              <div className="nls-img">
                <Link href="/shop">
                  <img
                    src="https://htmldemo.net/nelson/nelson/assets/images/banner/banner2.jpg"
                    alt=""
                  />
                </Link>
              </div>
              <div className="nls-b-content">
                <h2>
                  OFFICE <br />
                  FURNITURE
                </h2>
                <Link href="/shop">SHOP NOW</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="nls-s-Popular">
          <div className="nls-container">
            <div className="nls-b-header">
              <h2 className="nls-txt-title-t1">Popular Furniture</h2>
              <ul>
                <li>
                  {popular == true ? (
                    <button
                      className="active"
                      onClick={() => {
                        setPopular(true);
                      }}
                    >
                      BED
                    </button>
                  ) : (
                    <button
                      className=""
                      onClick={() => {
                        setPopular(true);
                      }}
                    >
                      BED
                    </button>
                  )}
                </li>
                <li>
                  {popular == true ? (
                    <button
                      className="OFFICE"
                      onClick={() => {
                        setPopular(false);
                      }}
                    >
                      SECTIONAL
                    </button>
                  ) : (
                    <button
                      className="OFFICE active"
                      onClick={() => {
                        setPopular(false);
                      }}
                    >
                      SECTIONAL
                    </button>
                  )}
                </li>
              </ul>
            </div>
            <div className="nls-b-body">
              {popular == true ? (
                <div className="nls-b-tab tab-1 active">
                  {products.length === 0 ? (
                    <h2>No Product</h2>
                  ) : (
                    products
                      .filter(
                        (item) => item._cateId == "63f8eedf9163b63524271a5b"
                      )
                      .slice(0, 8)
                      .map((product) => (
                        <ProductItem
                          key={product._id}
                          products={product}
                          tab="0"
                        ></ProductItem>
                      ))
                  )}
                </div>
              ) : (
                <div className="nls-b-tab tab-2 active">
                  {products.length === 0 ? (
                    <h2>No Product</h2>
                  ) : (
                    products
                      .filter(
                        (item) => item._cateId == "63f9abb2ae32df9f871b8fc5"
                      )
                      .slice(0, 8)
                      .map((product) => (
                        <ProductItem
                          key={product._id}
                          products={product}
                          tab="0"
                        ></ProductItem>
                      ))
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="nls-s-brand-wrapper">
          <div className="nls-container">
            <div className="nls-wrapper">
              <Slider {...settingBrand}>
                <div className="nls-b-item">
                  <img
                    src="https://htmldemo.net/nelson/nelson/assets/images/brands/brand-1.png"
                    alt=""
                  />
                </div>
                <div className="nls-b-item">
                  <img
                    src="https://htmldemo.net/nelson/nelson/assets/images/brands/brand-2.png"
                    alt=""
                  />
                </div>
                <div className="nls-b-item">
                  <img
                    src="https://htmldemo.net/nelson/nelson/assets/images/brands/brand-3.png"
                    alt=""
                  />
                </div>
                <div className="nls-b-item">
                  <img
                    src="https://htmldemo.net/nelson/nelson/assets/images/brands/brand-4.png"
                    alt=""
                  />
                </div>
                <div className="nls-b-item">
                  <img
                    src="https://htmldemo.net/nelson/nelson/assets/images/brands/brand-5.png"
                    alt=""
                  />
                </div>
                <div className="nls-b-item">
                  <img
                    src="https://htmldemo.net/nelson/nelson/assets/images/brands/brand-1.png"
                    alt=""
                  />
                </div>
                <div className="nls-b-item">
                  <img
                    src="https://htmldemo.net/nelson/nelson/assets/images/brands/brand-2.png"
                    alt=""
                  />
                </div>
                <div className="nls-b-item">
                  <img
                    src="https://htmldemo.net/nelson/nelson/assets/images/brands/brand-3.png"
                    alt=""
                  />
                </div>
              </Slider>
            </div>
          </div>
        </section>
        <section className="nls-s-blog">
          <div className="nls-container">
            <div className="nls-b-header">
              <h2 className="nls-txt-title-t1">Latest Post From Blog</h2>
              <span className="nls-txt-title-t3">OUR BLOG POST</span>
            </div>
            <div className="nls-b-body">
              {blog.slice(0, 3).map((item) => (
                <div className="nls-b-item" key={item._id}>
                  <div className="nls-img">
                    <img src={item.images} alt="" />
                  </div>
                  <div className="nls-b-content">
                    <div className="nls-b-meta">
                      <ul>
                        <li>{item.createdAt}</li>
                        {/* <li>25 Likes</li>
                        <li>25 Views</li> */}
                      </ul>
                    </div>

                    <Link
                      href={`/blog/${item._id}`}
                      className="nls-txt-title-ref"
                    >
                      {item.title}
                    </Link>
                    <Link href="/blog" className="nls-href">
                      Read more
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </DefaultLayout>
    </>
  );
}

export async function getServerSideProps() {
  const res = await getData("products");
  const resBlog = await getData("blog");
  return {
    props: {
      products: res.product,
      blog: resBlog.blog,
      seo: { title: "Nelson - Home Page" },
    },
  };
}
