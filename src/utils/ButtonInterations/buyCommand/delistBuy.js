const colors = require("colors");
const Buy = require("../../../Models/Buy");

const delistBuy = async (interaction) => {
  try {
    const itrUserId = interaction.user.id;
    const msgId = interaction.message.id;
    const { buyerId } = await Buy.findOne({ msgId: msgId });

    if (buyerId) {
      if (itrUserId === buyerId) {
        await Buy.findOneAndDelete({ msgId: msgId });
        await interaction.deferUpdate({ ephemeral: true });
        await interaction.deleteReply();
        await interaction.followUp({
          content: "Your offer has been delisted.",
          ephemeral: true,
        });
      } else {
        interaction.reply({
          content: "You can't delist someone else's offer.",
          ephemeral: true,
        });
      }
    } else {
      await interaction.deferUpdate({ ephemeral: true });
      interaction.followUp({
        content: "Something went wrong!.",
        ephemeral: true,
      });
    }
  } catch (error) {
    console.log(colors.red(error));
    await interaction.deferUpdate({ ephemeral: true });
    interaction.followUp({
      content: "Something went wrong!.",
      ephemeral: true,
    });
  }
};

module.exports = { delistBuy };
