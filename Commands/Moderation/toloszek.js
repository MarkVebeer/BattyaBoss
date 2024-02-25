const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    Client,
    PermissionFlagsBits,
    EmbedBuilder,
} = require("discord.js");
  
module.exports = {
    data: new SlashCommandBuilder()
        .setName("toloszek")
        .setDMPermission(false)
        .addUserOption((option) =>
            option
                .setName('member')
                .setDescription('Ki legyen a toloszekes?')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .setDescription("Tolószékbe helyezi az embert."),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { options } = interaction;
        if(interaction.guild.id !== "1178781959007240293") return;

        const member = options.getMember("member");
        if (!member) return interaction.reply({content:"Nem található felhasználó.", ephemeral: true});

        const toloszekRole = interaction.guild.roles.cache.get("1208169779261603891");

        if(member.roles.cache.has(toloszekRole.id)) {

            const rolesList = member.roles.cache.filter(role => role.id !== interaction.guild.roles.everyone.id).map(role => role.id);

            rolesList.forEach(roleID => {
                const role = interaction.guild.roles.cache.get(roleID);
                if (role) {
                    member.roles.remove(role)
                        .then(() => console.log(`A ${role.name} rang sikeresen elvéve a felhasználótól.`))
                        .catch(error => console.error(`Hiba történt a ${role.name} rang eltávolításakor:`, error));
                } else {
                    console.error(`A ${roleID} azonosítójú rang nem található.`);
                }
            });

            member.roles.remove(toloszekRole)

            interaction.reply({content: `A felhasználó tolószéke elkobzásra került, ha ujra verifyol akkor jó lesz neki.`, ephemeral: true});

        } else {

            const rolesList = member.roles.cache.filter(role => role.id !== interaction.guild.roles.everyone.id).map(role => role.id);

            rolesList.forEach(roleID => {
                const role = interaction.guild.roles.cache.get(roleID);
                if (role) {
                    member.roles.remove(role)
                        .then(() => console.log(`A ${role.name} rang sikeresen elvéve a felhasználótól.`))
                        .catch(error => console.error(`Hiba történt a ${role.name} rang eltávolításakor:`, error));
                } else {
                    console.error(`A ${roleID} azonosítójú rang nem található.`);
                }
            });

            member.roles.add(toloszekRole)
            
            interaction.reply({content: `A felhasználó a mai naptól tolószékes.`, ephemeral: true});

        }
        
    },
};
