const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(
  'sk_test_51HPvVHGFXBBbJ1tkoorsJT1NSN5jgWwzOHdYudwaLOkoXbtkduRCPscT2lzCzZ9dU2FQyIBWXYTNjhVV7m8cYN1r00GT78rev2',
);
const axios = require('axios');
const firebaseConfig = {
  apiKey: 'AIzaSyAAlG6Cn1FK0MliVrbrfzperuatH6F8cYM',
  authDomain: 'clone-332a8.firebaseapp.com',
  databaseURL: 'https://clone-332a8.firebaseio.com',
  projectId: 'clone-332a8',
  storageBucket: 'clone-332a8.appspot.com',
  messagingSenderId: '527332408386',
  appId: '1:527332408386:web:66f4b2f4c90ba50d5c01db',
  measurementId: 'G-YLXTEDRK7D',
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
        'x-rapidapi-host': 'amazon-deals.p.rapidapi.com',
        'x-rapidapi-key':
          '8bbd22ba91msha8eeab97daa2e4ap14806ejsna37422d69866',
        useQueryString: true,
      },
    };

    const fetchResponse = await axios.get(apiUrl, config);
    db.collection('deals').doc('dealsDoc').set(fetchResponse.data);

    return null;
  });

// http://localhost:5001/clone-332a8/us-central1/api
