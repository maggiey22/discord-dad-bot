// npx nodemon index.js to run locally
require('dotenv-flow').config();
require('axios')

const { default: Axios } = require('axios');
const Discord = require('discord.js');
const bot = new Discord.Client();

bot.login(process.env.TOKEN);

bot.on('ready', () => {
    console.log('Logged in as ' + bot.user.tag);
});

const cmdPrefix = '!';
const greetings = [
    'hey kid!',
    'what\'s up kiddo?',
    'are ya winning?',
    'how was your day?',
    '*loud sneeze*',
];
const errorMsg = 'Uh oh, I can\'t think of any jokes right now!';
const help = `
Summon me with \`!dad\` or \`@spacedad\`:
- Call me with \`joke\` for a dad joke (ex. \`!dad joke\`)
- Ask me for help with \`how do I\` (ex. \`!dad how do I bake pie?\`)
`;

// from MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

async function getRandomJoke() {
    return await Axios.get("https://icanhazdadjoke.com/slack") // use the slack endpoint to get json
                    .then(res => {
                        return res.data.attachments[0].text;
                    })
                    .catch(err => {
                        console.log(err);
                        return errorMsg;
                    });
}

async function handleMsg(msg) {
    if (msg.author === bot.user) return; // prevent bot from replying to itself
    const str = msg.content;

    const args = str.split(/\s+/);
    args.splice(0, 1);

    if (str.startsWith(`${cmdPrefix}dad`) || str.startsWith(`<@${bot.user.id}>`) || str.startsWith(`<@!${bot.user.id}>`)) {
        if (args.length === 0 ||
            args[0].toLowerCase() === 'hi' ||
            args[0].toLowerCase() === 'hey' ||
            args[0].toLowerCase() === 'hello') {
            msg.reply(greetings[getRandomInt(greetings.length)]);

        } else if (args[0].toLowerCase() === 'joke') {
            let joke = await getRandomJoke();
            msg.reply(`here's one:\n${joke}`);

        } else if (args[0].toLowerCase().replace("\'", '') === 'im') {
            args.splice(0,1)
            msg.reply(`hi ${args.join(' ')}, I\'m Dad`);

        } else if (args[0].toLowerCase() === 'how' && 
                   args[1].toLowerCase() === 'do' && 
                   args[2].toLowerCase() === 'i') {
            args.splice(0,3)
            msg.reply(`https://www.youtube.com/c/DadhowdoI/search?query=${encodeURIComponent(args.join(' ').trim().replace('?', ''))}`)

        } else {
            msg.reply(`sorry, I didn't quite catch that :(\n${help}`);
        }
    }
}

bot.on('message', msg => handleMsg(msg));
