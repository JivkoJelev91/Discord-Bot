const Discord = require('discord.js');
const client = new Discord.Client();
const commands = require('../moduls/processCommand')
const userstats = require('../moduls/userstats');
const renderGif = require('../moduls/giftApi');
const config = require('./config'); // Make your own token
const fsActions = require('../moduls/fileSystemActions');
const fs = require('fs');
const date = new Date();

var userData = fsActions.readFile();

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

client.login(config.token); // HERE COMES YOUR TOKEN