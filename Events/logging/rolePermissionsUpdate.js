const { EmbedBuilder } = require("discord.js")

const logSchema = require("../../schemas/loggingSchema.js");

const client = require('../../index.js');

module.exports = {
   name: 'rolePermissionsUpdate',
   async execute(role, oldPermissions, newPermissions) {

    const logData = await logSchema.findOne({ GuildId: role.guild.id });
    if(!logData) return;

    if(logData.GuildId == role.guild.id) {
        if(logData.Enabled == true) {
            const MessageEdited = new EmbedBuilder()
                .setTitle('Rang jogosultságok frissítve!')
                .setColor(0x00FF00)
                .setDescription(`Egy rang jogosultságai változtak \nerről: \`${oldPermissions}\` \nerre: \`${newPermissions}\` \nroleId: \`${role.id}\``)
                .setTimestamp();

            const logChannel = client.channels.cache.get(logData.ChannelId);

            return logChannel.send({ embeds: [MessageEdited] });

        }
    }

   },
};
