const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const path = require('path');
const commands = require('./processCommand');
var level = 0;

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
    // if (receivedMessage.content === prefix + 'userstats') {
    countMessages(receivedMessage, sender, level, fs);
    // }


        // receivedMessage.channel.send(
    //     'Message received, ' + 
    //     receivedMessage.author.toString() + ':'  + 
    //     receivedMessage.content
    // );
    // receivedMessage.react('😎');
    
});

// Leveling System
async function countMessages(receivedMessage, sender, level,  fs){
    if (!userData[sender.id]) {
        userData[sender.id] = {
            messagesSent: 0
        }
    }
    userData[sender.id].messagesSent++;

    if(userData[sender.id].messagesSent % 2 == 0){
        level++;
        await receivedMessage.channel.send('Ти си **' + level + '** ниво! Стига спами вече!');
    }


    await receivedMessage.channel.send('You have sent **' + userData[sender.id].messagesSent + '** messages!');
    

    await fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
        if (err) console.error(err);
        console.log("The file was saved!");
    });

    // await levelingSystem(receivedMessage, userData[sender.id].messagesSent, level);
    


    return userData;
}

 async function levelingSystem(receivedMessage, userMsg, level){
    if(userMsg % 2 == 0){
        console.log('krekre');
        return await level++ && receivedMessage.channel.send('Ти си **' + level + '** ниво! Стига спами вече!');
    }
}


client.login('NTM1MDc0MTQwNDA3ODU3MTUy.DyC2MQ.qc7DeZzp8oCKNb4xIs-HkASOgm0');