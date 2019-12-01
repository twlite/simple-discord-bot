const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports.run = async (client, message, args) => {
  
  let user = message.mentions.users.first() || client.users.get(args[0]) || message.author;
  if (user.bot) return message.channel.send(':x: | That user is a bot!');
  let send = message.channel;
  let icon = message.guild.iconURL
  fetch(`https://mee6.xyz/api/plugins/levels/leaderboard/${message.guild.id}`)
  .then(res => res.json())
  .then(body => {
    
    body.players.filter(u => u.id === user.id).map(m => {
      
      if (!m) return message.channel.send(':x: | Not Found!')
      let username = m.username+'#'+m.discriminator
      let guild = m.guild_id
      let level = m.level
      let message = m.message_count
      let id = m.id
      let xp = m.xp
      let avatar = `https://cdn.discordapp.com/avatars/${id}/${m.avatar}.png?size=2048`;
      
      const embed = new Discord.RichEmbed()
      .setAuthor('MEE6 Stats', icon)
      .addField('Server ID', guild, true)
      .addField('User', `<@${id}>`, true)
      .addField('Username', username, true)
      .addField('Level', level, true)
      .addField('Messages', message, true)
      .addField('XP', xp, true)
      .setThumbnail(avatar)
      .setFooter('MEE6 API - mee6.xyz', 'https://cdn.discordapp.com/avatars/159985870458322944/b50adff099924dd5e6b72d13f77eb9d7.png')
      .setTimestamp()
      .setColor('BLACK')
      return send.send(embed)
      
    })
  })
  
}
