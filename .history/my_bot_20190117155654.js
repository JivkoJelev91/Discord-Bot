const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const path = require('path');
const commands = require('./processCommand');
const userstats = require('./userstats');
const axios = require('axios');

var userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));

client.on('ready', () => {
    console.log('Connected as ' + client.user.tag);

    client.user.setActivity('Youtube', {
        type: "WATCHING"
    });

    client.guilds.forEach((guild) => {
        console.log(guild.name);
        guild.channels.forEach((channel) => {
            console.log(` - ${channel.name} ${channel.type} ${channel.id}`);
        })
        //General channel id: 535073760731070496
    })

    let generalChannel = client.channels.get('535073760731070496');
    // const attachment = new Discord.Attachment("https://www.devdungeon.com/sites/all/themes/devdungeon2/logo.png");
    // generalChannel.send(attachment);
})

client.on('message', (receivedMessage) => {
    var prefix = '>';
    var sender = receivedMessage.author;

    if (receivedMessage.author == client.user) {
        return;
    }
    if (receivedMessage.content.startsWith('!')) {
        commands.processCommand(receivedMessage);
    }
    if (receivedMessage.content.startsWith('>')) {
        userstats.countMessages(receivedMessage, userData , sender, prefix, fs);
    }
    if (receivedMessage.content == 'gif') {
        getGiftApi(receivedMessage)
    }
    

    // receivedMessage.channel.send(
    //     'Message received, ' + 
    //     receivedMessage.author.toString() + ':'  + 
    //     receivedMessage.content
    // );
    
});

function getGiftApi(receivedMessage){
    const api = 'https://api.tenor.com/v1/search?q=excited&key=LIVDSRZULELA&limit=8&anon_id=3a76e56901d740da9e59ffb22b988242';
    axios.get(api)
          .then((response) => {
              response.data.results.map((gif) => {
                    var keys = Object.keys(gif)
                      console.log(keys[Math.floor(Math.random() * keys.length)]);
                //   receivedMessage.channel.send(gif.itemurl);
                })
          })
          .catch(function (error) {
            console.log(error);
          });
}


client.login('NTM1MDc0MTQwNDA3ODU3MTUy.DyC2MQ.qc7DeZzp8oCKNb4xIs-HkASOgm0');