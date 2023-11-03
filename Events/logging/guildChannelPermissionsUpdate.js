const { EmbedBuilder } = require("discord.js")

const logSchema = require("../../schemas/loggingSchema.js");

const client = require('../../index.js');

module.exports = {
   name: 'guildChannelPermissionsUpdate',
   async execute(channel) {

    const logData = await logSchema.findOne({ GuildId: channel.guild.id });
    if(!logData) return;

    if(logData.GuildId == channel.guild.id) {
        if(logData.Enabled == true) {
            const MessageEdited = new EmbedBuilder()
                .setTitle('Csatorna jogosultságok frissítve!')
                .setColor(0x00FF00)
                .setDescription(`Egy csatorna jogosultságai frissítve lettek \nchannel: ${channel}`)
                .setTimestamp();

            const logChannel = client.channels.cache.get(logData.ChannelId);

            return logChannel.send({ embeds: [MessageEdited] });

        }
    }

   },
};
