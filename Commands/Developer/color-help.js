const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("color-help")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDescription("alap color help embed"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction) {
    const { channel } = interaction;
    const embed1 = new EmbedBuilder()
      .setDescription(
        "Ha szeretnéd, hogy a neved színes legyen ezen a szerveren, azt megteheted a /color parancsal. Ez a parancs bármelyik szobában működik ahol van engedélyed használni a parancsot, viszont hex code szükséges hozzá. A lenti oldalon megadod a színt majd megadhatod a botnak\npl: /color #27F9E5 \nhttps://htmlcolorcodes.com/"
      )
      .setColor("Yellow")
      .setTitle(`Color`);


    channel.send({embeds: [embed1]});
    
    return interaction.reply({
      content: "Ez az üzenet rövidessen törlődni fog ha minden igaz.",
      fetchReply: true,
    })
    .then((m) => {
      setTimeout(() => {
        m.delete();
      }, 1 * 1000);
    })
    .catch((err) => {console.log(err)});
  },
};
