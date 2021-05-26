const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { nanoid } = require('nanoid');
const adapter = new FileSync('model/database.json');
const database = lowdb(adapter);


//function initiateDatabase() {
 // database.defaults({ users:[] }).write();
//}

//function createAccount(account) {
//  return database.get('users').push(account).write();
//}

function checkCredentials(credentials) {
  return database.get('staff')
      .find({ username: credentials.username, password: credentials.password })
      .value();
}
function getUserByUsername(username) {
  return database.get('staff').find({ username: username }).value();
}
function getAllevents() {
  return database.get('events')
      .value();
}

function verifyEventBiljett(BiljetNum ) {
   const isverified = 
   database.get('events').get('Biljeter').find({ id: BiljetNum}).get('verify').value();

    console.log("isverified: "+ isverified);
/*
    if(!isverified){
      database.get('events').find({ id: eventId})
      .get('Biljeter').find({ id: BiljetNum})
      .assign({ 'verify': '1' })
      .write();
    } */
}
function isBiljetAvailable(eventId){
  console.log("eventId"+eventId);
  const availableBiljeter = database.get('events')
  .find({ id: eventId})
  .get('availableBiljeter')
  .value();
  console.log(availableBiljeter);

  //const BiljeterGNumber = database.get('events')
  //.find({ id: eventId}).get('Biljeter');

  //console.log(BiljeterGNumber.values());

  return availableBiljeter > 1;

}
function generateBjljet(eventId){
  const biljetId = nanoid();
  const BiljeterGNumber = database.get('events')
  .find({ id: eventId}).get('Biljeter').push({id : biljetId, verify: "0"}).write();

  return BiljeterGNumber;

}

//exports.initiateDatabase = initiateDatabase;
// exports.createAccount = createAccount;
exports.checkCredentials = checkCredentials;
exports.verifyEventBiljett = verifyEventBiljett;
exports.generateBjljet = generateBjljet;
exports.isBiljetAvailable = isBiljetAvailable;
exports.getAllevents = getAllevents;
exports.getUserByUsername = getUserByUsername;
