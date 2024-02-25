const { EmbedBuilder } = require("discord.js")

const logSchema = require("../../schemas/loggingSchema.js");

const client = require('../../index.js');

module.exports = {
   name: 'rolePositionUpdate',
   async execute(role, oldPosition, newPosition) {

    const logData = await logSchema.findOne({ GuildId: role.guild.id });
    if(!logData) return;

    if(logData.GuildId == role.guild.id) {
        if(logData.Enabled == true) {
            const MessageEdited = new EmbedBuilder()
                .setTitle('Rang helyzet frissítve!')
                .setColor(0x00FF00)
                .setDescription(`Egy rang át lett helyezve \ninnen: \`${oldPosition}\` \nide: \`${newPosition}\` \nroleId: \`${role.id}\``)
                .setTimestamp();

            const logChannel = client.channels.cache.get(logData.ChannelId);

            return logChannel.send({ embeds: [MessageEdited] });

        }
    }

   },
};
