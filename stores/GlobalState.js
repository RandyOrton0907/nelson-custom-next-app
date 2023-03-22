import React, { createContext, useReducer, useEffect } from "react";
import reducers from "./Reducers";
import { getData } from "../utils/fetchData";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialState = {
    nofity: {},
    auth: {},
    cart: [],
    wishlist: [],
    order: [],
  };
  const [state, dispatch] = useReducer(reducers, initialState);
  const { auth, cart, wishlist, order } = state;

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      getData("auth/accessToken").then((res) => {
        if (res.err) return localStorage.removeItem("firstLogin");
        dispatch({
          type: "AUTH",
          payload: {
            token: res.access_token,
            user: res.user,
          },
        });
      });
    }
  });
  useEffect(() => {
    const __next_cart = JSON.parse(localStorage.getItem("__next_cart"));
    if (__next_cart) dispatch({ type: "ADD_CART", payload: __next_cart });
  }, []);

  useEffect(() => {
    localStorage.setItem("__next_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const __next_wishlist = JSON.parse(localStorage.getItem("__next_wishlist"));
    if (__next_wishlist)
      dispatch({ type: "ADD_WISHLIST", payload: __next_wishlist });
  }, []);

  useEffect(() => {
    localStorage.setItem("__next_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    const __next_user = JSON.parse(localStorage.getItem("__next_user"));
    if (__next_user) dispatch({ type: "AUTH", payload: __next_user });
  }, []);

  useEffect(() => {
    localStorage.setItem("__next_user", JSON.stringify(auth));
  }, [auth]);

  useEffect(() => {
    const __next_order = JSON.parse(localStorage.getItem("__next_order"));
    if (__next_order) dispatch({ type: "ADD_ORDER", payload: __next_order });
  }, []);

  useEffect(() => {
    localStorage.setItem("__next_order", JSON.stringify(order));
  }, [order]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
