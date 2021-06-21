/*
* Routes for events operations
*/
const { Router } = require('express');
const {  user } = require('../middleware/auth');
const { getAllEventsCont, getEventCont, EventBestallning, verifyBiljet } = require('../controller/evntBestallningController');

const router = new Router();

// get all events route
router.get('/', getAllEventsCont);

// get single event
router.get('/buy/:id', getEventCont);

// book a biljett route
router.get('/book/:id', EventBestallning);

// verify biljett route
router.post('/verify/', user, verifyBiljet);

module.exports = router;