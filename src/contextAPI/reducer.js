export const initialState = {
  basket: [],
  user: null,
  products: [],
  deals: [],
};

// Total price selector
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => {
    const itemPrice = item.offerPrice ? item.offerPrice : item.price;
    return itemPrice + amount;
  }, 0);

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case 'REMOVE_ITEM':
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id,
      );

      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(`id: ${action.id} is not in the basket!`);
      }
      return {
        ...state,
        basket: newBasket,
      };
    case 'EMPTY_BASKET':
      return {
        ...state,
        basket: [],
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    case 'GET_PRODUCTS':
      return {
        ...state,
        products: action.products,
      };

    case 'GET_DEALS':
      return {
        ...state,
        deals: action.deals,
      };

    default:
      return state;
  }
};

export default reducer;
