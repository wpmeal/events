const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { nanoid } = require('nanoid');
const adapter = new FileSync('model/database.json');
const database = lowdb(adapter);

const { comparePassword } = require('../utility/bcrypt');


function getCredentialsDB(credentials){
  const credentialsDb = database.get('staff')
  .find({ username: credentials.username })
  .value();

if (!credentialsDb) {
  throw new Error("Fel användarnamn/lösenord!");
}
return credentialsDb;
}


async function checkCredentials(credentials) {
  let result = false;
/*
  const credentialsDb = database.get('staff')
    .find({ username: credentials.username })
    .value();

  if (!credentialsDb) {
    throw new Error("Fel användarnamn/lösenord!");
  }
  */
  const credentialsDb = getCredentialsDB(credentials);

  const hashedDbPassword = credentialsDb.password;

  console.log("Password from user: " + credentials.password);

  console.log("Hashed Password: " + hashedDbPassword);

  const comparePasswordResult = await comparePassword(credentials.password, hashedDbPassword);

  console.log("Compare Password: " + comparePasswordResult);

  if (!comparePasswordResult) {
    throw new Error("Fel användarnamn/lösenord!");
  }

  return result = credentialsDb;;

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

function getBiljett(BiljetNum){
  const Biljet = database.get('Biljeter').find({ id: BiljetNum });
  if (!Biljet.value()) {
    throw new Error("Biljet finns inte!");
  }
  return Biljet;
}
function verifyEventBiljett(BiljetNum) {
  console.log("BiljetNum: " + BiljetNum);
  //try {
  //const Biljet = database.get('Biljeter').find({ id: BiljetNum });

  //if (!Biljet.value()) {
  //  throw new Error("Biljet finns inte!");
  //}
  const Biljet = getBiljett(BiljetNum);

  console.log(Biljet);

   const isVerified = Biljet.get('verify').value();

  //const isVerified = Biljet.verify;

  console.log("isverified: " + isVerified);


  if (isVerified == "1") {
    throw new Error("Biljet redan verified!");
  }
  // Biljet.verify = "1";
  const verifiedBiljet = Biljet.assign({ 'verify': '1' }).write();

  return verifiedBiljet;

}

function getTotalAvailableBiljetter(eventId) {

  const countAvailableBiljeter = database.get('events')
    .find({ id: eventId })
    .get('availableBiljeter')
    .value();

  if (!countAvailableBiljeter) {
    throw new Error("kunna inte hitta available Biljeter!");
  }


  console.log("Number of available Biljeter: " + countAvailableBiljeter);

  return countAvailableBiljeter;
}

function countBookedBiljeter(eventId) {
  let countBookedBiljeter = 0;

  const bookedBiljeter = database.get('Biljeter')
    .filter({ eventId: eventId }).value();

  if (bookedBiljeter) {
    countBookedBiljeter = bookedBiljeter.length;
  }

  console.log("Booked Biljeter: " + countBookedBiljeter);

  return countBookedBiljeter;

}
function isBiljetAvailable(eventId) {

  const NumOfAvailableBiljeter = getTotalAvailableBiljetter(eventId);

  const NumOfbookedBiljeter = countBookedBiljeter(eventId);

  const isBiljettAvailble = NumOfAvailableBiljeter > NumOfbookedBiljeter;

  if (!isBiljettAvailble) {
    throw new Error("Den Evenmang är Fully Bokad!");
  }

  return isBiljettAvailble;

}

function numOfBiljetterKvar(eventId) {

  let numOfBiljetterKvar = null;

  const NumOfAvailableBiljeter = getTotalAvailableBiljetter(eventId);

  const NumOfbookedBiljeter = countBookedBiljeter(eventId);

  numOfBiljetterKvar = NumOfAvailableBiljeter - NumOfbookedBiljeter;

  return numOfBiljetterKvar;

}
function isBiljtInDb(biljetId){
  let result  = false;
  const BiljettNumber = database.get('Biljeter')
  .find({ id: biljetId });  
  if (BiljettNumber.value()) {
    result = true;
  }
  return result;
}
 function generateBiljett(eventId) {
  let generatedBiljett = false;
  const biljetId =  nanoid();
 // const biljetId = "1sGPsmXd9RW3ZHHKu05lD";

  // get samma biljett från db
  //const BiljettNumber = database.get('Biljeter')
   // .find({ id: biljetId });

  // console.log(BiljettNumber.value());
  //push({id : biljetId, verify: "0"}).write();

  // test if 
  const isBiljettNumRedanIDB = isBiljtInDb(biljetId);

  if (!isBiljettNumRedanIDB) {
    // console.log( database.get('events').value());
   // reset biljetterKvar property from events db
    database.get('events').find({id : eventId}).assign({biljetterKvar:""}).write();

    generatedBiljett = database.get('Biljeter').push({
      id: biljetId,
      eventId: eventId,
      verify: "0"
    }).write();
  }

  const newGenBiljett = getBiljett(biljetId).value(); 

  console.log(newGenBiljett);

  return newGenBiljett;

}

//exports.initiateDatabase = initiateDatabase;
// exports.createAccount = createAccount;
exports.checkCredentials = checkCredentials;
exports.verifyEventBiljett = verifyEventBiljett;
exports.generateBiljett = generateBiljett;
exports.isBiljetAvailable = isBiljetAvailable;
exports.getAllEvents = getAllEvents;
exports.getUserByUsername = getUserByUsername;
exports.numOfBiljetterKvar = numOfBiljetterKvar;
