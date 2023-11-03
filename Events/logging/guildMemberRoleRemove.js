const { EmbedBuilder } = require("discord.js")

const logSchema = require("../../schemas/loggingSchema.js");

const client = require('../../index.js');

module.exports = {
   name: 'guildMemberRoleRemove',
   async execute(member, role) {

    const logData = await logSchema.findOne({ GuildId: role.guild.id });
    if(!logData) return;

    if(logData.GuildId == role.guild.id) {
        if(logData.Enabled == true) {
            const MessageEdited = new EmbedBuilder()
                .setTitle('Valakitől elvettek egy rangot!')
                .setColor(0x00FF00)
                .setDescription(`<@${member.user.id}> -ről levették a ${role.name} rangot!\n roleId: \`${role.id}\``)
                .setTimestamp();

            const logChannel = client.channels.cache.get(logData.ChannelId);

            return logChannel.send({ embeds: [MessageEdited] });

        }
    }

   },
};
