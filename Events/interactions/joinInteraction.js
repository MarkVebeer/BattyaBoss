const {
  Client,
  CommandInteraction,
  ChatInputCommandInteraction,
  EmbedBuilder,
  Attachment,
  GuildMember,
  CommandInteractionOptionResolver,
  userMention,
} = require("discord.js");

const welcomeSchema = require("../../schemas/welcomeSchema.js");

module.exports = {
  name: "guildMemberAdd",

  /**
   * @param {Client} client
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {

    const { user, guild } = interaction;

    const welcomeData = await welcomeSchema.findOne({ GuildId: guild.id });

    if(!welcomeData) return;

    if(welcomeData.GuildId == guild.id) {
      if(welcomeData.Enabled == true) {
        const udvEmbed = new EmbedBuilder()
	        .setColor(0x00FF00)
	        .setTitle(`Üdv, a ${guild.name} szerveren ${user.username}!`)
          .setThumbnail(user.displayAvatarURL())
	        .addFields(
            {
              name: "Fiók létrehozva:",
              value: `<t:${parseInt(user.createdTimestamp / 1000)}:R>`,
              inline: true,
            },
            {
              name: "Ennyien lettünk:",
              value: `${interaction.guild.memberCount}`,
              inline: true,
            }
          )
	        .setTimestamp()

        client.channels.cache.get(welcomeData.ChannelId).send({content: `<@${user.id}>`, embeds: [udvEmbed],})
      }
    }
  },
};
