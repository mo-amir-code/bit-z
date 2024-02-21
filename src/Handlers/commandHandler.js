const colors = require("colors");
const fs = require('fs');

const loadCommands = async (client) => {
    try{
        const folders = fs.readdirSync("./src/Commands");
        let commandsArray = [];
        console.log("<----------------------- Command Loading ----------------------->".yellow);
        for(const folder of folders){
            const files = fs.readdirSync(`./src/Commands/${folder}`).filter(file => file.endsWith(".js"));
            for(const file of files){
                const command = require(`../Commands/${folder}/${file}`);
                if(command?.data?.name){
                    client.commands.set(command.data.name, command);
                    commandsArray.push(await command.data.toJSON())
                    console.log(`[INFO] Command: (${command.data.name}) set successfully`.green);
                }else{
                    console.log(`[INFO] Command is undefined`.red);
                }
            }
        }
        client.application.commands.set(commandsArray);
        console.log("<----------------------- Command Loaded ----------------------->\n".yellow);
    }catch(err){
        // console.log(`${err}`.red);
        console.log(colors.red(err))
    }
}

module.exports = {loadCommands}