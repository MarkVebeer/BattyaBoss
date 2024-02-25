const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("szabalyok")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDescription("alapvető szabalyok"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const { channel } = interaction;

    const embed1 = new EmbedBuilder()
      .setDescription("A szabályok nem ismerése nem mentesít betartásuk alól.")
      .setColor("Red")
      .setTitle(`Szabályok:`);
    const embed2 = new EmbedBuilder()
      .setDescription(
        "**1.** Bánj mindenkivel tisztelettel! Szigorúan tilos a zaklatás, a szexizmus, a rasszizmus és a gyűlöletbeszéd bármilyen formája."
      )
      .setColor("Red");
    const embed3 = new EmbedBuilder()
      .setDescription(
        "**2.** Ne spamelj vagy reklámozd önmagadat (szervermeghívók, hirdetések stb.) személyzeti tag engedélye nélkül. Ebbe a körbe tartozik a tagtársaidnak küldött közvetlen marketing is."
      )
      .setColor("Red");
    const embed4 = new EmbedBuilder()
      .setDescription(
        "**3.** Tilos az NSFW vagy obszcén tartalom. Ebbe a körbe tartozik a meztelenséget, szexet, durva erőszakot leíró, ábrázoló szöveg, kép vagy hivatkozás, illetve más, nyugalom megzavarására alkalmas tartalom."
      )
      .setColor("Red");
    const embed5 = new EmbedBuilder()
      .setDescription(
        "**4.** Amennyiben szabályba ütköző dolgot látsz vagy olyasmit, ami miatt nem érzed biztonságban magad, értesítsd a személyzetet. Szeretnénk, ha ez a szerver egy befogadó hely lenne."
      )
      .setColor("Red");

    channel.send({embeds: [embed1, embed2, embed3, embed4, embed5]});
    
    return interaction.reply({
      content: "Ez az üzenet rövidessen törlődni fog ha minden igaz.",
      fetchReply: true,
    })
    .then((m) => {
      setTimeout(() => {
        m.delete();
      }, 1 * 1000);
    })
    .catch((err) => {console.log(err)});
  },
};
