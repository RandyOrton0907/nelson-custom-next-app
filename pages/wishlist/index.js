import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import {
  addToCart,
  addToCartId,
  decrease,
  deleteCart,
  deleteWishlist,
  increase,
} from "../../stores/Action";
import { DataContext } from "../../stores/GlobalState";
import { Modals } from "../../components";
import { getData } from "../../utils/fetchData";
const Wishlist = (props) => {
  const { state, dispatch } = useContext(DataContext);
  const { auth, wishlist, cart } = state;
  const [products, setProducts] = useState([]);
  const qty = 1;
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData("products");

      return setProducts(data.product);
    };
    fetchData();
  }, []);
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
                  <th>Add</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(wishlist).length == 0 ? (
                  <tr className="nls-b-item">
                    <td colSpan="6">There are no products in the cart</td>
                  </tr>
                ) : (
                  wishlist.map((item) => (
                    <tr className="nls-b-item" key={item._id}>
                      <td data-column="Image">
                        <a href="">
                          <img src={item.images[0]} alt="" />
                        </a>
                      </td>
                      <td data-column="Product">
                        <Link href={"/shop/" + item._id}>{item.name}</Link>
                      </td>
                      <td data-column="Price">
                        <span>${item.currentPrice}</span>
                      </td>
                      <td data-column="Total">
                        <button
                          className="nls-btn-add"
                          onClick={() => {
                            let a = cart.find(
                              (item) => item._id === products._id
                            );
                            if (a != undefined) {
                              dispatch(deleteWishlist(wishlist, item._id));
                              dispatch(addToCartId(cart, products._id, qty));
                            } else {
                              dispatch(deleteWishlist(wishlist, item._id));
                              dispatch(addToCart(item, cart, qty));
                            }
                          }}
                        >
                          Add
                        </button>
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
        </div>
      </section>
    </DefaultLayout>
  );
};
export async function getStaticProps() {
  return {
    props: {
      seo: {
        title: "Nelson - Wishlist",
      },
      breakcrumb: {
        title: "Wishlist",
        href: "/wishlist",
      },
    }, // will be passed to the page component as props
  };
}
export default Wishlist;
