const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
  } = require("discord.js");
  const { listingOffer } = require("../../Commands/sell");
  const colors = require("colors");
  const Buy = require("../../../Models/Buy");
  
  const postBuy = async (interaction, client) => {
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
          .setCustomId("quick-sell")
          .setLabel("Quick Sell!")
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId("delist-buy")
          .setLabel("Delist")
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId("view-buyer")
          .setLabel("View Buyer")
          .setStyle(ButtonStyle.Secondary)
      );
  
      if (offer) {
        const modifiedButtons = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId("offer-buy")
              .setLabel("Offer")
              .setStyle(ButtonStyle.Success)
          )
          .addComponents(...buttons.components);
        const embedMsg = await interaction.channel.send({
          embeds: [embeds],
          components: [modifiedButtons],
        });
  
        await new Buy({
          msgId: embedMsg.id,
          buyerId: interaction.user.id,
          isListed: true,
        }).save();
  
        return;
      }
  
      const embedMsg = await interaction.channel.send({
        embeds: [embeds],
        components: [buttons],
      });
  
      await new Buy({
        msgId: embedMsg.id,
        buyerId: interaction.user.id,
        isListed: true,
      }).save();
    } catch (err) {
      console.log(colors.red(err));
      interaction.followUp("```diff\n- Something went wrong!```");
    }
  };
  
  module.exports = { postBuy };
  