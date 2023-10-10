const router = require('express').Router();

const signIn = require('../controllers/signIn');

const { signInValidator } = require('../middlewares/celebrateValidator')

router.post('/', signIn);

module.exports = router;
