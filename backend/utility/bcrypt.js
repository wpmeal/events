const bcrypt = require('bcrypt');
const saltRounds = 10;
//const plainPassword = 'pwd123';

/** Använder oss av callback-funktioner */
/*
bcrypt.hash(plainPassword, saltRounds, (error, hash) => {
  console.log(hash);
  bcrypt.compare('pwd123', "$2b$10$zAaxd5Jk9xa0ARtnygdI5ue3Z/zmHNbwPCBkrP79.rLtuuybNCf5e", (error, result) => {
    console.log('Password check is!!!: ', result);
  });
}); */

/** Då Bcrypt använder sig av promise så kan vi använda async/await för att köra funktionerna
 * asynkront som i nedan exempel
 */
async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function comparePassword(password, hash) {
  const isTheSame = await bcrypt.compare(password, hash);
  return isTheSame;
}

function refreshToken(userId) {
    return jwt.sign({ id: userId}, 'a1b1c1', {
      expiresIn: 600 //Går ut om 10 min
    })
  }
/*
async function checkPass() {
  const hashedPass = await hashPassword();
  const match = await comparePassword('chris123', hashedPass);
  console.log('Match:', match);
} */

// checkPass();

exports.comparePassword = comparePassword;
exports.refreshToken = refreshToken;
