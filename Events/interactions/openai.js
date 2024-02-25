const { Client } = require('discord.js');
const gptSchema = require("../../schemas/gptSchema.js");
const { OpenAI } = require('openai')
const IGNORE_PREFIX = "!";
const config = require("../../config.json")

const openai = new OpenAI({
   apiKey: config.open_ai,
})

module.exports = {
   name: 'messageCreate',
   /**
    * 
    * @param {Client} client 
    */
   async execute(message, client) {
      const guildId = message.guild.id;

      if(message.author.bot) return;
      if(message.content.startsWith(IGNORE_PREFIX)) return;

      const gptData = await gptSchema.findOne({ GuildId: guildId });
      if(!gptData) return;
      if(gptData.Enabled == false) return;

      if(gptData.Enabled) {
         if(gptData.GuildId == message.guild.id) {
            if(message.channel.id == gptData.ChannelId) {
               await message.channel.sendTyping();
               const sendTypingInterval = setInterval(() => {
                  message.channel.sendTyping();
               }, 5000);

               const response = await openai.chat.completions.create({
                  model: 'gpt-3.5-turbo',
                  messages: [
                     {
                        role: 'system',
                        content: 'Chat GPT is a firendly chatbot.'
                     },
                     {
                        role: 'user',
                        content: message.content,
                     }
                  ]

               }).catch((error) => console.error('OpenAI Error \n', error))

               clearInterval(sendTypingInterval);

               if (!response) {
                  message.reply("Prodlémáim vannak az OpenAI API-al! Próbáld újra késöbb vagy keresd fel Márkot a készítőm hogy mi a baja :D")
                  return;
               }

               message.reply(response.choices[0].message.content)
            }
         }
      }
   },
};
