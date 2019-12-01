const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  
  let user = message.mentions.users.first() || client.users.get(args[0]) || message.author;
  
  message.channel.send(new Discord.RichEmbed()
                      .setAuthor(`Avatar of ${user.tag}!`, message.guild.iconURL)
                      .setColor(message.member.displayHexColor)
                      .setImage(user.displayAvatarURL)
                      .setDescription(`**[Avatar URL](${user.displayAvatarURL})**`)
                      .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL)
                      .setTimestamp()
                      )
  
}
