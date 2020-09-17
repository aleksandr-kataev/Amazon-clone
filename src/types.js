import {
  shape,
  number,
  string,
  arrayOf,
  func,
  node,
} from 'prop-types';

export const CheckoutProductProps = {
  item: shape({
    id: string.isRequired,
    title: string.isRequired,
    price: number.isRequired,
    image: string.isRequired,
    rating: number.isRequired,
  }),
  hideRemove: func.isRequired,
};

export const SubtotalPropTypes = {
  emptyBasketNotification: func.isRequired,
};

export const OrderProps = {
  order: shape({
    amount: number.isRequired,
    basket: arrayOf(
      shape({
        id: string.isRequired,
        image: string.isRequired,
        price: number.isRequired,
        rating: number.isRequired,
        title: string.isRequired,
      }),
    ).isRequired,
    created: number.isRequired,
  }),
};

export const DealProductProps = {
  item: shape({
    id: string.isRequired,
    title: string.isRequired,
    image: string.isRequired,
    offerPrice: number.isRequired,
    normalPrice: number.isRequired,
    rating: number.isRequired,
    addItemNotification: func.isRequired,
  }),
};

export const ProductProps = {
  item: shape({
    id: string.isRequired,
    title: string.isRequired,
    image: string.isRequired,
    price: number.isRequired,
    rating: number.isRequired,
    addItemNotification: func.isRequired,
  }),
};

export const ProductsProps = {
  match: shape({
    params: shape({
      id: node,
    }).isRequired,
  }).isRequired,
};

export const StateProviderPropTypes = {
  reducer: func.isRequired,
  initialState: arrayOf(
    shape({
      id: string,
      title: string,
      image: string,
      price: number,
      rating: number,
    }),
  ),
};

export const StateProviderDefaultProps = {
  initialState: shape({
    basket: [],
    user: null,
    products: [],
    deals: [],
  }),
};

export const PrivateRoutePropTypes = {
  component: func.isRequired,
};
