const Discord = require('discord.js');

exports.run = (client, message, args) => {
 
  let user = message.mentions.users.first() || message.author;
  
  if (user.presence.game !== null &&  user.presence.game.type == '2' && user.presence.game.name === 'Spotify' && user.presence.game.assets !== null) {

    let trackIMG = `https://i.scdn.co/image/${user.presence.game.assets.largeImage.slice(8)}`;
    let trackURL = `https://open.spotify.com/track/${user.presence.game.syncID}`;
    let trackName = user.presence.game.details;
    let trackAuthor = user.presence.game.state;
    let trackAlbum = user.presence.game.assets.largeText;
    
    const embed = new Discord.RichEmbed()
      .setAuthor('Spotify Status', 'https://pbs.twimg.com/profile_images/558556141605511168/2JDJX8SQ.png')
      .setColor("#1DB954")
      .setThumbnail(user.displayAvatarURL)
      .setImage(trackIMG)
      .addField("USER", user.tag)
      .addField("ID", user.id)
      .addField('SONG NAME', `**[${trackName}](${trackURL})**`)
      .addField('ALBUM', `**[${trackAlbum}](${trackURL})**`)
      .addField('SONG BY', `**[${trackAuthor}](${trackURL})**`)
      .addField('LINK', `**[${trackName} - ${trackAlbum} - ${trackAuthor}](${trackURL})**`)
      .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL)
      .setTimestamp();
    return message.channel.send(embed);
    
  } else {
    
    return message.channel.send("That user isn't listening to Spotify rn.");
    
  }
  
  
}
