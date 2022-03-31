const Discord = require("discord.js");
const { updateOneInCollection } = require('../utils/mongo');

module.exports = {
    async execute(message, args, client) {
        if (!args.length) {
            // Get
        } else {
            // Set
            const prefix = args[0];

            const update = {
                $set: {
                    prefix: prefix
                }
            };

            await updateOneInCollection("settings", message.guild.id, update, {upsert: true});
            
            const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setDescription(`Changed the server prefix to \`${prefix}\``)
            message.channel.send(embed);
        }
    }
}