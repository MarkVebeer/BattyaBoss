const {
    SlashCommandBuilder,
    EmbedBuilder,
    ChatInputCommandInteraction,
    PermissionFlagsBits
} = require("discord.js");

const gptSchema = require("../../schemas/gptSchema.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setupgpt")
        .setDescription("Gpt rendszer setup.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(channel =>
            channel
                .setName("channel")
                .setDescription("Add meg a csatornát.")
                .addChannelTypes(0)
                .setRequired(true)
        )
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

        const channel = options.getChannel("channel");
        const bolean = options.getBoolean("on-off");

        const data = await gptSchema.findOne({ GuildId: guild.id });
        if (!data) {
            await gptSchema.create({
                GuildId: guild.id,
                ChannelId: channel.id,
                Enabled: bolean

            });
        } else {
            await gptSchema.findOneAndUpdate({ GuildId: guild.id },
                { ChannelId: channel.id, Enabled: bolean  },
                { new: true, upsert: true }
            );
        }

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: `GPT Setup`, iconURL: "https://i.imgur.com/6gvcooF.gif" })
                    .setDescription(`> Sikeressen konfiguráltad az üdvözlő rendszert.`)
                    .addFields(
                        { name: "Channel:", value: `${channel}` },
                        { name: "Enabled:", value: `${bolean}` }
                    )
                    .setColor("Green")
            ],
            ephemeral: true,
        });
        
    },
};
