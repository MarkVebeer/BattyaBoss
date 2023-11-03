const { EmbedBuilder } = require("discord.js")

const logSchema = require("../../schemas/loggingSchema.js");

const client = require('../../index.js');

module.exports = {
   name: 'guildMemberNicknameUpdate',
   async execute(member, oldNickname, newNickname) {

    const logData = await logSchema.findOne({ GuildId: member.guild.id });
    if(!logData) return;

    if(logData.GuildId == member.guild.id) {
        if(logData.Enabled == true) {
            const MessageEdited = new EmbedBuilder()
                .setTitle('Valaki megváltoztatta a becenevét!')
                .setColor(0x00FF00)
                .setDescription(`<@${member.user.id}> megváltoztatta a becenevét \nerről: \`${oldNickname}\` \nerre: \`${newNickname}\``)
                .setTimestamp();

            const logChannel = client.channels.cache.get(logData.ChannelId);

            return logChannel.send({ embeds: [MessageEdited] });

        }
    }

   },
};
