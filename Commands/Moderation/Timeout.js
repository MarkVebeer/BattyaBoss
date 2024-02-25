const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js")
const Database = require("../../schemas/Infractions.js");
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Felfüggeszti az embert egy általad megadott időre.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .setDMPermission(false)
    .addUserOption(options => options
        .setName("user")
        .setDescription("Válassz egy embert.")
        .setRequired(true)
    )
    .addStringOption(options => options
        .setName("duration")
        .setDescription("Add meg az időt pl(1m, 1h, 1d)")
        .setRequired(true)
    )
    .addStringOption(options => options
        .setName("reason")
        .setDescription("Add meg a felfüggesztés indokát!(Nem kötelező)")
        .setMaxLength(512)
        .setRequired(false)
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const { options, guild, member } = interaction;

        const target = options.getMember("user");
        const duration = options.getString("duration");
        const reason = options.getString("reason") || "None specified.";

        const errorsArray = [];

        const errorsEmbed = new EmbedBuilder()
        .setAuthor({name: "Nem tudom ezt az embert e miatt felfüggeszteni: "})
        .setColor("Red")

        if(!target) return interaction.reply({
            embeds: [errorsEmbed.setDescription("Az ember valószínűleg kilépett erről a szerverről, mert nem találom...")],
            ephemeral: true
        })

        if(!ms(duration) || ms(duration) > ms("28d"))
        errorsArray.push("Az idő amit megadtál vagy nem helyes, vagy több mint 28 nap(ami a discord limit felfüggesztéskor).")

        if(!target.manageable || !target.moderatable)
        errorsArray.push("A kiválasztott embert nem tudom moderálni, nincs hozzá jogom.")

        if(member.roles.highest.position < target.roles.highest.position)
        errorsArray.push("A kiválasztott ember magasabb jogokkal él, mint te!")

        if(errorsArray.length)
        return interaction.reply({
            embeds: [errorsEmbed.setDescription(errorsArray.join("\n"))],
            ephemeral: true
        });

        target.timeout(ms(duration), reason).catch((err) => {
            interaction.reply({
                embeds: [errorsEmbed.setDescription("Valami nem várt hiba miatt nem tudom felfüggeszteni az embert.")],
                ephemeral: true
            })
            return console.log("Error occoured in Timeout.js", err)
        });

        const newInfractionsObject = {
            IssuerID: member.id,
            IssuerTag: member.user.tag,
            Reason: reason,
            Date: Date.now()
        }

        let userData = await Database.findOne({Guild: guild.id, User: target.id});
        if(!userData)
        userData = await Database.create({Guild: guild.id, User: target.id, Infractions: [newInfractionsObject]});
        else
        userData.Infractions.push(newInfractionsObject) && await userData.save();

        const successEmbed = new EmbedBuilder()
        .setAuthor({name: "Timeout Issues", iconURL: guild.iconURL()})
        .setColor("Gold")
        .setDescription(
            `${target} fel lett függesztve  **${ms(ms(duration), {long: true})}**, ${member} által \nEz az ember már **${userData.Infractions.length - 1}** alkalommal volt általam felfüggesztve \nIndok: ${reason}`
        );

        return interaction.reply({embeds: [successEmbed]});

    }
}