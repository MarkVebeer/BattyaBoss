const {
    Client,
    Interaction,
    EmbedBuilder
} = require("discord.js");

const verifySchema = require("../../schemas/verifySchema.js");
const codesSchema = require("../../schemas/codesSchema.js");

module.exports = {
    name: "interactionCreate",

    /**
     * @param {Client} client 
     * @param {Interaction} interaction 
     * @returns 
     */
    async execute(interaction, client) {

        if (!interaction.isModalSubmit()) return;
        
        if (!interaction.guild || !interaction.channel || !interaction.user || interaction.user.bot) return;

        const { fields, guild, member, customId } = interaction;

        const dataVerify = await verifySchema.findOne({ guildId: guild.id });
        const dataCode = await codesSchema.findOne({ userId: member.id });

        if (customId === "captcha-modal") {
            const code = fields.getTextInputValue("captcha-code");

            if (!dataCode && dataCode.userId !== member.id) return interaction.reply({
                content: "Problémám van a hitelesítéseddel, kérlek próbáld meg újra.",
            });

            if (dataCode.captchaCode !== code.toUpperCase()) {
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`Helytelen kód: ${code}`)
                            .setColor("Red")
                    ],
                    ephemeral: true,
                });
            } else {
                await codesSchema.findOneAndUpdate({ userId: member.id },
                    { captchaCode: `verified` },
                    { new: true, upsert: true }
                );

                member.roles.add(dataVerify.roleId);

                return await interaction.reply({
                    content: `✅ Sikeres hitelesítés.`,
                    ephemeral: true,
                });
            }
        }
    }
}
