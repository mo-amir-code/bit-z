const colors = require("colors");
const {
  postSell,
} = require("../../utils/ButtonInterations/sellCommand/postSell");
const {
  delistSell,
} = require("../../utils/ButtonInterations/sellCommand/delistSell");
const {
  showOfferModal,
} = require("../../utils/ButtonInterations/sellCommand/showOfferModal");
const {
  showQuickBuyModal,
} = require("../../utils/ButtonInterations/sellCommand/showQuickBuyModal");
const { postBuy } = require("../../utils/ButtonInterations/buyCommand/postBuy");
const {
  delistBuy,
} = require("../../utils/ButtonInterations/buyCommand/delistBuy");
const {
  showOfferBuyModal,
} = require("../../utils/ButtonInterations/buyCommand/showOfferBuyModal");
const {
  showQuickSellModal,
} = require("../../utils/ButtonInterations/buyCommand/showQuickSellModal");
const {
  acceptOffer,
} = require("../../utils/ButtonInterations/offerButtonInteraction/acceptOffer");
const { declineOffer } = require("../../utils/ButtonInterations/offerButtonInteraction/declineOffer");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    try {
      if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) {
          interaction.reply({ content: "outdated command" });
        }
        command.execute(interaction, client);
      } else if (interaction.isButton()) {
        // Sell command buttons interaction
        if (interaction.customId === "post") {
          return await postSell(interaction, client);
        } else if (interaction.customId === "delist") {
          return await delistSell(interaction);
        } else if (interaction.customId === "offer") {
          return await showOfferModal(interaction, client);
        } else if (interaction.customId === "quick-buy") {
          return await showQuickBuyModal(interaction, client);
        }

        // Buy command buttons interaction
        if (interaction.customId === "post-buy") {
          return await postBuy(interaction, client);
        } else if (interaction.customId === "delist-buy") {
          return await delistBuy(interaction);
        } else if (interaction.customId === "offer-buy") {
          return await showOfferBuyModal(interaction, client);
        } else if (interaction.customId === "quick-sell") {
          return await showQuickSellModal(interaction, client);
        }

        // Offer butttons interaction
        if (interaction.customId === "accept-offer") {
          return await acceptOffer(interaction, client);
        }else if(interaction.customId === "decline-offer"){
          return await declineOffer(interaction, client);
        }
      }
    } catch (err) {
      console.log(colors.red(err));
      interaction.editReply({
        content: "Something went wrong",
        ephemeral: true,
      });
    }
  },
};
