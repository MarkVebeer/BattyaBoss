const { EmbedBuilder } = require("discord.js")

const logSchema = require("../../schemas/loggingSchema.js");

const client = require('../../index.js');

module.exports = {
   name: 'guildMemberOnline',
   async execute(member, newStatus) {

    const logData = await logSchema.findOne({ GuildId: member.guild.id });
    if(!logData) return;

    if(logData.GuildId == member.guild.id) {
        if(logData.Enabled == true) {
            const memberOffline = new EmbedBuilder()
                .setTitle('Ember Online')
                .setColor(0x00FF00)
                .setDescription(`<@${member.user.id}> Online lett a mostani státusza: **${newStatus}**!`)
                .setTimestamp();

            const logChannel = client.channels.cache.get(logData.ChannelId);

            return logChannel.send({ embeds: [memberOffline] });

        }
    }

   },
};
