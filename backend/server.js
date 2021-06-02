/*
* Events Booking
* By Omar Mahrous
* Copyright June 2021
*/
const express = require('express');
const app = express();
const authRouter = require('./routes/auth');
const eventRouter = require('./routes/event');

app.use(express.static('../frontend'));
app.use(express.json());

// our app has two different routes bases: /api/auth/ route base and /api/event route base
app.use('/api/auth', authRouter);
app.use('/api/event', eventRouter);


app.listen(8000, () => {
  console.log('Server started');
});