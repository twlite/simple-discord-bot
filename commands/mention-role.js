const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

	  if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(`:x: You need **MANAGE_ROLES** permission to use this command.`)
  
    if (!args.join(" ")) return message.channel.send(":x: Please provide role name.")
  
	  let role = message.guild.roles.find(m => m.name.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.roles.find(m => m.name.toLowerCase().includes(args.join(" "))) || message.guild.roles.get(args[0])
    if (!role) return message.channel.send("❌ I can't find that role.")
	
	  if (message.guild.me.highestRole.comparePositionTo(role) <= 0 && message.member.id !== message.guild.ownerID) return message.channel.send(':x: I dont have permissions to manage that role!');
    
    if (message.member.highestRole.comparePositionTo(role) <= 0) return message.channel.send('❌ You cant play with that role!');

    await message.delete(1000);
  
    if (!role.mentionable) {
      await role.setMentionable(true);
      await message.channel.send(`${message.author.tag} mentioned ${role.toString()}`);
      return await role.setMentionable(false);
  };  
   return await message.channel.send(`${message.author.tag} mentioned ${role.toString()}`);

}
