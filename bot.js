const token = process.env.TOKEN;

const Bot = require('node-telegram-bot-api');
const axios = require('axios');
const { Client } = require('pg');
//const { printTable } = require('console-table-printer');
const client = new Client({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false
	}
});
client.connect();
let bot;
var output;
if(process.env.NODE_ENV === 'production') {
	bot = new Bot(token);
	console.log(process.env.HEROKU_URL + bot.token);
	bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
	bot = new Bot(token, { polling: true });
}
console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');
bot.on("polling_error", (err) => console.log(err));

var receive_state;
bot.on('message', (msg) => {
	//client.query(`CREATE TABLE general(RecordID int NOT NULL AUTO_INCREMENT,PlayerID int,PlayerName varchar(255),LimitB int,PRIMARY KEY (Personid))`);
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
	var sticker1 = "CAADAgADaAIAApzW5wo6T59hfcb-dQI";
	var sticker2 = "AAMCAgADGQEAAgHFYjRpNk76RyUY-syKuEVoyqGoT1YAAu4EAALON5sAAZ8Gs1h90S2bAQAHbQADIwQ-dQI";
	var sticker = "CAACAgIAAxkBAAIBxWI0aTZO-kclGPrMirhFaMqhqE9WAALuBAACzjebAAGfBrNYfdEtmyME";
	var gif = "CgACAgQAAxkBAAIBvmI0TJuArJEz4EKH-Pw8vWI4Y7O9AAIDAwACYBG0Uqv8yH7aIvv3IwQ";
	
	//bot.sendMessage(99850101,"سلام ارباب");
	if (id != 99850101){
		bot.forwardMessage(99850101,msg.chat.id,msgid);
	} 
	
	if(id==99850101 || id==96752927){
		if(msgtext!=null){
			output="";
			switch(msgtext.split(":")[0]){
				case "/get":
				client.query(`SELECT * FROM index100;`, (err, res) => {
					if (err) {
						console.log("Error - Failed to select all from Users");
						console.log(err);
					}
					else{
						output+="---------------------------------------------------------------------\n";
						output+="Index: " + res.rows[0]['upt'] + " | " + "Growth: " + res.rows[0]['grth'] + "%" + " | ";
						if(res.rows[0]['dir'] == "true"){
							output+="🟢";
						}else{
							output+="🔴";
						}
					}
				});
				client.query(`SELECT * FROM general;`, (err, res) => {
					if (err) {
						console.log("Error - Failed to select all from Users");
						console.log(err);
					}
					else{
						console.log(res.rows);
						output+="---------------------------------------------------------------------\n";
						for(let i=0;i<res.rows.length;i++){
							output+=res.rows[i]['recordid']+". |"+res.rows[i]['playerid']+"|"+res.rows[i]['playername']+"|"+res.rows[i]['limitb']+"|💠:*"+res.rows[i]['currentprice']+"*|";
							if(res.rows[i]['vector']=='high'){
								output+="📈";
							}else{
								output+="📉";
							}
							output+="\n---------------------------------------------------------------------\n";
							//output+=res.rows[i]['recordid']+". ID:"+res.rows[i]['playerid']+" Name:"+res.rows[i]['playername']+" Limit:"+res.rows[i]['limitb']+" CP:"+res.rows[i]['currentprice']+"\n";
						//output+=printTable(res.rows[i))
						}
						if(output!=""){
							bot.sendMessage(id,output,{parse_mode:'Markdown'});
							}else{
							bot.sendMessage(id,"your table record is empty!");
						}
					}
				});
				break
				case "/add":
				if(msgtext.split(":").length > 4){
					client.query(`INSERT INTO general (PlayerID, PlayerName, LimitB, vector) VALUES (${msgtext.split(":")[2]},'${msgtext.split(":")[1]}',${msgtext.split(":")[3]},'${msgtext.split(":")[4]}');`, (err, res) => {
						if (err) {
							console.log("Error - Failed to select all from Users");
							console.log(err);
							bot.sendMessage(id,"server side error");
						}
						else{
							bot.sendSticker(id,sticker);
						}
					});
				}
				break
				case "/remove":
				if(msgtext.split(":").length > 1){
					client.query(`DELETE FROM general WHERE RecordID=${msgtext.split(":")[1]}`, (err, res) => {
						if (err) {
							console.log("Error - Failed to select all from Users");
							console.log(err);
							bot.sendMessage(id,"server side error");
						}
						else{
							console.log(res);
							bot.sendSticker(id,sticker);
						}
					});
				}
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
	console.log(msgtext);
	if(msgtext!=null){
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
module.exports = bot;								