const { Router } = require('express');
const router = new Router();

const {  user } = require('../middleware/auth');
const { getAllEventsCont, EvntBestallning, verifyBiljet } = require('../controller/evntBestallningController');

router.get('/', getAllEventsCont);

//router.get('/all', user, EvntBestallning);

router.post('/:id', EvntBestallning);

router.post('/verify/:id', verifyBiljet);


//router.delete('/remove', user, removeAccount);

module.exports = router;