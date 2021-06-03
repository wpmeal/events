const jwt = require('jsonwebtoken');

const { checkCredentials } = require('../model/operations');

/* 
* Login  Controller
* Params: request, response
* Return token/error as json 
*/
 async function login(request, response) {

  let result = null;

  try {
    // Reassign the request body  
    const credentials = request.body;

    // Check credentials result
    const credentialsDB = await checkCredentials(credentials); 
 
    // Log loggedIn user
    console.log('User', credentialsDB.username);

    // Sign loggedIn user using jwt  
    const token = jwt.sign({ id: credentialsDB.id }, 'a1b1c1', {
      expiresIn: 600 //Går ut om 10 minuter 
    });
    // reassign the token of signed user 
    result = token;

    // catch any throwable error from CheckCredentials or jwt.sign 
  } catch (e) {
    // log error to server  
    console.log(e.message);

    // assign catched error as json obj
    result = {
      "error": e.name,      
      "message": e.message
    };

  }
 // return result
  response.json(result);

}

module.exports.login = login;

