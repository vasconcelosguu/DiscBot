const Discord = require("discord.js")

module.exports = {
    name: "delete",
    description: "Limpa as mensagems",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'quantity',
            description: 'Número de mensagens para serem apagadas.',
            type: Discord.ApplicationCommandOptionType.Number,
            required: true,
        }
    ],

    run: async (client, interaction) => {

        let numb = interaction.options.getNumber('quantity')

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
            interaction.reply({ content: `Você não é adm 😿.`, ephemeral: true })
        } else {

            if (parseInt(numb) > 99 || parseInt(numb) <= 0) {

                let embed = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setDescription(`\`/delete [1 - 99]\``);

                interaction.reply({ embeds: [embed] })

            } else {

                interaction.channel.bulkDelete(parseInt(numb))

                let embed = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setAuthor({ name: interaction.guild.name })
                    .setDescription(`O canal de texo ${interaction.channel} teve \`${numb}\` mensagens deletadas por \`${interaction.user.username}\`.`);

                interaction.reply({ embeds: [embed] })

                let deleteMessage = "nao"

                if (deleteMessage === "sim") {
                    setTimeout(() => {
                        interaction.deleteReply()
                    }, 5000)
                } else if (deleteMessage === "nao") {
                    return;
                }

            }

        }

    }
}