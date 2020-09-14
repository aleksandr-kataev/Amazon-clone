import { db } from './firebase';

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
