const { EmbedBuilder } = require("discord.js")

const logSchema = require("../../schemas/loggingSchema.js");

const client = require('../../index.js');

module.exports = {
   name: 'voiceChannelUndeaf',
   async execute(member, deafType) {

    const logData = await logSchema.findOne({ GuildId: member.guild.id });
    if(!logData) return;

    if(logData.GuildId == member.guild.id) {
        if(logData.Enabled == true) {
            const MessageEdited = new EmbedBuilder()
                .setTitle('Valaki nincs tovább süketítve!')
                .setColor(0x00FF00)
                .setDescription(`ember: ${member} \ntípus: \`${deafType}\``)
                .setTimestamp();

            const logChannel = client.channels.cache.get(logData.ChannelId);

            return logChannel.send({ embeds: [MessageEdited] });

        }
    }

   },
};
