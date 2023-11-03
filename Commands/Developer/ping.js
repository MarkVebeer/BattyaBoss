const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, Client  } = require("discord.js");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong-al válaszol")
    .addSubcommand((options) => options
    .setName("picsa")
    .setDescription("Azt mondja picsa"))
    .addSubcommand((options) => options
    .setName("fasz")
    .setDescription("Azt mondja fasz")),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */

    execute(interaction, client) {
        const subCommand = interaction.options.getSubcommand();

        switch(subCommand) {
            case "picsa" : {
                const reply1 = new EmbedBuilder().setColor(0x00FFFF).setTitle(`✅ Szerintem picsa`)
                return interaction.reply({embeds: [reply1]});
            }
            break;
            case "fasz" : {
                const reply2 = new EmbedBuilder().setColor(0x00FFFF).setTitle(`✅ Szerintem fasz`)
                return interaction.reply({embeds: [reply2]});
            }
            break;
        }
    }

}