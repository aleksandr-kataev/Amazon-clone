const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const config = require('./config');
const stripe = require('stripe')(functions.config().stripe.key);
const axios = require('axios');

const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get('/', (req, res) => res.status(200).send('hello'));

app.post('/payments/create', async (req, res) => {
  const total = req.query.total;
  console.log('Payment Request recieved ', total);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'gbp',
    });
    return res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(500).send({ e });
  }
});

app.get('/search', async (req, res) => {
  const query = req.query.search;
  const apiUrl = `https://amazon-product-reviews-keywords.p.rapidapi.com/product/search?category=aps&country=US&keyword=${query}`;
  const config = {
    heades: {
      'x-rapidapi-host': functions.config().search.api_host,
      'x-rapidapi-key': functions.config().search.api_key,
    },
  };
  try {
    const fetchResponse = await axios.get(apiUrl, config);
    return res.status(200).json({ data: fetchResponse.data });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

const round = (value, decimals) => {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
};

// - Listen command
exports.api = functions.https.onRequest(app);

// Get featured product command
exports.getFeatured = functions.pubsub
  .schedule('35 0 * * *')
  .timeZone('Europe/Guernsey')
  .onRun(async (context) => {
    const ref = db.collection('products');
    const res = await ref.get();
    const products = [];

    res.forEach((doc) => {
      products.push(doc.data());
    });

    // Filter out the category and select n random elements
    // 4 from computer_electronics
    // 2 from sports_outdoors
    // 2 from books
    // 2 from health_beauty
    // Combine in array and shuffle
    // Returns 10 random products from the above categories

    const electronics = products
      .filter(
        (product) =>
          product.category_label === 'computer_electronics',
      )
      .sort(() => 0.5 - Math.random)
      .slice(0, 4);

    const sports = products
      .filter(
        (product) => product.category_label === 'sports_outdoors',
      )
      .sort(() => 0.5 - Math.random)
      .slice(0, 2);

    const books = products
      .filter((product) => product.category_label === 'books')
      .sort(() => 0.5 - Math.random)
      .slice(0, 2);

    const health = products
      .filter((product) => product.category_label === 'health_beauty')
      .sort(() => 0.5 - Math.random)
      .slice(0, 2);

    const obj = {
      products: [...electronics, ...sports, ...books, ...health].sort(
        () => Math.random() - 0.5,
      ),
    };

    db.collection('featured').doc('featuredDoc').set(obj);
    return null;
  });

// Daily getDeals command
exports.getDeals = functions.pubsub
  .schedule('30 0 * * *')
  .timeZone('Europe/Guernsey')
  .onRun(async (context) => {
    const apiUrl =
      'https://amazon-products1.p.rapidapi.com/offers';

    const config = {
      headers: {
        'x-rapidapi-host': functions.config().deals.api_host,
        'x-rapidapi-key': functions.config().deals.api_key,
        useQueryString: true,
      },
      params: {
        'min_number': '10',
        'country': 'UK',
        'type': 'LIGHTNING_DEAL',
        'max_number': '10'
      }
    };

    const fetchResponse = await axios.get(apiUrl, config);

    if (fetchResponse.data.error) throw new Error('Error occured in fetch');
    const productArray = fetchResponse.data.offers.map((product) => {
      return {
        id: product.asin,
        title: product.title,
        rating: product.reviews.stars,
        offerPrice: product.prices.current_price,
        normalPrice: product.prices.previous_price,
        image: product.images[0],
      }
    })
    db.collection('deals').doc('dealsDoc').set({ products: productArray })
    return null;
  });
