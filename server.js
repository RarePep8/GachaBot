const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const dbHelper = require("./db-helper.js");
const guildList = ["12345","2312"];
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  initialize();
});

function initialize(){
	dbHelper.initialize(guildList);
}
client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});

client.login(config.bot_token);
