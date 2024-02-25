const { EmbedBuilder } = require("discord.js")

const logSchema = require("../../schemas/loggingSchema.js");

const client = require('../../index.js');

module.exports = {
   name: 'messageContentEdited',
   async execute(message, oldContent, newContent) {

    const logData = await logSchema.findOne({ GuildId: message.guild.id });
    if(!logData) return;

    if(logData.GuildId == message.guild.id) {
        if(logData.Enabled == true) {
            const MessageEdited = new EmbedBuilder()
                .setTitle('Üzenet szerkesztve!')
                .setColor(0x00FF00)
                .setDescription(`Egy üzenet szerkesztve lett \nerről: \`${oldContent}\` \nerre: \`${newContent}\` \nmessageId: \`${message.id}\` \nÜzenet küldője: <@${message.author.id}> `)
                .setTimestamp();

            const logChannel = client.channels.cache.get(logData.ChannelId);

            return logChannel.send({ embeds: [MessageEdited] });

        }
    }

   },
};
