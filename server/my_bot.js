const Discord = require('discord.js');
const client = new Discord.Client();
const commands = require('../moduls/processCommand')
const userstats = require('../moduls/userstats');
const gifApi = require('../moduls/giftApi');
const fsActions = require('../moduls/fileSystemActions');
const config = require('./config'); // Make your own config file which will contains your token

const userData = fsActions.readFile();

client.on('ready', () => {
    console.log('Connected as ' + client.user.tag);

    client.user.setActivity('World of Warcraft', {
        type: "PLAYING"
    });

    // client.guilds.forEach((guild) => {
    //     console.log(guild.name);
    //     guild.channels.forEach((channel) => {
    //         console.log(` - ${channel.name} ${channel.type} ${channel.id}`);
    //     })
    // })
})

client.on('message', (receivedMessage) => {
    const sender = receivedMessage.author;

    receivedMessage.content = receivedMessage.content.toLocaleLowerCase();

    userstats.countMessages(userData, sender);

    if (receivedMessage.author == client.user) {
        return;
    }
    if (receivedMessage.content.startsWith('!')) {
        commands.processCommand(receivedMessage);
    }
    if (receivedMessage.content.startsWith('>')) {
        userstats.saveMessages(receivedMessage, userData, sender);
    }
    if (receivedMessage.content == 'gif') {
        gifApi.getGiftApi(receivedMessage)
    }
    // if (receivedMessage.content == 'start trivia') {
    //     startTrivia(receivedMessage)
    // }
    // if(startGame && receivedMessage.content !== 'start trivia'){
    //     bliz(receivedMessage);
    // }


    // This functionality reply every your message
    // receivedMessage.channel.send(
    //     'Message received, ' + 
    //     receivedMessage.author.toString() + ':'  + 
    //     receivedMessage.content 
    // );
});

// let Questions = ['Колко е 1+1?', 'Тъп ли си или да?', 'Ко пр е къде ходиш кат та няма е?', 'здркопребепце'];
// let Answers = ['2', 'da', 'bia', 'ok'];
// let index = 0;
// let startGame = false;
// var startTime = Date.now();
// var timer  = null;
// var interval = null;

// function startTrivia(receivedMessage) {
//     receivedMessage.channel.send(Questions[index]);
//     startGame = true;
// }

// function bliz(receivedMessage){
//     if(receivedMessage.content == Answers[index]){
//         receivedMessage.channel.send(`Ti pozna za ` + timer + 'vreme')
//         return ++index  &&  startTrivia(receivedMessage) 
//     }else{
//         index = 0;
//     }
// }


client.login(config.token); // Type your token from the config file
