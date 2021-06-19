const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { nanoid } = require('nanoid');
const adapter = new FileSync('model/database.json');
const database = lowdb(adapter);
const { comparePassword } = require('../utility/bcrypt');

/* 
* Get matched credentials  for a user from db
* Params: credentialsDb: an obj with username and password
* Return: user from db that matches the credentials
*/
function getCredentialsDB(credentials){

  const credentialsDb = database.get('staff')
  .find({ username: credentials.username })
  .value();

if (!credentialsDb) {
  throw new Error("Fel användarnamn/lösenord!");

}

return credentialsDb;

}

/* 
* Check if credentials match the username and encrypted password in db
* Params: credentialsDb: an obj with username and password
* Return: user from db that matches the credentials
*/
async function checkCredentials(credentials) {

  let result = false;
  // find the credintilas in  db
  const credentialsDb = getCredentialsDB(credentials);
  // reassign  encrypted password 
  const hashedDbPassword = credentialsDb.password;
   // log request password 
  console.log("Password from user: " + credentials.password);
  // log  encrypted password
  console.log("Hashed Password: " + hashedDbPassword);
 // compare if request password matches the encrypted password
  const comparePasswordResult = await comparePassword(credentials.password, hashedDbPassword);
   // log the comparing result
  console.log("Compare Password: " + comparePasswordResult);
  // if the comparing result is false throw en error
  if (!comparePasswordResult) {
    throw new Error("Fel användarnamn/lösenord!");
  }
  // return credentials for positive checking 
  return result = credentialsDb;;

}

/* Get all events from db
* return events 
*/
function getAllEvents() {
  const events = database.get('events').value();

  if (!events) {
    throw Error('Ingen evenmang hittades');
  }

  return events;
}

/**
 * Get single event
 * @param {*} id: event id
 * @returns event obj
 */

function getEvent(id) {
  
  const singleEvent = database.get('events').find({ id: id });

  console.log(singleEvent);

  if (!singleEvent.value()) {
    throw Error('Ingen evenmang hittades');
  }

  return singleEvent.value();
}

/*
* Get biljett from db
* param: BiljetCode/Num
* return: Biljett Obj
*/
function getBiljett(BiljetNum){

  const Biljet = database.get('Biljeter').find({ id: BiljetNum });
  // if no Biljet found throw error
  if (!Biljet.value()) {
    throw new Error("Biljet finns inte!");
  }
  // return founded Biljet
  return Biljet;
}
/*
* Verify biljett in db
* param: BiljetCode/Num
* return: Biljett Obj
*/
function verifyEventBiljett(BiljetNum) {
  
  console.log("BiljetNum: " + BiljetNum);
  // get biljett data from db
  const Biljet = getBiljett(BiljetNum);
  // log it 
  console.log(Biljet.value());
  // read property of biljett obj that indicates if it has been verified already or not!
   const isVerified = Biljet.get('verify').value();
  
  console.log("isverified: " + isVerified);

  // if verified already throw error
  if (isVerified == "1") {
    throw new Error("Biljet redan verified!");
  }
  // verify the biljett
  const verifiedBiljet = Biljet.assign({ 'verify': '1' }).write();

  // retrun successful verified biljett
  return verifiedBiljet;

}
/*
* Get total number of biljetter for specific event
* param: event Id
* return: number of biljetter
*/
function getTotalAvailableBiljetter(eventId) {

  const countAvailableBiljeter = database.get('events')
    .find({ id: eventId })
    .get('availableBiljeter')
    .value();
  // if no data for it throw error
  if (!countAvailableBiljeter) {
    throw new Error("kunna inte hitta available Biljeter!");
  }

  // log the available number
  console.log("Number of available Biljeter: " + countAvailableBiljeter);

  return countAvailableBiljeter;
}

/*
* Count booked biljetter in db
* param: event Id
* return: number of booked biljetter
*/
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
/*
* Check if booked biljetter less than total biljetter
* param: event Id
* return: boolean
*/
function isBiljetAvailable(eventId) {

  const NumOfAvailableBiljeter = getTotalAvailableBiljetter(eventId);

  const NumOfbookedBiljeter = countBookedBiljeter(eventId);

  const isBiljettAvailble = NumOfAvailableBiljeter > NumOfbookedBiljeter;

  if (!isBiljettAvailble) {
    throw new Error("Den Evenmang är Fully Bokad!");
  }

  return isBiljettAvailble;

}
/*
* Subtract the booked biljetter from the total biljtter
* param: event Id
* return: Int/result of subtraction
*/
function numOfBiljetterKvar(eventId) {

  let numOfBiljetterKvar = null;

  const NumOfAvailableBiljeter = getTotalAvailableBiljetter(eventId);

  const NumOfbookedBiljeter = countBookedBiljeter(eventId);

  numOfBiljetterKvar = NumOfAvailableBiljeter - NumOfbookedBiljeter;

  return numOfBiljetterKvar;

}

/*
* Check of there is a biljett has the same code
* param: biljett Id
* return: Boolean
*/
function isBiljtInDb(biljetId){

  let result  = false;

  const BiljettNumber = database.get('Biljeter')  
  .find({ id: biljetId });  
  
  if (BiljettNumber.value()) {

    result = true;

  }

  return result;
}

/*
* Generate a Biljett Code 
* param: eventId Id
* return: Boolean
*/

 function generateBiljett(eventId) {

  let generatedBiljett = false;

  const biljetId =  nanoid();

  // check if by chanse there is already a biljett  with same code in db
  const isBiljettNumRedanIDB = isBiljtInDb(biljetId);
   
  // if not push a new biljett with generated code to db
  if (!isBiljettNumRedanIDB) {
   
    // reset biljetterKvar that is declared by get all events controller  
    database.get('events').find({id : eventId}).assign({biljetterKvar:""}).write();

    generatedBiljett = database.get('Biljeter').push({
      id: biljetId,
      eventId: eventId,
      verify: "0"
    }).write();
  }

  const newGenBiljett = getBiljett(biljetId).value(); 
  
  console.log("Generated Biljett: "+ newGenBiljett);

  return newGenBiljett;

}

exports.checkCredentials = checkCredentials;
exports.verifyEventBiljett = verifyEventBiljett;
exports.generateBiljett = generateBiljett;
exports.isBiljetAvailable = isBiljetAvailable;
exports.getAllEvents = getAllEvents;
exports.getEvent = getEvent;

exports.numOfBiljetterKvar = numOfBiljetterKvar;
