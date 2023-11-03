const { EmbedBuilder } = require("discord.js")

const logSchema = require("../../schemas/loggingSchema.js");

const client = require('../../index.js');

module.exports = {
   name: 'guildMemberUnboost',
   async execute(member) {

    const logData = await logSchema.findOne({ GuildId: channel.guild.id });
    if(!logData) return;

    if(logData.GuildId == channel.guild.id) {
        if(logData.Enabled == true) {
            const MessageEdited = new EmbedBuilder()
                .setTitle('Valaki már nem boostol!')
                .setColor(0x00FF00)
                .setDescription(`<@${member.user.id}> már nem boostolja tovább a szervert!`)
                .setTimestamp();

            const logChannel = client.channels.cache.get(logData.ChannelId);

            return logChannel.send({ embeds: [MessageEdited] });

        }
    }

   },
};
