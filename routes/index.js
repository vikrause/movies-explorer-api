const router = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const signInRouter = require('./signIn');
const signupRouter = require('./signup');
const signOutRouter = require('./signOut');
const auth = require('../middlewares/auth');

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);
router.use('/signin', signInRouter);
router.use('/signup', signupRouter);
router.use('/signout', signOutRouter);

module.exports = router;
