const { RichEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {

  message.channel.send("Pinging...").then(m => {
  
    const embed = new RichEmbed()
    .setAuthor(`Pong!`)
    .setDescription(`API Latency: ${Math.round(client.ping)}ms | Bot Latency: ${m.createdTimestamp - message.createdTimestamp}`)
    .setColor('BLACK')
    
    m.edit(embed);
  
  });

}
