const { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages, GuildVoiceStates, MessageContent, GuildPresences } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages, GuildVoiceStates, MessageContent, GuildPresences], 
    partials: [User, Message, GuildMember, ThreadMember]
});

module.exports = client;

const { loadEvents } = require("./Handlers/eventHandler");

client.config = require("./config.json");
client.events = new Collection();
client.commands = new Collection();
client.subCommands = new Collection();
client.emotes = client.config.emoji

const { connect } = require("mongoose");
connect(client.config.databaseURL, {
}).then(() => console.log("The client is now connected to the database."))

loadEvents(client).catch((err) => console.log(err))

const logs = require('discord-logs');
logs(client, {
    debug: true
});

/* anticrash: */
const process = require('node:process');
process.on('unhandledRejection', async (reason, promise) =>{
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception:', err);
});

process.on('uncaughtExceptionMonitor', (err, origin) =>{
  console.log('Uncaught Exception Monitor', err, origin);
});
console.log("Anticrash has been loaded.")


client.login(client.config.token)