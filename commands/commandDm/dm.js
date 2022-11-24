const Discord = require('discord.js');

module.exports = {
  name: 'dm',
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'usuário',
      description: 'Pra quem',
      type: Discord.ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: 'mensagem', 
      description: 'escreve algo ae',
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    if (!interaction.member.permissions.has(Discord.
        PermissionFlagsBits.ManageGuild)) {
      interaction.reply({content: `Você não possui permissão para
       utilizar este comando!`, ephemeral: true});
    } else {
      const user = interaction.options.getUser('user');
      const msg = interaction.options.getString('mensagem');

      const embed = new Discord.EmbedBuilder()
          .setColor('Random')
          .setAuthor({name: interaction.user.username,
            iconURL: interaction.user.displayAvatarURL({dynamic: true})})
          .setDescription(`${msg}`);

      user.send({embeds: [embed]}).then( () => {
        const emb = new Discord.EmbedBuilder()
            .setColor('Green')
            .setDescription(`Olá ${interaction.user},
            a mensagem foi enviada para ${user} com sucesso!`);

        interaction.reply({embeds: [emb]});
      }).catch(() => {
        const emb = new Discord.EmbedBuilder()
            .setColor('Red')
            .setDescription(`Olá ${interaction.user},
            a mensagem não foi enviada para ${user},
            pois o usuário está com a DM fechada!`);

        interaction.reply({embeds: [emb]});
      });
    }
  },
};
