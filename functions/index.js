const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(
  'sk_test_51HPvVHGFXBBbJ1tkoorsJT1NSN5jgWwzOHdYudwaLOkoXbtkduRCPscT2lzCzZ9dU2FQyIBWXYTNjhVV7m8cYN1r00GT78rev2',
);

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

// http://localhost:5001/clone-332a8/us-central1/api
