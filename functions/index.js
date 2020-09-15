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

// Daily getDeals function
exports.getDeals = functions.pubsub
  .schedule('30 0 * * *')
  .timeZone('Europe/Guernsey')
  .onRun(async (context) => {
    const apiUrl =
      'https://amazon-deals.p.rapidapi.com/amazon-offers/all';

    const config = {
      headers: {
        'x-rapidapi-host': functions.config().deals.api_host,
        'x-rapidapi-key': functions.config().deals.api_key,
        useQueryString: true,
      },
    };

    const fetchResponse = await axios.get(apiUrl, config);
    const products = fetchResponse.data.offers.map((category) => {
      return category.products[
        Math.floor(Math.random() * category.products.length)
      ];
    });

    const productsToGB = products.map((product) => {
      return {
        ...product,
        reviewRating: round(product.reviewRating, 1),
        normalPrice: round(product.normalPrice * 0.78, 2),
        offerPrice: round(product.offerPrice * 0.78, 2),
      };
    });

    const obj = {
      updated: fetchResponse.data.update_time,
      products: productsToGB.slice(0, 10),
    };

    db.collection('deals').doc('dealsDoc').set(obj);

    return null;
  });

// http://localhost:5001/clone-332a8/us-central1/api
