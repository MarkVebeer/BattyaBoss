const {  SlashCommandBuilder, EmbedBuilder, Client } = require('discord.js');
const { getTomorrowsWeather } = require("../../Functions/weather.js");


module.exports = {
   data: new SlashCommandBuilder()
      .setName('weather')
      .setDescription("Rank lekérdezés")
      .addStringOption((option) =>
         option
            .setName('location')
            .setDescription('Hely:')
            .setRequired(true)
      ),
      /**
        *
        * @param {Client} client
        */
   async execute(interaction, client) {

        const location = interaction.options.getString('location');
        try {
            const weather = await getTomorrowsWeather(`${location}`);
            interaction.reply({
                embeds: [
                  new EmbedBuilder()
                    .setColor(0x00FFFF)
                    .setTitle(`🌥️ Tomorrow's Weather`)
                    .addFields(
                      { name: "🧭 Hely: ", value: location, inline: true },
                      { name: "☁️ Időjárás: ", value: `${weather[0]}`, inline: true },
                      { name: "🌡️ Átlag hőmérséklet: ", value: `${weather[1]}`, inline: true },
                      
                    ),
                ],
                ephemeral: true,
            });
        } catch (err) {
            console.log(err)
        }
   },
};
