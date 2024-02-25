const {
    SlashCommandBuilder,
    EmbedBuilder,
    ChatInputCommandInteraction,
    PermissionFlagsBits
} = require("discord.js");

const rankSchema = require("../../schemas/rankSchema.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setuprank")
        .setDescription("Ranking rendszer setup.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addBooleanOption(bolean =>
            bolean
                .setName("on-off")
                .setDescription("True = bekapcsolás, False = kikapcsolás")
                .setRequired(true)
        ),

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */

    async execute(interaction, Client) {

        const { options, guild } = interaction;

        const bolean = options.getBoolean("on-off");

        const data = await rankSchema.findOne({ GuildId: guild.id });
        if (!data) {
            await rankSchema.create({
                GuildId: guild.id,
                Enabled: bolean
            });
        } else {
            await rankSchema.findOneAndUpdate({ GuildId: guild.id },
                { Enabled: bolean  },
                { new: true, upsert: true }
            );
        }

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `Rank Setup`, iconURL: "https://i.imgur.com/6gvcooF.gif" })
                    .setDescription(`> Sikeressen konfiguráltad a ranking rendszert.`)
                    .addFields(
                        { name: "Enabled:", value: `${bolean}` }
                    )
                    .setColor("Green")
            ],
            ephemeral: true,
        });
        
    },
};
