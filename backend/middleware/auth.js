const jwt = require('jsonwebtoken');

function user(request, response, next) {
  try {
    const token = request.header('Authorization').replace('Bearer ', '');
    console.log(token);
    const data = jwt.verify(token, 'a1b1c1');
    console.log('User middleware', data);

    if(!data) {
      throw Error();
    } else {
      request.userId = data.id;
      next();
    }

  } catch(error) {
    response.status(401).json({ success: false, message: 'Permission denied' });
  }
}

exports.user = user;