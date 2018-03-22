const rp = require('request-promise');
const db = require('../server/db')
const { updateCoinList, updateCoinHist } = require('./crypto-compare');

// seeding loop to update coin data once deployed
const loop = async function () {
  if (isIntervalInProgress)
    return false;
  isIntervalInProgress = true;
  try {
    await db.sync({ force: true })
    console.log('db synced!')
  } catch (e) {
    console.log(e);
  }
  try {
    await updateCoinList();
    console.log(`seeded coins list`)
  } catch (e) {
    console.log(e);
  }
  try {
    await Promise.all(await updateCoinHist());
    console.log(`seeded all coin data successfully`);
    console.log("SEEDED LOOP COMPLETE")
    isIntervalInProgress = false;
  } catch (e) {
    console.log(e);
  }
}

var isIntervalInProgress = false;

async function seedCoins() {
  setInterval(await loop, 1800000);
}

seedCoins();

module.exports = seedCoins;
