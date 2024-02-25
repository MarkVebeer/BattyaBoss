const { AttachmentBuilder, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const User = require('../../schemas/User.js');

const rankSchema = require("../../schemas/rankSchema.js");


module.exports = {
   data: new SlashCommandBuilder()
      .setName('rank')
      .setDescription("Rank lekérdezés")
      .addUserOption((option) =>
         option
            .setName('member')
            .setDescription('Tag:')
            .setRequired(true)
      ),
   async execute(interaction) {

      const { guild } = interaction;
      const rankingData = await rankSchema.findOne({ GuildId: guild.id });
      const reply2 = new EmbedBuilder().setColor(0x00FFFF).setTitle('❌ Sajnálom, de ezen a szerveren az **Adminisztrátor** letiltotta/még nem setupolta a ranking systemet!');
      if(!rankingData) return interaction.reply({embeds: [reply2], ephemeral: true});
      if(rankingData.Enabled == false) return interaction.reply({embeds: [reply2], ephemeral: true});

      const member = interaction.options.getMember('member') || interaction.member;

      let user;

      const guildId = member.guild.id;
      const userId = member.user.id;

      user = await User.findOne({ guildId, userId });

      if (!user) {
         user = {
            level: 1,
            xp: 0,
         };
      }

      interaction.reply({
          content: `Név: **${member.user.username}** \nEkkora szintű: **${user.level}** \nKövi rankig ennyi xp kell neki: **${user.level * 100 - user.xp}**`,
       	  ephemeral: true
      });
   },
};
