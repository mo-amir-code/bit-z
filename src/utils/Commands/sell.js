const { offerTemplate } = require("./offerTemplate");
const colors = require("colors")

const listingOffer = async (interaction, client, listOffer) => {
  if (listOffer) {
    // const itrId = await interaction.id;
    // const userId = await interaction.user.id;
    // const channelId = await interaction.channelId;
    const name = await interaction.options.getString("name");
    const chain = await interaction.options.getString("chain");
    const price = await interaction.options.getInteger("price");
    // const priceType = interaction.options.getString("price-type");
    const payment = await interaction.options.getString("payment");
    const specific = await interaction.options.getString("specific");
    const type = await interaction.options.getString("type");
    const quantity = await interaction.options.getInteger("quantity");
    const collateral = await interaction.options.getString("collateral");
    // const offer = interaction.options.getString("offer");

    return await offerTemplate(name, chain, price, payment, specific, type, quantity, collateral);
  }else{
    const itrId = interaction.message.interaction.id;
    const {embedsList, offer} = await client.offers.get(itrId);
    await client.offers.delete(itrId);
    return {embeds:embedsList, offer}
  }
};

module.exports = { listingOffer };
