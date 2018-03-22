const router = require('express').Router();
const googleTrends = require('google-trends-api');
const moment = require('moment')

let date = new Date();
let oneWeek = Number(date.getTime() - (167 * 60 * 60 * 1000));
let oneDay = Number(date.getTime() - (24 * 60 * 60 * 1000));
let oneHour = Number(date.getTime() - (1 * 60 * 60 * 1000));

// query search
router.get('/one-week', (req, res, next) => {
  let searchTerm = req.query.searchTerm;
  googleTrends.interestOverTime({ keyword: `${searchTerm}`, startTime: new Date(oneWeek), endTime: new Date(Date.now()), granularTimeResolution: true })
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/one-day', (req, res, next) => {
  let searchTerm = req.query.searchTerm;
  googleTrends.interestOverTime({ keyword: `${searchTerm}`, startTime: new Date(oneDay), endTime: new Date(Date.now()), granularTimeResolution: true })
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/one-hour', (req, res, next) => {
  let searchTerm = req.query.searchTerm;
  googleTrends.interestOverTime({ keyword: `${searchTerm}`, startTime: new Date(oneHour), endTime: new Date(Date.now()), granularTimeResolution: true })
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;