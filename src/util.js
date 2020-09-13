import { db } from './firebase';

const reduceArray = (array, size) => {
  return array.reduce((chunks, item, i) => {
    if (i % size === 0) {
      chunks.push([item]);
    } else {
      chunks[chunks.length - 1].push(item);
    }
    return chunks;
  }, []);
};

export const getProducts = async () => {
  const ref = db.collection('products');
  const res = await ref.get();
  const products = [];

  res.forEach((doc) => {
    products.push(doc.data());
  });

  const chuckArr = products.map((category) => {
    return {
      category_label: category.category_label,
      products: reduceArray(category.products, 4),
    };
  });

  return chuckArr;
};

export const getDeals = async () => {
  const ref = db.collection('deals').doc('dealsDoc');
  const res = await ref.get();
  const data = res.data();
  const chuckArr = data.offers.map((category) => {
    return {
      category_label: category.category_label,
      products: reduceArray(category.products, 4),
    };
  });

  return chuckArr;
};
