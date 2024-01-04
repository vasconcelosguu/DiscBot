const Discord = require("discord.js");
const ytdl = require('ytdl-core');
const { MessageEmbed } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, entersState, StreamType, AudioPlayerStatus, VoiceConnectionStatus } = require('@discordjs/voice');

module.exports = {
  name: "joinvc",
  description: "Faça o bot entrar no canal de voz do usuário.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    if (!interaction.member.voice.channel) {
      return interaction.reply('Você precisa estar em um canal de voz!');
    }

    const connection = joinVoiceChannel({
      channelId: interaction.member.voice.channel.id,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });

    const ping = client.ws.ping;

    const songUrl = 'https://open.spotify.com/intl-pt/track/7KVBqGLGhrEejVokzYd8vF?si=5dd5b67580ad4fae';

    const stream = ytdl(songUrl, { filter: 'audioonly' });
    const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
    const player = createAudioPlayer();
    player.play(resource);
    connection.subscribe(player);
  }
};
