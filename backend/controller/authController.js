const { nanoid } = require('nanoid');
const jwt = require('jsonwebtoken');

const { checkCredentials, getUserByUsername
} = require('../model/operations');

// const { comparePassword } = require('../utility/bcrypt');

 async function login(request, response) {
  let result = null;
  try {

    const credentials = request.body;

    const credentialsDB = await checkCredentials(credentials); 

    if(!credentialsDB)
    throw new Error("Fel användarnamn/lösenord!");

    console.log('User', credentialsDB.username);

    const token = jwt.sign({ id: credentialsDB.id }, 'a1b1c1', {
      expiresIn: 600 //Går ut om 10 minuter 
    });

    //result.success = true;
    result = token;
    //}
  } catch (e) {
    result = {
      "name": e.name,
      "message": e.message
    };
  }
  response.json(result);
}

function getLoginStatus(request, response) {
  let result = null;
   try {
  const token = request.header('Authorization').replace('Bearer ', '');

  //let result = { loggedIn: false };

  if (token) {
    const tokenVerified = jwt.verify(token, 'a1b1c1');

    console.log('JWT Verify:', tokenVerified);

    if (tokenVerified) {
      result = true;
    }
  }
}catch(e){
  result = {
    "name": e.name,
    "message": e.message
  };
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