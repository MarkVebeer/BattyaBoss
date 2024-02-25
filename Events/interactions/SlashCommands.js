const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js")

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute(interaction, client) {
        if(!interaction.isChatInputCommand()) return;

        const { channel } = interaction;
        const reply3 = new EmbedBuilder().setColor(0x00FFFF).setTitle('❌ Kérlek próbáld meg ezt a parancsot egy szerveren futtatni!.')
        if(!channel) return interaction.reply({embeds: [reply3], ephemeral: true})

        const command = client.commands.get(interaction.commandName);
        const reply1 = new EmbedBuilder().setColor(0x00FFFF).setTitle('❌ Ez a parancs már törölve lett a botból, amint frissít az alkalmazásod/te újraindítod, már nem lesz a listában.')
        if(!command) return interaction.reply({embeds: [reply1], ephemeral: true})

        const reply2 = new EmbedBuilder().setColor(0x00FFFF).setTitle('❌ Ezt a parancsot csak a fejlesztők használhatják!.')
        if(command.developer && interaction.user.id !== "1013502143967281264") return interaction.reply({embeds: [reply2], ephemeral: true})
        
        

        command.execute(interaction, client)
    }
}