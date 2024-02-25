const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder  } = require("discord.js");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong-al válaszol"),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    execute(interaction, ) {
        const reply = new EmbedBuilder().setColor(0x00FFFF).setTitle(`🏓 Pong`)
        interaction.reply({embeds: [reply]});

    }

}