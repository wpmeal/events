const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { nanoid } = require('nanoid');
const adapter = new FileSync('model/database.json');
const database = lowdb(adapter);

const { comparePassword } = require('../utility/bcrypt');


async function checkCredentials(credentials) {
  let result = false;

  const credentialsDb = database.get('staff')
    .find({ username: credentials.username })
    .value();

  if (!credentialsDb) {
    throw new Error("Fel användarnamn/lösenord!");
  }

  const hashedDbPassword = credentialsDb.password;

  console.log("Password from user: " + credentials.password);

  console.log("Hashed Password: " + hashedDbPassword);

  const comparePasswordResult = await comparePassword(credentials.password, hashedDbPassword);

  console.log("Compare Password: " + comparePasswordResult);

  if (comparePasswordResult) {
    result = credentialsDb;
  }

  return result;

}



function getUserByUsername(username) {
  return database.get('staff').find({ username: username }).value();
}


function getAllEvents() {
  const events = database.get('events').value();

  if (!events) {
    throw Error('Ingen evenmang hittades');
  }

  return events;
}

function verifyEventBiljett(BiljetNum) {
  console.log("BiljetNum: "+ BiljetNum);
  //try {
  const Biljet = database.get('Biljeter').find({ id: BiljetNum });

  if (!Biljet.value()) {
    throw new Error("Biljet finns inte!");
  }
  const isVerified = Biljet.get('verify').value();

  console.log("isverified: " + isVerified);


  if (isVerified == "1") {
    throw new Error("Biljet redan verified!");
  }

  const verifiedBiljet = Biljet.assign({ 'verify': '1' }).write();

  return verifiedBiljet;

}



function isBiljetAvailable(eventId) {
  let countBookedBiljeter = 0;

  const countAvailableBiljeter = database.get('events')
    .find({ id: eventId })
    .get('availableBiljeter')
    .value();

  if (!countAvailableBiljeter) {
    throw new Error("kunna inte hitta available Biljeter!");
  }


  console.log("Number of available Biljeter: " + countAvailableBiljeter);

  const bookedBiljeter = database.get('Biljeter')
    .filter({ eventId: eventId }).value();

  // if(!bookedBiljeter){
  //  throw new Error("kunna inte hitta booked Biljeter!");  
  // }
  if (bookedBiljeter) {
    countBookedBiljeter = bookedBiljeter.length;
  }

  console.log("Booked Biljeter: " + countBookedBiljeter);

  const isBiljettAvailble = countAvailableBiljeter > countBookedBiljeter;

  if (!isBiljettAvailble) {
    throw new Error("Den Evenmang är Fully Bokad!");
  }

  return isBiljettAvailble;

}
function generateBiljett(eventId) {
  let generatedBiljett = false;
  const biljetId = nanoid();
  // const biljetId = "nrFJ5i4iKmWnOupjg22jY";

  // get samma biljett från db
  const BiljettNumber = database.get('Biljeter')
    .find({ id: biljetId });

  // console.log(BiljettNumber.value());
  //push({id : biljetId, verify: "0"}).write();

  // test if 
  if (!BiljettNumber.value()) {
    generatedBiljett = database.get('Biljeter').push({
      id: biljetId,
      eventId: eventId,
      verify: "0"
    }).write();
  }

  return generatedBiljett;




}

//exports.initiateDatabase = initiateDatabase;
// exports.createAccount = createAccount;
exports.checkCredentials = checkCredentials;
exports.verifyEventBiljett = verifyEventBiljett;
exports.generateBiljett = generateBiljett;
exports.isBiljetAvailable = isBiljetAvailable;
exports.getAllEvents = getAllEvents;
exports.getUserByUsername = getUserByUsername;
