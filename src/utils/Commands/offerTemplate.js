const { EmbedBuilder } = require("discord.js");
const { formatTime } = require("../../Services/services");

const offerTemplate = async (name, chain, price, payment, specific, type, quantity, collateral) => {
    return new EmbedBuilder().setDescription(`
        **Name:** ${name}\n
        **Chain:** ${chain}\n
        **Price for all:** ${price}\n
        **Payment:** ${payment}\n
        **Specific:** ${specific}\n
        **Type:** ${type}\n
        **Quantity:** ${quantity}\n
        **Collateral:** ${collateral}
        Fast,Secure and Trusted • ${formatTime(Date.now())}
        `);
}

module.exports = {offerTemplate}