// npx nodemon index.js
require('dotenv-flow').config();

const Discord = require('discord.js');
const bot = new Discord.Client();

bot.login(process.env.TOKEN);

bot.on('ready', () => {
    console.log('Logged in as ' + bot.user.tag);
});

const prefix = '!'
bot.on('message', msg => {
    // console.log(`In ${msg.channel.name}, ${msg.author.username} says: "${msg.content}"`);
    const str = msg.content;
    console.log(str);
    // console.log(typeof str);

    if (str.startsWith(`${prefix}ping`)) {
        msg.reply('pong!');
        const args = str.split(/\s+/);
        args.splice(0, 1);
        args.forEach(a => {
            msg.reply(`You also said: ${a}`);
        })
    }
});