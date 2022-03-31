const path = require('path');
const Discord = require('discord.js');
const config = require('./config.json');
const db = require('./src/utils/mongo');
const { loadEvents, loadCommands } = require('./src/utils/functions.js')

// Client setup
const client = new Discord.Client();
client.config = config;
client.commands = new Discord.Collection();

function init() {
	loadCommands(client, './src/commands');
	loadEvents(client, './src/events');
	client.login(config.token);
}

init();