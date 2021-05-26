const { nanoid } = require('nanoid');
const jwt = require('jsonwebtoken');

const { checkCredentials, getUserByUsername
         } = require('../model/operations');

function login(request, response) {
  const credentials = request.body;

  const isAMatch = checkCredentials(credentials);

  let result = { success: false };

  if (isAMatch) {
    const user = getUserByUsername(credentials.username);
    console.log('User', user);

    const token = jwt.sign({ id: user.id}, 'a1b1c1', {
      expiresIn: 600 //Går ut om 10 minuter 
    });

    result.success = true;
    result.token = token;
  }

  response.json(result);
}

function getLoginStatus(request, response) {
  const token = request.header('Authorization').replace('Bearer ', '');

  let result = { loggedIn: false };

  if (token) {
    const tokenVerified = jwt.verify(token, 'a1b1c1');

    console.log('JWT Verify:', tokenVerified);

    if (tokenVerified) {
      result.loggedIn = true;
    }
  }

  response.json(result);
}



module.exports.login = login;
module.exports.getLoginStatus = getLoginStatus;
// module.exports.createNewAccount = createNewAccount;



/**
 * jwt.sign() - signerar en token
 * jwt.verify() - veriferar en token
 */