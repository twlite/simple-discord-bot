const weirdapi = require('weirdapi.js');
const { RichEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  
  let meme = weirdapi.meme()
  
  const embed = new RichEmbed()
  .setAuthor("Memes")
  .setImage(meme)
  .setColor("BLURPLE")
  .setTimestamp()
  .setFooter("weirdapi.js | https://theweirdapi.glitch.me/")
  
  return message.channel.send(embed);
  
}
