const express = require('express');
const { nanoid } = require('nanoid');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const app = express();


//const { initiateDatabase, createAccount, 
//  checkCredentials, addOrderToUser } = require('./model/operations');
//const { user } = require('./middleware/auth');

app.use(express.static('../frontend'));
app.use(express.json());

const authRouter = require('./routes/auth');
const eventRouter = require('./routes/event');

//const hashPassword = require('./utility/bcrypt');

//hashPassword();

app.use('/api/auth', authRouter);
app.use('/api/event', eventRouter);

/*
app.get('/api/coffee/menu', (request, response) => {
  const menu = fs.createReadStream('data/menu.json');
  menu.pipe(response);
});

app.post('/api/coffee/order', user, (request, response) => {
  const order = request.body;

  addOrderToUser(order, request.userId);

  let result = { success: true }

  response.json(result);
});

app.post('/api/auth/create', (request, response) => {
  const account = request.body;
  account.id = nanoid();
  account.orders = [];

  const createdAccount = createAccount(account);

  let result = { success: false };

  if (createdAccount) {
    result.success = true;
  }

  response.json(result);
});

app.post('/api/auth/login', (request, response) => {
  const credentials = request.body;

  const user = checkCredentials(credentials);

  let result = { success: false }

  if (user) {
    const token = jwt.sign({ id: user.id }, 'a1b1c1', {
      expiresIn: 600 //Går ut om 10 min
    });

    result.success = true;
    result.token = token;
  }

  response.json(result);
}); */

app.listen(8000, () => {
  console.log('Server started');
  //initiateDatabase();
});