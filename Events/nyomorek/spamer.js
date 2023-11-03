const { EmbedBuilder } = require("discord.js")

const client = require('../../index.js');

module.exports = {
   name: 'voiceChannelSwitch',
   async execute(member, oldChannel, newChannel) {
       
    if (newChannel.id === "1141371617193250847") {
        const afkChannel = client.channels.cache.get("932270908146581524");
  		async function sendMessages() {
    		for (let i = 0; i < 5; i++) {
      			await client.users.send(`${member.user.id}`, `<@${member.user.id}> Nyomorek vagy :)`);
    		}
    		member.edit({ channel: afkChannel });
  		}
  		sendMessages();
	}


    

   },
};
