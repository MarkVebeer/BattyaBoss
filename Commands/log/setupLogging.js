const {
    SlashCommandBuilder,
    EmbedBuilder,
    ChatInputCommandInteraction,
    PermissionFlagsBits
} = require("discord.js");

const logSchema = require("../../schemas/loggingSchema.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setuplogging")
        .setDescription("Logging rendszer setup.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addBooleanOption(bolean =>
            bolean
                .setName("on-off")
                .setDescription("True = bekapcsolás, False = kikapcsolás")
                .setRequired(true)
        )
        .addChannelOption(channel =>
            channel
                .setName("channel")
                .setDescription("Add meg a naplózási csatornát.")
                .addChannelTypes(0)
                .setRequired(true)
        ),

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */

    async execute(interaction, Client) {

        const { options, guild } = interaction;

        const bolean = options.getBoolean("on-off");
        const channel = options.getChannel("channel");

        const data = await logSchema.findOne({ GuildId: guild.id });
        if (!data) {
            await logSchema.create({
                GuildId: guild.id,
                ChannelId: channel.id,
                Enabled: bolean
            });
        } else {
            await logSchema.findOneAndUpdate({ GuildId: guild.id },
                { Enabled: bolean, ChannelId: channel.id },
                { new: true, upsert: true }
            );
        }

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `Logging Setup`, iconURL: "https://i.imgur.com/6gvcooF.gif" })
                    .setDescription(`> Sikeressen konfiguráltad a naplózó rendszert.`)
                    .addFields(
                        { name: "Enabled:", value: `${bolean}` },
                        { name: "Channel:", value: `${channel.name}` }
                    )
                    .setColor("Green")
            ],
            ephemeral: true,
        });
        
    },
};
