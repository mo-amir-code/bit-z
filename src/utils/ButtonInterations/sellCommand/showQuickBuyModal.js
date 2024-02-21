require("dotenv/config");
const { TextInputBuilder } = require("@discordjs/builders");
const {
  ModalBuilder,
  TextInputStyle,
  ActionRowBuilder,
  PermissionsBitField,
} = require("discord.js");
const Sell = require("../../../Models/Sell");
const Ticket = require("../../../Models/Ticket");

const showQuickBuyModal = async (interaction, client) => {
  const modal = new ModalBuilder()
    .setCustomId(`quickModal-${interaction.user.id}`)
    .setTitle("Confirm your order");

  const quickQuestion = new TextInputBuilder()
    .setCustomId("quick")
    .setLabel("MESSAGE")
    .setStyle(TextInputStyle.Short)
    .setValue("Are you sure you want to buy this offer?");

  const quickConditions = new TextInputBuilder()
    .setCustomId("quickTerms")
    .setLabel("TERMS & CONDITIONS")
    .setStyle(TextInputStyle.Paragraph)
    .setValue(
      "1. Spam tickets will be banned.\n2. Opening tickets without reason will be deleted.\n3. Be a smart customer."
    );

  const row1 = new ActionRowBuilder().addComponents(quickQuestion);
  const row2 = new ActionRowBuilder().addComponents(quickConditions);

  modal.addComponents(row1, row2);
  await interaction.showModal(modal);

  const filter = (interaction) =>
    interaction.customId === `quickModal-${interaction.user.id}`;

  interaction
    .awaitModalSubmit({ filter, time: 300000 })
    .then(async (modalInteraction) => {

      const msgId = interaction.message.id;
      const { sellerId } = await Sell.findOne({ msgId: msgId });

      if(sellerId === interaction.user.id){
        await modalInteraction.update({
          content: " ",
        });
        return await modalInteraction.followUp({
          ephemeral: true,
          content: "You can't buy yourself offer.",
        });
      }

      const user = await client.users.fetch(sellerId);
      const channel = await user.createDM();
      await channel.send(
        `Someone accepted your offer and ticket has been created.`
      );

      await modalInteraction.update({
        content: " ",
      });
      await modalInteraction.followUp({
        ephemeral: true,
        content: "Your confirmation has been sent to the offer owner.",
      });

      // Channel Creation Part

      const buyerId = interaction.user.id;
      const allowdUsersId = [
        {
          id: interaction.guild.id,
          deny: [PermissionsBitField.Flags.ViewChannel],
        },
        {
          id: buyerId,
          allow: [
            PermissionsBitField.Flags.SendMessages,
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.ReadMessageHistory,
          ],
        },
        {
          id: sellerId,
          allow: [
            PermissionsBitField.Flags.SendMessages,
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.ReadMessageHistory,
          ],
        },
      ];
      const categoryId = process.env.TICKET_CATEGORY_ID;

      // Get  category
      const category = await interaction.guild.channels.cache.get(categoryId);
      await new Ticket({msgId, sellerId, buyerId, isOpen:true}).save();

      // Creating channel
      await interaction.guild.channels.create({
        name: `testing-${Date.now()}`,
        parent: category,
        permissionOverwrites: allowdUsersId,
      });
    });
};

module.exports = { showQuickBuyModal };
