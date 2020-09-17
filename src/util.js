import { db } from './firebase';
import {
  HalfStar,
  ThirdStar,
  TwoThirdsStar,
} from './artifacts/svg/index';

export const getProducts = async () => {
  const ref = db.collection('products');
  const res = await ref.get();
  const products = [];

  res.forEach((doc) => {
    products.push(doc.data());
  });

  return products;
};

export const getDeals = async () => {
  const ref = db.collection('deals').doc('dealsDoc');
  const res = await ref.get();
  const data = res.data();
  return data;
};

export const getFeatured = async () => {
  const ref = db.collection('featured').doc('featuredDoc');
  const res = await ref.get();
  const data = res.data();
  return data.products;
};

export const recurringStar = (rating) => {
  const recurringRating = Math.round((rating % 1) * 10) / 10;
  if (
    recurringRating === 0.0 ||
    recurringRating === 0.1 ||
    recurringRating === 0.9
  ) {
    return null;
  }
  if (recurringRating >= 0.2 && recurringRating <= 0.3) {
    return ThirdStar;
  }
  if (recurringRating >= 0.4 && recurringRating <= 0.6) {
    return HalfStar;
  }

  return TwoThirdsStar;
};

export const addItemNotification = (e, notificationSystem) => {
  e.preventDefault();
  const notification = notificationSystem.current;
  notification.addNotification({
    message: 'Item has been added',
    level: 'success',
    position: 'br',
  });
};

export const emptyBasketNotification = (e, notificationSystem) => {
  e.preventDefault();
  const notification = notificationSystem.current;
  notification.addNotification({
    message: 'Empty basket',
    level: 'error',
  });
};
