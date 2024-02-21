const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");
const { listingOffer } = require("../../Commands/sell");
const colors = require("colors");
const Sell = require("../../../Models/Sell");

const postSell = async (interaction, client) => {
  try {
    await interaction.deferUpdate();
    const { embeds, offer } = await listingOffer(interaction, client, false);
    await interaction.editReply({
      embeds: [
        new EmbedBuilder().setDescription("Your offer has been listed."),
      ],
      components: [],
    });

    const buttons = new ActionRowBuilder().setComponents(
      new ButtonBuilder()
        .setCustomId("quick-buy")
        .setLabel("Quick Buy!")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId("delist")
        .setLabel("Delist")
        .setStyle(ButtonStyle.Danger),
      new ButtonBuilder()
        .setCustomId("view-seller")
        .setLabel("View Seller")
        .setStyle(ButtonStyle.Secondary)
    );

    if (offer) {
      const modifiedButtons = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId("offer")
            .setLabel("Offer")
            .setStyle(ButtonStyle.Success)
        )
        .addComponents(...buttons.components);
      const embedMsg = await interaction.channel.send({
        embeds: [embeds],
        components: [modifiedButtons],
      });

      await new Sell({
        msgId: embedMsg.id,
        sellerId: interaction.user.id,
        isListed: true,
      }).save();

      return;
    }

    const embedMsg = await interaction.channel.send({
      embeds: [embeds],
      components: [buttons],
    });

    await new Sell({
      msgId: embedMsg.id,
      sellerId: interaction.user.id,
      isListed: true,
    }).save();
  } catch (err) {
    console.log(colors.red(err));
    interaction.followUp("```diff\n- Something went wrong!```");
  }
};

module.exports = { postSell };
