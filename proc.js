//var cloudscraper = require('cloudscraper');
const { Client } = require('pg');
//const cloudflareScraper = require('cloudflare-scraper');
//const Humanoid = require("humanoid-js");
//const cloudflareScraper = require('cloudflare-scraper');
//const CloudflareBypasser = require('cloudflare-bypasser');
//let cf = new CloudflareBypasser();
const client = new Client({
	connectionString: process.env.DATABASE_URL,
	  ssl: {
    rejectUnauthorized: false
  }
});
client.connect();
/*
cf.request('https://www.futbin.com/19/playerPrices?player=20801')
.then(res => {
  console.log(res);
});

	let humanoid = new Humanoid(autoBypass=false)
humanoid.get("https://www.futbin.com/19/playerPrices?player=20801")
  .then(res => {
  	console.log(res.statusCode) // 503
  	console.log(res.isSessionChallenged) // true
    humanoid.bypassJSChallenge(res)
      .then(challengeResponse => {
      	// Note that challengeResponse.isChallengeSolved won't be set to true when doing manual bypassing.
      	console.log(challengeResponse.body) // <!DOCTYPE html><html lang="en">...
      })
    }
  )
	.catch(err => {
		console.error(err)
	})
*/
	const hooman = require('hooman');

(async () => {
  try {
    const response = await hooman.get('https://www.futbin.com/19/playerPrices?player=20801');
    console.log(response.body);
    //=> '<!doctype html> ...'
  } catch (error) {
    console.log(error.response.body);
    //=> 'Internal server error ...'
  }
})();
/*
(async () => {
  try {
    const response = await cloudflareScraper.get('https://www.futbin.com/19/playerPrices?player=20801');
    console.log(response);
  } catch (error) {
    console.log(error);
  }
})();
*/
async function init() {
	/*
	while(true){
		
		console.log(123);
		await sleep(1000);
	}
	*/
}

function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

init();