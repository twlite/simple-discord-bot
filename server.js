// lets define discord
const Discord = require("discord.js"); // discord.js
const client = new Discord.Client(); // client
const weirdapi = require("weirdapi.js");

// on ready
client.on("ready", () => {
  
  const readytxt = `
__________________________________
Logged In Successfully!
UserName: ${client.user.tag}
ID: ${client.user.id}
Servers: ${client.guilds.size}
Users: ${client.users.size}
__________________________________

`
  console.log(readytxt); // print ^
  
});

client.on("message", async (message) => {
  
  
  if (!message.guild || message.author.bot) return;
  let prefix = ":?"
  
  if (message.channel.id === "yourchannelid") {
    
    
    let input = message.content;
    
    message.channel.startTyping();
    
    let output = await weirdapi.chat(input)
    
    message.channel.stopTyping();
    
    return message.reply(output)
    
    
    
  }
  
  if (!message.content.startsWith(prefix)) return;
  
  let args = message.content.slice(prefix.length).trim().split(" ");
  let cmd = args.shift().toLowerCase();
  
  // Lets make command handler
  
  try {
    
    let commandFile = require(`./commands/${cmd}.js`);
    commandFile.run(client, message, args);
  } catch (e) {
    
    console.log(e)
    
  }
  
  
});
// serverstats
// on member add
client.on("guildMemberAdd", (member) => {

  var ops = {
    total: "total-membercount-channel-id",
    humans: "humans-count-channel-id",
    bots: "bots-count-channel-id"
  }
  
  member.guild.channels.get(ops.total).setName(`Total Members: ${member.guild.memberCount}`); // total membercount
  member.guild.channels.get(ops.humans).setName(`Humans: ${member.guild.members.filter(m => !m.user.bot).size}`); // humans
  member.guild.channels.get(ops.bots).setName(`Bots: ${member.guild.members.filter(m => m.user.bot).size}`); // bots

});

// on member remove
client.on("guildMemberRemove", (member) => {

  var ops = {
    total: "total-membercount-channel-id",
    humans: "humans-count-channel-id",
    bots: "bots-count-channel-id"
  }
  
  member.guild.channels.get(ops.total).setName(`Total Members: ${member.guild.memberCount}`); // total membercount
  member.guild.channels.get(ops.humans).setName(`Humans: ${member.guild.members.filter(m => !m.user.bot).size}`); // humans
  member.guild.channels.get(ops.bots).setName(`Bots: ${member.guild.members.filter(m => m.user.bot).size}`); // bots

});


//// starboard \\\\
client.on('raw', packet => {
 
    if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
    const channel = client.channels.get(packet.d.channel_id);
    if (channel.messages.has(packet.d.message_id)) return;
   
    channel.fetchMessage(packet.d.message_id).then(message => {
       
        const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
        const reaction = message.reactions.get(emoji);
        if (reaction) reaction.users.set(packet.d.user_id, client.users.get(packet.d.user_id));
        if (packet.t === 'MESSAGE_REACTION_ADD') {
            client.emit('messageReactionAdd', reaction, client.users.get(packet.d.user_id));
        }
        if (packet.t === 'MESSAGE_REACTION_REMOVE') {
            client.emit('messageReactionRemove', reaction, client.users.get(packet.d.user_id));
        }
    });
});
 
client.on('messageReactionAdd', async (reaction, user) => {
 const message = reaction.message;
    if (reaction.emoji.name !== '⭐') return;
    if (message.author.id === user.id) return;
    if (message.author.bot) return;
    if (reaction.count < 3) return; // we need 3 stars for starboard
    const starChannel = client.channels.get(starboardChannelID)
    if (!starChannel) return;
    const fetchedMessages = await starChannel.fetchMessages({ limit: 100 });
   
    const stars = fetchedMessages.find(m => m.embeds[0].footer.text.startsWith('⭐') && m.embeds[0].footer.text.endsWith(message.id));
    if (stars) {
      const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(stars.embeds[0].footer.text);
      const foundStar = stars.embeds[0];
      const image = message.attachments.size > 0 ? await (reaction, message.attachments.array()[0].url) : '';
      const embed = new Discord.RichEmbed()
        .setColor(foundStar.color)
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setDescription(foundStar.description)
        .setTimestamp()
        .setFooter(`⭐ ${parseInt(star[1])+1} | ${message.id}`)
        .setImage(image);
      const starMsg = await starChannel.fetchMessage(stars.id);
      await starMsg.edit({ embed });
    }
    if (!stars) {
      const image = message.attachments.size > 0 ? await (reaction, message.attachments.array()[0].url) : '';
      if (image === '' && message.cleanContent.length < 1) return;
      const embed = new Discord.RichEmbed()
        .setColor(message.member.displayHexColor)
        .setDescription(`**[Jump To Message](${message.url})**\n\n${message.cleanContent}`)
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setTimestamp(new Date())
        .setFooter(`⭐ 3 | ${message.id}`)
        .setImage(image);
      await starChannel.send({ embed });
    }
   
})
   
client.on('messageReactionRemove', async (reaction, user) => {
   
    const message = reaction.message;
    if (message.author.id === user.id) return;
    if (message.author.bot) return;
    if (reaction.emoji.name !== '⭐') return;
    const starChannel = client.channels.get(starboardChannelID)
    if (!starChannel) return;
    const fetchedMessages = await starChannel.fetchMessages({ limit: 100 });
    const stars = fetchedMessages.find(m => m.embeds[0].footer.text.startsWith('⭐') && m.embeds[0].footer.text.endsWith(reaction.message.id));
    if (stars) {
      const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(stars.embeds[0].footer.text);
      const foundStar = stars.embeds[0];
      const image = message.attachments.size > 0 ? await (reaction, message.attachments.array()[0].url) : '';
      const embed = new Discord.RichEmbed()
        .setColor(foundStar.color)
        .setDescription(`${foundStar.description}`)
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setTimestamp()
        .setFooter(`⭐ ${parseInt(star[1])-1} | ${message.id}`)
        .setImage(image);
      const starMsg = await starChannel.fetchMessage(stars.id);
      await starMsg.edit({ embed });
      if(parseInt(star[1]) - 1 == 2) return starMsg.delete(1000);
    }
 
});

client.login("Your Token here"); // login your bot to discord
