const { EmbedBuilder } = require("discord.js")

const logSchema = require("../../schemas/loggingSchema.js");

const client = require('../../index.js');

module.exports = {
   name: 'voiceChannelMute',
   async execute(member, muteType) {

    const logData = await logSchema.findOne({ GuildId: member.guild.id });
    if(!logData) return;

    if(logData.GuildId == member.guild.id) {
        if(logData.Enabled == true) {
            const MessageEdited = new EmbedBuilder()
                .setTitle('Valaki le lett némítva!')
                .setColor(0x00FF00)
                .setDescription(`ember: ${member} \ntípus: \`${muteType}\``)
                .setTimestamp();

            const logChannel = client.channels.cache.get(logData.ChannelId);

            return logChannel.send({ embeds: [MessageEdited] });

        }
    }

   },
};
