import { ACTION } from "./Action";
const reducers = (state, action) => {
  switch (action.type) {
    case ACTION.NOFITY:
      return { ...state, nofity: action.payload };
    case ACTION.AUTH:
      return { ...state, auth: action.payload };
    case ACTION.ADD_CART:
      return { ...state, cart: action.payload };
    case ACTION.ADD_WISHLIST:
      return { ...state, wishlist: action.payload };
    case ACTION.ADD_ORDER:
      return { ...state, order: action.payload };

    default:
      return state;
  }
};

export default reducers;
