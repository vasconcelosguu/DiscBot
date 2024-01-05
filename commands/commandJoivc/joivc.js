const { entersState, joinVoiceChannel, VoiceConnectionStatus, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const ytdl = require('ytdl-core-discord');
const Discord = require('discord.js');

module.exports = {
  name: "joinvc",
  description: "Faça o bot entrar no canal de voz do usuário.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    await interaction.deferReply();

    const voiceChannelId = interaction.member.voice.channelId;
    if (!voiceChannelId) {
      return interaction.editReply('Você precisa estar em um canal de voz!');
    }

    const connection = joinVoiceChannel({
      channelId: voiceChannelId,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });

    try {
      await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
    } catch (error) {
      connection.destroy();
      return interaction.editReply('Falha ao entrar no canal de voz em 30 segundos, tente novamente mais tarde.');
    }

    const songUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // Rick Astley - Never Gonna Give You Up
    const stream = await ytdl(songUrl);
    const resource = createAudioResource(stream);
    const player = createAudioPlayer();
    player.setVolume(0.5);
    player.play(resource);
    connection.subscribe(player);

    try {
      await entersState(player, AudioPlayerStatus.Playing, 30_000);
      return interaction.editReply('Agora está tocando!');
    } catch (error) {
      console.error(error);
      return interaction.editReply('Falha ao reproduzir áudio em 30 segundos, tente novamente mais tarde.');
    }
  }
};