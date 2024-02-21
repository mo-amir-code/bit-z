const colors = require("colors");
const Offer = require("../../../Models/Offer");

const declineOffer = async (interaction, client) => {
  try {
    const msgId = interaction.message.id;
    const offer = await Offer.findOne({$or: [{ sellerDmMsgId: msgId }, { buyerDmMsgId: msgId }]});

    interaction.deferUpdate();
    if(!offer){
        return await interaction.followUp({
            content: "Something went wrong!",
        });
    }

    const buyer = await client.users.fetch(offer.buyerId);
    const seller = await client.users.fetch(offer.sellerId);
    
    
  } catch (error) {
    console.log(colors.red(error));
    interaction.deferUpdate();
    return interaction.followUp({
      content: "Somethign went wrong!",
    });
  }
};


module.exports = {declineOffer}