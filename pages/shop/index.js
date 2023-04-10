import DefaultLayout from "../../layouts/DefaultLayout";
import { useRouter } from "next/router";
import filterSearch from "../../utils/filterSearch";
import React, { useState, useContext, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Link from "next/link";
import { getData } from "../../utils/fetchData";
import { ProductItem } from "../../components";
import { DataContext } from "../../stores/GlobalState";

const Shop = (props) => {
  const [category, setCategory] = useState(props.category);
  const [products, setProducts] = useState(props.products);
  const { state, dispatch } = useContext(DataContext);
  const { wishlist, cart } = state;
  const [qty, setQty] = useState(1);
  const [Tab, setTab] = useState(true);

  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);
  let a = [];
  products.map((item) => {
    item.size.map((sz) => {
      if (a.indexOf(sz) < 0) {
        a.push(sz);
      }
    });
  });
  const [size, setSize] = useState(a);

  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [sort, serSort] = useState("");
  const [FilCate, setFilCate] = useState("");
  const [price, setPrice] = useState(9999);
  const router = useRouter();

  // paginate
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 9;
  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(currentItems.length);
  };
  ///
  const handleSort = (e) => {
    serSort(e.target.value);
    filterSearch({ router, sort: e.target.value });
  };
  const handleCate = (e) => {
    setFilCate(e.target.value);
    filterSearch({ router, category: e.target.value });
  };
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleFilPrice = () => {
    filterSearch({ router, price: price });
  };
  const handleSize = (e) => {
    filterSearch({ router, size: e.target.value });
  };
  const [check, setCheck] = useState(false);
  return (
    <>
      <DefaultLayout seo={props.seo} breakcrumb={props.breakcrumb}>
        <section className="nls-s-shop">
          <div className="nls-container">
            <div className="nls-b-header">
              <div className="nls-b-grid-list">
                <ul>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setTab(true);
                      }}
                    >
                      <i className="fa-solid fa-grid"></i>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setTab(false);
                      }}
                    >
                      <i className="fa-regular fa-list"></i>
                    </button>
                  </li>
                </ul>
                <p>
                  Showing {itemOffset} to {endOffset} of {products.length}{" "}
                  results
                </p>
              </div>
              <div className="nls-b-toolbar">
                <label>Sort By:</label>
                <select name="" id="" value={sort} onChange={handleSort}>
                  <option value="all">Select</option>
                  <option value="name">Name, A to Z</option>
                  <option value="-name">Name, Z to A</option>
                  <option value="price">Price, low to high</option>
                  <option value="-price">Price, high to low</option>
                </select>
              </div>
            </div>
            <div className="nls-b-body">
              <div className="nls-b-left">
                <div className="nls-b-item">
                  <h2 className="nls-txt-title">PRODUCT CATEGORIES</h2>
                  <ul className="nls-b-todo">
                    {category.map((item) => (
                      <li key={item._id}>
                        {/* <Link href={`/shop/${item._id}`}>{item.name}</Link> */}
                        <button
                          type="button"
                          value={item._id}
                          onClick={handleCate}
                        >
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="nls-b-item">
                  <h2 className="nls-txt-title">FILTER BY PRICE</h2>
                  <form action="">
                    <div className="nls-form-group">
                      <input
                        type="range"
                        name=""
                        id=""
                        className="nls-range-value"
                        min={0}
                        max={9999}
                        value={price}
                        onChange={handleChangePrice}
                      />
                    </div>
                    <div className="nls-form-group">
                      <button
                        className="btn-filter"
                        type="button"
                        onClick={handleFilPrice}
                      >
                        Filter
                      </button>
                    </div>
                    <div className="nls-form-group">
                      <span>$0 - ${price}</span>
                    </div>
                  </form>
                </div>

                <div className="nls-b-item">
                  <h2 className="nls-txt-title">FILTER BY SIZE</h2>
                  <ul className="nls-b-tags">
                    {size.map((item, index) => (
                      <li key={index}>
                        <button type="button" value={item} onClick={handleSize}>
                          {item}
                        </button>
                      </li>
                    ))}
                    {}
                  </ul>
                </div>
              </div>
              <div className="nls-b-right">
                {Tab == true ? (
                  <div className="nls-b-tab tab-1 active">
                    {currentItems.length === 0 ? (
                      <h2>No Data</h2>
                    ) : (
                      currentItems.map((product) => (
                        <ProductItem
                          key={product._id}
                          products={product}
                          tab="0"
                          disp={dispatch}
                          wishlist={wishlist}
                          cart={cart}
                          qty={qty}
                          check={() => {
                            let a = wishlist.find(
                              (item) => item._id == product._id
                            );
                            if (a) {
                              setCheck(true);
                              return check;
                            } else {
                              setCheck(false);
                              return check;
                            }
                          }}
                        />
                      ))
                    )}
                    {currentItems.length === 0 ? (
                      <h2>No Data</h2>
                    ) : (
                      <div className="nls-b-pagination">
                        <ReactPaginate
                          className=""
                          breakLabel="..."
                          activeClassName="active"
                          onPageChange={handlePageClick}
                          pageRangeDisplayed={5}
                          pageCount={pageCount}
                          // previousLabel="< previous"
                          renderOnZeroPageCount={null}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="nls-b-tab tab-2 active">
                    {currentItems.length === 0 ? (
                      <h2>No Data</h2>
                    ) : (
                      currentItems.map((product) => (
                        <ProductItem
                          key={product._id}
                          products={product}
                          tab="2"
                          disp={dispatch}
                          wishlist={wishlist}
                          cart={cart}
                          qty={qty}
                        />
                      ))
                    )}
                    {currentItems.length === 0 ? (
                      ""
                    ) : (
                      <div className="nls-b-pagination">
                        <ReactPaginate
                          className=""
                          breakLabel="..."
                          activeClassName="active"
                          onPageChange={handlePageClick}
                          pageRangeDisplayed={5}
                          pageCount={pageCount}
                          // previousLabel="< previous"
                          renderOnZeroPageCount={null}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </DefaultLayout>
    </>
  );
};

export async function getServerSideProps({ query }) {
  const sort = query.sort || "all";
  const category = query.category || "all";
  const price = query.price || "all";
  const size = query.size || "all";
  const search = query.search || "all";

  const res = await getData(
    `product?search=${search}&sort=${sort}&category=${category}&price=${price}&size=${size}`
  );
  const resCategory = await getData(`category`);
  return {
    props: {
      products: res.product,
      category: resCategory.category,
      seo: {
        title: "Nelson - Shop",
      },
      breakcrumb: {
        title: "Shop",
        href: "/shop",
      },
    },
    // revalidate: 10,
  };
}

export default Shop;
