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
  name: "guildMemberRemove",

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
        const csaEmbed = new EmbedBuilder()
	        .setColor(0xFF0000)
	        .setTitle(`Viszlát ${user.username}, reméljük hamarosan újra látunk!`)
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

        client.channels.cache.get(welcomeData.ChannelId).send({content: `<@${user.id}>`, embeds: [csaEmbed],})
      }
    }
  },
};
