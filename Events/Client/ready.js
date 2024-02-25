const { loadCommands } = require("../../Handlers/commandHandler.js");
const { ActivityType } = require("discord.js");


module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log("The client is now ready.");

        loadCommands(client);

        //client.user.setActivity('Judás Robika - Pergető', { type: ActivityType.Listening });
        client.user.setActivity('Batyam💀', { type: ActivityType.Custom });
        
    }
}