export const ACTION = {
  NOFITY: "NOFITY",
  AUTH: "AUTH",
  ADD_CART: "ADD_CART",
  ADD_WISHLIST: "ADD_WISHLIST",
};
export const addToCart = (products, cart, qty, size) => {
  if (products.productInventory === 0)
    return { type: "NOTYFI", payload: "This product is out of stock." };
  const check = cart.every((item) => {
    return item._id !== products._id;
  });
  if (!check)
    return { type: "NOTYFI", payload: "The product has been added  to cart !" };

  return {
    type: "ADD_CART",
    payload: [...cart, { ...products, quantity: Number(qty), size }],
  };
};
export const addToCartId = (data, id, qty) => {
  const newData = [...data];
  newData.forEach((item) => {
    if (item._id === id) {
      item.quantity += Number(qty);
    }
  });
  return { type: "ADD_CART", payload: newData };
};

export const decrease = (data, id) => {
  const newData = [...data];
  newData.forEach((item) => {
    if (item._id === id) {
      item.quantity -= 1;
    }
  });
  return { type: "ADD_CART", payload: newData };
};
export const increase = (data, id) => {
  const newData = [...data];
  newData.forEach((item) => {
    if (item._id === id) {
      item.quantity += 1;
    }
  });
  return { type: "ADD_CART", payload: newData };
};
export const deleteCart = (data, id) => {
  const newData = data.filter((item) => item._id != id);
  return { type: "ADD_CART", payload: newData };
};

export const addWishlist = (product, wishlist) => {
  const check = wishlist.every((item) => {
    return item._id !== product._id;
  });
  if (!check)
    return {
      type: "NOTYFI",
      payload: "The product has been added  to wishlist !",
    };

  return {
    type: "ADD_WISHLIST",
    payload: [...wishlist, { ...product }],
  };
};

export const deleteWishlist = (data, id) => {
  const newData = data.filter((item) => item._id != id);
  return { type: "ADD_WISHLIST", payload: newData };
};
