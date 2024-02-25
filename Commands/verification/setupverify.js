const {
    SlashCommandBuilder,
    EmbedBuilder,
    ChatInputCommandInteraction,
    PermissionFlagsBits,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const verifySchema = require("../../schemas/verifySchema.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setupverify")
        .setDescription("Captha verification rendszer setup. (A kikapcsoláshoz töröld a bot üzenetét!)")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(channel =>
            channel
                .setName("channel")
                .setDescription("Add meg a csatornát.")
                .addChannelTypes(0)
                .setRequired(true)
        )
        .addRoleOption(role =>
            role
                .setName("role")
                .setDescription("Add meg a rangot.")
                .setRequired(true)
        ),

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */

    async execute(interaction, Client) {

        const { options, guild } = interaction;

        const channel = options.getChannel("channel");
        const role = options.getRole("role");

        const data = await verifySchema.findOne({ guildId: guild.id });
        if (!data) {
            await verifySchema.create({
                guildId: guild.id,
                roleId: role.id
            });
        } else {
            await verifySchema.findOneAndUpdate({ guildId: guild.id },
                { roleId: role.id },
                { new: true, upsert: true }
            );
        }

        const dataSaved = await verifySchema.findOne({ guildId: guild.id });

        const row = new ActionRowBuilder().addComponents(
            [
                new ButtonBuilder()
                    .setCustomId("verify-button")
                    .setEmoji("✅")
                    .setLabel("Verify")
                    .setStyle(ButtonStyle.Success)
            ]
        );

        const embed = new EmbedBuilder()
            .setAuthor({ name: `Üdvözöllek a ${guild.name} szerveren!`, iconURL: "https://i.imgur.com/6gvcooF.gif" })
            .setDescription("Kérlek nyomd meg a lenti 'verify' gombot, hogy hitelesítsd magad!")
            .setColor("Green")

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `Verify Setup`, iconURL: "https://i.imgur.com/6gvcooF.gif" })
                    .setDescription(`> Sikeressen konfiguráltad az ellenőrző rendszert.`)
                    .addFields(
                        { name: "Channel:", value: `${channel}` },
                        { name: "Verified role:", value: `<@&${dataSaved.roleId}>` }
                    )
                    .setColor("Green")
            ],
            ephemeral: true,
        });

        return await channel.send({
            embeds: [embed],
            components: [row]
        });
    },
};
