const router = require('express').Router();
module.exports = router

router.use('/crypto-compare', require('./crypto-compare'));
router.use('/twitter', require('./twitter'));
router.use('/google-trends', require('./google-trends'));

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
});
