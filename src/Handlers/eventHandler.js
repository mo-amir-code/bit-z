const fs = require("fs");

const loadEvents = (client) => {
  try {
    const folders = fs.readdirSync("./src/Events");
    console.log("<----------------------- Events Loading ----------------------->".yellow);
    for (const folder of folders) {
        const files = fs
        .readdirSync(`./src/Events/${folder}`)
        .filter((file) => file.endsWith(".js"));
        for (const file of files) {
            const event = require(`../Events/${folder}/${file}`);
            
            if (event.once) {
                client.once(event.name, (...args) => {
                    event.execute(...args, client);
                });
                console.log(
                    `[INFO] Event(once): (${event.name}) set successfully`.green
                    );
                } else {
                    client.on(event.name, (...args) => {
                        event.execute(...args, client);
                    });
                    console.log(`[INFO] Event(on): (${event.name}) set successfully`.green);
                }
            }
        }
        console.log("<----------------------- Events Loaded ----------------------->\n".yellow);
  } catch (err) {
    console.log(`${err}`.red);
  }
};

module.exports = { loadEvents };
