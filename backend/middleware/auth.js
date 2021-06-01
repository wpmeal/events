const jwt = require('jsonwebtoken');
const { refreshToken } = require('../utility/bcrypt');


 function user(request, response, next) {
  try {
    const token = request.header('Authorization').replace('Bearer ', '');
    console.log(token);
    //console.log("BBID"+ request.body.biljetId);
    const data = jwt.verify(token, 'a1b1c1');
    console.log('User middleware', data);

   //if(!data.id) {
    //  console.log('User middleware', data);
    // throw Error();
    //} else {
      request.userId = data.id;
      //request.token = refreshToken(data.id);
      next();
    //}

  } catch(e) {
    response.status(401).
    json({
      "error": "tokenVerifyError",
      "message": "Permission Denied!"
       });
  }
}

exports.user = user;