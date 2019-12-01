const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  const toeval = message.content.split(" ").slice(1);
  const clean = text => {
    if (typeof text === "string")
      return text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
  };

  if (message.author.id !== "01234567890123456789")
    return message.channel.send(
      ":x: Eval command can only be used by bot owners."
    );
  if (!args[0]) return message.channel.send(`❌ Please provide code to eval.`);
  try {
    const code = toeval.join(" ");
    let evaled = eval(code);
    if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

    const embed = new Discord.RichEmbed()
      .setAuthor("EVALUATION", message.author.displayAvatarURL)
      .setColor("#00C951")
      .addField(`📥INPUT📥`, `\`\`\`js\n${code}\`\`\``)
      .addField(`📤OUTPUT📤`, `\`\`\`js\n${clean(evaled)}\`\`\``)
      .setFooter("OUTCOME: SUCCESS!", client.user.displayAvatarURL)
      .setTimestamp();
    message.channel.send(embed);
  } catch (err) {
    const embed = new Discord.RichEmbed()
      .setAuthor("EVALUATION", message.author.displayAvatarURL)
      .setColor("#F5372A")
      .addField(`📥INPUT📥`, `\`\`\`js\n${toeval.join(" ")}\`\`\``)
      .addField(`📤OUTPUT📤`, `\`\`\`js\n${clean(err)}\`\`\``)
      .setFooter("OUTCOME: ERROR!", client.user.displayAvatarURL)
      .setTimestamp();
    message.channel.send(embed);
  }
};
