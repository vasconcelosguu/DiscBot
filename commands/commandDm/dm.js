const Discord = require('discord.js');

module.exports = {
  name: 'direct',
  description: 'Mensagem particular para algum usuario!',
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'user',
      description: 'Pessoa que irá receber:',
      type: Discord.ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: 'message', 
      description: 'Mensagem que você vai enviar:',
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    if (!interaction.member.permissions.has(Discord.
        PermissionFlagsBits.ManageGuild)) {
      interaction.reply({content: `Você não é adm 😿!`, ephemeral: true});
    } else {
      const user = interaction.options.getUser('user');
      const msg = interaction.options.getString('message');

      const embed = new Discord.EmbedBuilder()
          .setColor('Random')
          .setAuthor({name: interaction.user.username,
            iconURL: interaction.user.displayAvatarURL({dynamic: true})})
          .setDescription(`${msg}`);

      user.send({embeds: [embed]}).then( () => {
        const emb = new Discord.EmbedBuilder()
            .setColor('Random')
            .setDescription(`Salve ${interaction.user}, 
            a mensagem chegou para ${user} ✉`);

        interaction.reply({embeds: [emb]});
      }).catch(() => {
        const emb = new Discord.EmbedBuilder()
            .setColor('Red')
            .setDescription(`Salve ${interaction.user}, o ${user},
            ta com a DM fechada🔒`);

        interaction.reply({embeds: [emb]});
      });
    }
  },
};
