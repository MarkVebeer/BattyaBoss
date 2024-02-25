const {
    Client,
    ButtonInteraction,
    EmbedBuilder,
    AttachmentBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle
} = require("discord.js");

const verifySchema = require("../../schemas/verifySchema.js");
const codesSchema = require("../../schemas/codesSchema.js");

const { Captcha } = require("captcha-canvas");

module.exports = {
    name: "interactionCreate",

    /**
     * @param {Client} client 
     * @param {ButtonInteraction} interaction 
     * @returns 
     */
    async execute(interaction, client) {

        if (!interaction.isButton()) return;
        
        if (!interaction.guild || !interaction.channel || !interaction.user || interaction.user.bot) return;

        const { guild, member, customId } = interaction;

        if (customId === "verify-button") {
            const dataVerify = await verifySchema.findOne({ guildId: guild.id });
            const dataCode = await codesSchema.findOne({ userId: member.id });

            const captcha = new Captcha();
            
            captcha.async = false;
            captcha.addDecoy();
            captcha.drawTrace();
            captcha.drawCaptcha();

            const attachment = new AttachmentBuilder()
                .setFile(await captcha.png)
                .setName("captcha-image.png")
                .setDescription("Captcha image");

            const embed = new EmbedBuilder()
                .setAuthor({ name: "Captcha System", iconURL: "https://i.imgur.com/6gvcooF.gif" })
                .setDescription("Jegyezd meg a képen látható 6 jegyű kódot, majd nyomd meg a 'Send captcha' gombot, és add meg a 6 jegyű kódod, majd nyomd meg a küldés gombot, és ha jól adtad meg a kódod, akkor hitelesít a rendszer.(ezt a folyamatot nem kell újra megcsinálnod ha időközdben kilépnél, majd újra visszalépnél valamiért)")
                .setColor("Green")
                .setImage(`attachment://${attachment.name}`);

            const row = new ActionRowBuilder().addComponents([
                new ButtonBuilder()
                    .setCustomId("captcha-button")
                    .setEmoji("<:bot:1082497254365089953>")
                    .setLabel("Send captcha")
                    .setStyle(ButtonStyle.Success)
            ]);


            if (dataCode && dataCode.captchaCode === "verified") {

                try {
                    member.roles.add(dataVerify.roleId);
                } catch (error) {
                    console.log(error)
                }

                return interaction.reply({
                    content: "✅ Te már bizonyítotad, hogy nem vagy robot(ha nem volt rangod, adtam).",
                    ephemeral: true,
                });
            } else if (!dataCode) {
                await codesSchema.create({
                    userId: member.id,
                    captchaCode: `${captcha.text}`,
                });

                return await interaction.reply({
                    embeds: [embed],
                    components: [row],
                    files: [attachment],
                    ephemeral: true,
                });
            } else if (dataCode.captchaCode !== "verified") {
                await codesSchema.findOneAndUpdate({ userId: member.id },
                    { captchaCode: `${captcha.text}` },
                    { new: true, upsert: true }
                );

                return await interaction.reply({
                    embeds: [embed],
                    components: [row],
                    files: [attachment],
                    ephemeral: true,
                });
            }
        }

        if (customId === "captcha-button") {
            const modal = new ModalBuilder()
                .setCustomId("captcha-modal")
                .setTitle(`${guild.name} - Verification`);

            const captchaText = new TextInputBuilder()
                .setCustomId("captcha-code")
                .setLabel("Hitelesítés")
                .setPlaceholder("Írd be a 6 jegyű kódod...")
                .setStyle(TextInputStyle.Short)
                .setMinLength(6)
                .setMaxLength(6)
                .setRequired(true);

            const textModal = new ActionRowBuilder().addComponents(captchaText);
            modal.addComponents(textModal);

            await interaction.showModal(modal);
        }
    }
}
