const connectToMongo = require("../../Services/connectToMongo")

const colors = require("colors")

module.exports = {
    name: "ready",
    once: true,
    async execute() {
        try{
            await connectToMongo()
            console.log("[INFO] Bit-Z bot is ready now".green)
        }catch(err){
            console.log(colors.red(err))
        }
    }
}