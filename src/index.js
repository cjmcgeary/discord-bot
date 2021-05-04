// load modules
const fs = require('fs');
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();
client.config = require('../config.json');

// register event listeners
const eventFiles = fs.readdirSync('src/events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

// login to Discord with your app's token
client.login(client.config.token);