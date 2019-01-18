const Discord = require('discord.js');
const client = new Discord.Client();
const commands = require('../moduls/processCommand')
const userstats = require('../moduls/userstats');
const renderGif = require('../moduls/giftApi');
const fs = require('fs');
const date = new Date();


var userData = JSON.parse(fs.readFileSync('./Storage/userData.json', 'utf8'));

client.on('ready', () => {
    console.log('Connected as ' + client.user.tag);

    client.user.setActivity('World of Warcraft', {
        type: "PLAYING"
    });

    client.guilds.forEach((guild) => {
        console.log(guild.name);
        guild.channels.forEach((channel) => {
            console.log(` - ${channel.name} ${channel.type} ${channel.id}`);
        })
    })
})

client.on('message', (receivedMessage) => {
    var sender = receivedMessage.author;
    userstats.countMessages(userData ,sender);

    if (receivedMessage.author == client.user) {
        return;
    }
    if (receivedMessage.content.startsWith('!')) {
        commands.processCommand(receivedMessage, date);
    }
    if (receivedMessage.content.startsWith('>')) {
        userstats.saveMessages(receivedMessage, userData , sender, fs);
    }
    if (receivedMessage.content == 'gif') {
        renderGif.getGiftApi(receivedMessage)
    }
    
    // This functionality reply every your message
    // receivedMessage.channel.send(
    //     'Message received, ' + 
    //     receivedMessage.author.toString() + ':'  + 
    //     receivedMessage.content
    // );
    
});


client.login('NTM1MDc0MTQwNDA3ODU3MTUy.DyC2MQ.qc7DeZzp8oCKNb4xIs-HkASOgm0');