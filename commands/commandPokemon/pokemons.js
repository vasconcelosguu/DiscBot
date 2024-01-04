const fetch = require('node-fetch');
const Discord = require('discord.js')
const messages = require('../../database/messages.json').pokemons;
const {invalidPoke} = messages;

module.exports = {
  name: 'poke',
  description: 'Escolher um pokemon',
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'pokemon',
      description: 'Qual é o poke?',
      type: Discord.ApplicationCommandOptionType.String,
      required: true
    }
  ],

  run: async(client, interaction) => {
    const choosedPoke = interaction.options.getString('pokemon')

    const poke = await getPokeFromApi(choosedPoke);

    if (!poke) {
      const embed_error = new Discord.EmbedBuilder()
      .setColor('Random')
      .setDescription(invalidPoke)

      interaction.reply({ embeds : [embed_error] })
      return
    }

      const embed_1 = new Discord.EmbedBuilder()
      .setColor('Random')
      .setAuthor({ name: interaction.user.username })
      .setDescription(`Este é o ${poke.name}`)
      .setImage(poke.sprites.front_default)

      interaction.reply({ embeds: [embed_1] })

}, 
}

const getPokeFromApi = async (pokeName) => {
  const {pokeApi} = require('../../database/apis.json');
  const poke = await fetch(`${pokeApi}/${pokeName}`);

  if (poke.status === 404) return;
  else return await poke.json();
}
