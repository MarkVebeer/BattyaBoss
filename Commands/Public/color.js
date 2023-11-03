const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
  EmbedBuilder,
} = require("discord.js");
const { Color, isColor } = require("coloras");

const colorSchema = require("../../schemas/colorSchema");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("color")
    .addStringOption((options) =>
      options
        .setName("color")
        .setDescription("Ide add meg a színt hex codeal")
        .setRequired(true)
    )
    .setDescription("Pongal válaszol!."),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const { options, guild } = interaction;

    const colorData = await colorSchema.findOne({ GuildId: guild.id });
    const reply2 = new EmbedBuilder().setColor(0x00FFFF).setTitle('❌ Sajnálom, de ezen a szerveren az **Adminisztrátor** letiltotta/még nem setupolta a color systemet!');
    if(!colorData) return interaction.reply({embeds: [reply2], ephemeral: true});
    if(colorData.Enabled == false) return interaction.reply({embeds: [reply2], ephemeral: true});

    

    const string = options.getString("color");

    if (!isColor(string).color) {
      const embed = new EmbedBuilder()
        .setTitle("Color")
        .setDescription("Ez nem egy hex szín!")

      return interaction.reply({ embeds: [embed], ephemeral: true });
    }
    const color = new Color(`${string}`);
    const roleColor = color.toHex();

    if (
      guild.members.me.roles.highest.position <
      interaction.member.roles.highest.position
    ) {
      const embed = new EmbedBuilder()
        .setTitle("Color")
        .setDescription("A bot rangja alacsonyabbmint a tiéd!(vedd fel a kapcsolatot a szerver adminnal, hogy tegye megasabbra a bot rangját)!")

      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    const roleName = interaction.member.id;

    const member = interaction.member;

    const memberhighestRole = member.roles.highest.position;

    const higherRole = memberhighestRole + 1;

    let role = guild.roles.cache.find((role) => role.name === `${roleName}`);

    if (role) {
      if (!interaction.member.roles.cache.has(role.id)) {
        const higherRole = memberhighestRole + 1;
        role.edit({
          name: `${roleName}`,
          color: `${roleColor}`,
          position: higherRole,
        });
        member.roles.add(role);

        const embed = new EmbedBuilder()
          .setTitle("Color")
          .setDescription("Megkaptad a színes rangot!")
          .setThumbnail(color.imageUrl);

        return interaction.reply({ embeds: [embed], ephemeral: true });
      }

      const higherRole = memberhighestRole;
      role.edit({
        name: `${roleName}`,
        color: `${roleColor}`,
        position: higherRole,
      });

      const embed = new EmbedBuilder()
        .setTitle("Color")
        .setDescription("Megkaptad a színes rangot!")
        .setThumbnail(color.imageUrl);

      return interaction.reply({ embeds: [embed], ephemeral: true });
    }
    
    const vegsoRole = await guild.roles.create({
      name: `${roleName}`,
      color: `${roleColor}`,
      position: higherRole,
    });

    vegsoRole.setPermissions([]);
    member.roles.add(vegsoRole).catch((err) => console.log(err));

    const embed = new EmbedBuilder()
      .setTitle("Color")
      .setDescription("Megkaptad a színes rangot!")
      .setThumbnail(color.imageUrl);

    return interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
