const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
  } = require("discord.js");
  const { listingOffer } = require("../../utils/Commands/sell");
  const colors = require("colors")
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("buy")
      .setDescription("Buy something...")
      .addStringOption((option) =>
        option
          .setName("name")
          .setDescription("Enter what you want to buy.")
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("chain")
          .setDescription("Select project chain.")
          .setRequired(true)
          .addChoices(
            { name: "Solana", value: "Solana" },
            { name: "Polygon", value: "Polygon" },
            { name: "Ethereum", value: "Ethereum" },
            { name: "Bitcoin", value: "Bitcoin" },
            { name: "Injective", value: "Injective" },
            { name: "SUI", value: "SUI" },
            { name: "SEI", value: "SEI" },
            { name: "None", value: "None" }
          )
      )
      .addIntegerOption((option) =>
        option.setName("price").setDescription("Enter a price.").setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("price-type")
          .setDescription("Price Type")
          .addChoices(
            { name: "All", value: "All" },
            { name: "Each", value: "Each" }
          )
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("payment")
          .setDescription("Payment Type")
          .addChoices(
            { name: "USD", value: "USD" },
            { name: "Solana", value: "Solana" }
          )
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("specific")
          .setDescription("Enter specific role")
          .addChoices({ name: "WL", value: "WL" }, { name: "OG", value: "OG" })
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("type")
          .setDescription("Select sales type")
          .addChoices(
            { name: "Discord Surrender", value: "discord surrender" },
            { name: "Wallet Surrender", value: "wallet surrender" },
            { name: "Wallet Submit", value: "wallet submit" },
            { name: "Mint", value: "Mint" },
            { name: "Any", value: "Any" }
          )
          .setRequired(true)
      )
      .addIntegerOption((option) =>
        option
          .setName("quantity")
          .setDescription("Enter sales quantity.")
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("collateral")
          .setDescription("Seller collateral")
          .addChoices(
            { name: "Yes", value: "Yes" },
            { name: "No", value: "No" },
            { name: "Any", value: "Any" }
          )
          .setRequired(true)
      )
      .addStringOption((option) =>
        option
          .setName("offer")
          .setDescription("Seller collateral")
          .addChoices({ name: "Yes", value: "Yes" }, { name: "No", value: "No" })
          .setRequired(true)
      )
      // .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
      .setDMPermission(false),
    async execute(interaction, client) {
      const offer = await interaction.options.getString("offer");
  
      const sellEmbed = await listingOffer(interaction, client, true);
  
      const embedMessage = await interaction.reply({
        embeds: [sellEmbed],
        ephemeral: true,
        components: [
          new ActionRowBuilder().setComponents(
            new ButtonBuilder()
              .setCustomId("post-buy")
              .setLabel("Post")
              .setStyle(ButtonStyle.Success)
          ),
        ],
      });
      
      await client.offers.set(embedMessage.id, {
        embedsList: sellEmbed,
        offer: offer === "Yes" ? true : false,
      });
    },
  };
  