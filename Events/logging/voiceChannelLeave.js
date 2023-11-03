const { EmbedBuilder } = require("discord.js")

const logSchema = require("../../schemas/loggingSchema.js");

const client = require('../../index.js');

module.exports = {
   name: 'voiceChannelLeave',
   async execute(member, channel) {

    const logData = await logSchema.findOne({ GuildId: channel.guild.id });
    if(!logData) return;

    if(logData.GuildId == channel.guild.id) {
        if(logData.Enabled == true) {
            const MessageEdited = new EmbedBuilder()
                .setTitle('Hangcsatorna kilépés!')
                .setColor(0x00FF00)
                .setDescription(`<@${member.user.id}> kilépett egy hangcsatornából \ncsatorna: ${channel} \nchannelId: \`${channel.id}\``)
                .setTimestamp();

            const logChannel = client.channels.cache.get(logData.ChannelId);

            return logChannel.send({ embeds: [MessageEdited] });

        }
    }

   },
};
