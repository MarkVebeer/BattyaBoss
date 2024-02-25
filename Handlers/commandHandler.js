async function loadCommands(client) {
    const { loadFiles} = require("../Functions/fileLoader.js");
    const ascii = require("ascii-table");
    const table = new ascii().setHeading("Commands", "Status");

    await client.commands.clear();
    await client.subCommands.clear();

    let commandsArray = [];

    const Files = await loadFiles("Commands")

    Files.forEach((file) => {
        const command = require(file)

        if(command.subCommand)
        return client.subCommands.set(command.subCommands, command)

        client.commands.set(command.data.name, command);

        commandsArray.push(command.data.toJSON());

        table.addRow(command.data.name, "🟩")
    });

    client.application.commands.set(commandsArray);

    console.log(table.toString())
    console.info("\x1b[36m%s\x1b[0m", "Commands Loaded.");

}

module.exports = { loadCommands }