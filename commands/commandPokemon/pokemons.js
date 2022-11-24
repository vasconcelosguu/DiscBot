const Discord = require('discord.js')
const fetch = require('node-fetch');
const messages = require('../../database/messages.json').pokemons;
const {empty, moreThanOne, invalidPoke} = messages;

module.exports = {
  name: 'poke',

  run: async(client, message, args) => {

    if (!args.length) {
      let error1 = new Discord.EmbedBuilder()
      .setColor('Random')
      .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
      .setDescription(empty);

      message.reply({ embeds: [error1] })
      return
    }
    if (args.length > 1) {
      let error2 = new Discord.EmbedBuilder()
      .setColor('Random')
      .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
      .setDescription(moreThanOne)

      message.reply({ embeds: [error2] })
      return
    }

    const poke = await getPokeFromApi(args[0])

    if(!poke) {
      let error3 = new Discord.EmbedBuilder()
      .setColor('Random')
      .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
      .setDescription(invalidPoke)

      message.reply({ embeds: [error3] })
      return
    }

    let embed = new Discord.EmbedBuilder()
    .setColor('Random')
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
    .setDescription('pera ae rapidin')

    let returnCard = new Discord.EmbedBuilder()
    .setColor('Random')
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
    .setImage(poke.sprites.front_default)
    .setDescription(`Este é o ${poke.name}`)


    message.reply({ embeds: [embed] }).then((msg) => {
      setTimeout(() => {
        msg.edit({ embeds: [returnCard] })
      }, 3500)
    })


  }
};

const getPokeFromApi = async (pokeName) => {
  const {pokeApi} = require('../../database/apis.json');
  const poke = await fetch(`${pokeApi}/${pokeName}`);

  if (poke.status === 404) return;
  else return await poke.json();
};
