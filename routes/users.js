const router = require('express').Router();

const {
  getUserInfo,
  updateUserInfo
} = require('../controllers/users')

router.get('/me', getUserInfo);
router.patch('/me',/* validate */ updateUserInfo);

module.exports = router;
