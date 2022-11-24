const Discord = require('discord.js')

module.exports = {
  name: "repo",
  aliases: ["r"],

  run: async(client, message) => {

      let embed = new Discord.EmbedBuilder()
      .setColor("Random")
      .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
      .setDescription(`https://github.com/vasconcelosguu/DiscBot`)
      .setTitle('Vasconcelosguu')

      message.reply({ embeds: [embed] })
  }
};


