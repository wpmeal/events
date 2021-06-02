/*
* ComparePassword
* params: unhashed password, hashed password
* return boolean 
*/

const bcrypt = require('bcrypt');
const saltRounds = 10;

async function comparePassword(password, hash) {
  // compare hashed pass to human pass 
  const isTheSame = await bcrypt.compare(password, hash);
  return isTheSame;
}

exports.comparePassword = comparePassword;
