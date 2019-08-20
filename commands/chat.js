const api = require("some-random-api")

module.exports.run = async (client, message, args) => {
  
  
  let input = args.join(" ");
  if (!input) return message.channel.send(":x: Please provide a text.");
  
  message.channel.startTyping()
  let output = await api.chat(`${input}`)
  message.channel.send(output)
  message.channel.stopTyping()
  
  
}
