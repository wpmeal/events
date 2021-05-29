const { Router } = require('express');
const router = new Router();

const {  user } = require('../middleware/auth');
const { getAllEventsCont, EventBestallning, verifyBiljet } = require('../controller/evntBestallningController');

router.get('/', getAllEventsCont);

//router.get('/all', user, EvntBestallning);

router.get('/book/:id', EventBestallning);

router.post('/verify/', user, verifyBiljet);


//router.delete('/remove', user, removeAccount);

module.exports = router;