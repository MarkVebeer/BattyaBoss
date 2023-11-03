const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    Client,
    PermissionFlagsBits,
    EmbedBuilder,
  } = require("discord.js");
  
    module.exports = {
        data: new SlashCommandBuilder()
        .setName("vcmove")
        .setDMPermission(false)
        .addChannelOption((options) =>
        options
          .setName("channel")
          .setRequired(true)
          .addChannelTypes(2)
          .setDescription("Add meg melyik szobába akartok menni")
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
      .setDescription("A kiválasztott csatornába dob át titeket!"),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        if (interaction.member.voice.channel) {
            const { options } = interaction;

            const oldvc = interaction.member.voice.channel;

            const goto = Array.from(oldvc.members.values());

            const Channel = options.getChannel("channel");

            const newchannel = interaction.guild.channels.cache.get(Channel.id);

            if (newchannel.type !== 2) {
                interaction.reply({content: "❌ Ez nem egy hangcsatorna!", ephemeral: true})
            } else {
                goto.forEach(member => {
                    member.edit({ channel: newchannel });
                    });
    
                interaction.reply({content: "✅ Sikeres!", ephemeral: true})
            }

        } else {

            interaction.reply({content: "❌ Nem vagy hangcsatornában!", ephemeral: true})

        }
    },
  };
  