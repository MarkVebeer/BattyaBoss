const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDMPermission(false)
    .addNumberOption((options) =>
      options
        .setName("amount")
        .setRequired(true)
        .setDescription("Add meg hány üzenetet töröljek(max 99)")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDescription("Kitöröl üzeneteket!"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const { channel, options } = interaction;

    const Amount = options.getNumber("amount");
    if(Amount > 99) return interaction.reply({content: "Ez a szám nagyobb mint 99! Tehát a discord api miatt nem tudok ennyit törölni!", ephemeral: true})
    if(Amount < 0) return interaction.reply({content: "Ez a szám kisebb mint 0! Te buta vagy?", ephemeral: true})


    const Response = new EmbedBuilder();

    await channel.bulkDelete(Amount, true).then((messages) => {
      Response.setDescription(`🧹 Töröltem ${messages.size} üzenetet`);
      return interaction
        .reply({
          embeds: [Response],
          fetchReply: true,
        })
        .then((m) => {
          setTimeout(() => {
            m.delete();
          }, 5 * 1000);
        })
        .catch(() => {});
    });
  },
};
