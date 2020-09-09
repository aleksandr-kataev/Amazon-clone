export const initialState = {
  basket: [],
  user: null,
};

// payload insterad of item

// Total price selector
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

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
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
