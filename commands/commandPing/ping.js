const Discord = require('discord.js');

module.exports = {
  name: "ping",
  aliases: ["p"],

  run: async(client, message) => {

      let embed = new Discord.EmbedBuilder()
      .setColor("Random")
      .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
      .setDescription(`Olá ${message.author}, pong`)

      let embed2 = new Discord.EmbedBuilder()
      .setColor("Random")
      .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
      .setDescription(`Olá ${message.author}, pong🏓(zuera garai kkkkk ${client.ws.ping}ms)`)

      message.reply({ embeds: [embed] }).then((msg) => {
        setTimeout(() => {
          msg.edit({ embeds: [embed2] })
        }, 3000)
      })
  }
}