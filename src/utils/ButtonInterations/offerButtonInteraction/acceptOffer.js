const colors = require("colors");
const Offer = require("../../../Models/Offer");
const { PermissionsBitField } = require("discord.js");
const Ticket = require("../../../Models/Ticket");

const acceptOffer = async (interaction, client) => {
  try {
    const msgId = interaction.message.id;
    const offer = await Offer.findOne({
      $or: [{ sellerDmMsgId: msgId }, { buyerDmMsgId: msgId }],
    });
    await interaction.deferUpdate();
    if (!offer) {
      return await interaction.followUp({
        content: "Something went wrong.",
      });
    }

    // Channel Creation Part
    const buyer = await client.users.fetch(offer.buyerId);
    const seller = await client.users.fetch(offer.sellerId);
    const guildId = process.env.GUILD_ID;
    const allowdUsersId = [
      {
        id: guildId,
        deny: [PermissionsBitField.Flags.ViewChannel],
      },
      {
        id: buyer.id,
        allow: [
          PermissionsBitField.Flags.SendMessages,
          PermissionsBitField.Flags.ViewChannel,
          PermissionsBitField.Flags.ReadMessageHistory,
        ],
      },
      {
        id: seller.id,
        allow: [
          PermissionsBitField.Flags.SendMessages,
          PermissionsBitField.Flags.ViewChannel,
          PermissionsBitField.Flags.ReadMessageHistory,
        ],
      },
    ];

    const categoryId = process.env.TICKET_CATEGORY_ID;

    // Get guild
    const guild = await client.guilds.fetch(guildId);

    // Get  category
    const category = await guild.channels.resolve(categoryId);
    await new Ticket({
      msgId: offer.listingId,
      sellerId: seller.id,
      buyerId: buyer.id,
      isOpen: true,
    }).save();

    // Creating channel
    await guild.channels.create({
      name: `testing-${Date.now()}`,
      parent: category,
      permissionOverwrites: allowdUsersId,
    });

    interaction.followUp({
      content: "Your deal conversation ticket has been created.",
    });

    await Offer.findByIdAndDelete(offer._id);
  } catch (error) {
    console.log(colors.red(error));
    interaction.deferUpdate();
    interaction.followUp({
      content: "Something went wrong",
    });
  }
};

module.exports = { acceptOffer };
