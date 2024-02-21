const { TextInputBuilder } = require("@discordjs/builders");
const {
  ModalBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const Sell = require("../../../Models/Sell");
const Offer = require("../../../Models/Offer");

const showOfferModal = async (interaction, client) => {
  const modal = new ModalBuilder()
    .setCustomId(`offerModal-${interaction.user.id}`)
    .setTitle("Confirm your order");

  const offerNumber = new TextInputBuilder()
    .setCustomId("offer")
    .setPlaceholder("Just enter numbers")
    .setLabel("Offer")
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  const offerRow = new ActionRowBuilder().addComponents(offerNumber);

  modal.addComponents(offerRow);
  await interaction.showModal(modal);

  const filter = (interaction) =>
    interaction.customId === `offerModal-${interaction.user.id}`;

  interaction
    .awaitModalSubmit({ filter, time: 300000 })
    .then(async (modalInteraction) => {
      try {
        // Fetching msgId  and sellerId
        const msgId = interaction.message.id;
        const { sellerId } = await Sell.findOne({ msgId: msgId });
        const buyerId = interaction.user.id;

        // Checking this interaction user is not a offer owner user
        if(sellerId === buyerId){
          await modalInteraction.update({
            content: "",
          });
          return await modalInteraction.followUp({
            ephemeral: true,
            content: "You can't send offer yourself."
          });
        }

        // Fetching user and offervalue
        const user = await client.users.fetch(sellerId);
        const channel = await user.createDM();
        const offerValue = modalInteraction.fields.getTextInputValue("offer");

        // Creating buttons and sending dm to the user
        const buttons = new ActionRowBuilder().setComponents(
          new ButtonBuilder()
            .setCustomId("accept-offer")
            .setLabel("Accept Offer")
            .setStyle(ButtonStyle.Success),
          new ButtonBuilder()
            .setCustomId("decline-offer")
            .setLabel("Decline Offer")
            .setStyle(ButtonStyle.Danger)
        );
        const dm = await channel.send({
          content: `You got a offer ${offerValue}`,
          components: [buttons],
        });

        // Updating message
        await modalInteraction.update({
          content: "",
        });
        await modalInteraction.followUp({
          ephemeral: true,
          content: `Thank you for submitting offer! Your offer ${offerValue} has been recieved.`,
        });

        await new Offer({sellerId, buyerId, sellerDmMsgId:dm.id, listingId:msgId}).save();
      } catch (err) {
        console.error(err);
        interaction.followUp({
          content: "Something went wrong."
        })
      }
    });
};

module.exports = { showOfferModal };
