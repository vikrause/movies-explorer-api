const router = require('express').Router();

const signup = require('../controllers/signup');

const { signupValidator } = require('../middlewares/celebrateValidator')

router.post('/', signup);

module.exports = router;
