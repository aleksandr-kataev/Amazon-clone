const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const config = require('./config');
const stripe = require('stripe')(config.STRIPE_KEY);
const axios = require('axios');

const firebaseConfig = {
  apiKey: config.FIREBASE_API_KEY,
  authDomain: config.FIREBASE_AUTH_DOMAIN,
  databaseURL: config.FIREBASE_DATA_BASE_URL,
  projectId: config.FIREBASE_PROJECT_ID,
  storageBucket: config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
  appId: config.FIREBASE_APP_ID,
  measurementId: config.FIREBASE_MEASUREMENT_ID,
};
const admin = require('firebase-admin');
admin.initializeApp(firebaseConfig);
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
      'x-rapidapi-host': config.SEARCH_API_HOST,
      'x-rapidapi-key': config.SEARCH_API_KEY,
    },
  };
  try {
    const fetchResponse = await axios.get(apiUrl, config);
    return res.status(200).json({ data: fetchResponse.data });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// - Listen command
exports.api = functions.https.onRequest(app);

// Daily getDeals function
exports.getDeals = functions.pubsub
  .schedule('45 20 * * *')
  .onRun(async (context) => {
    const apiUrl =
      'https://amazon-deals.p.rapidapi.com/amazon-offers/all';

    const config = {
      headers: {
        'x-rapidapi-host': config.DEALS_API_HOST,
        'x-rapidapi-key': config.DEALS_API_KEY,
        useQueryString: true,
      },
    };

    const fetchResponse = await axios.get(apiUrl, config);
    db.collection('deals').doc('dealsDoc').set(fetchResponse.data);

    return null;
  });

// http://localhost:5001/clone-332a8/us-central1/api
