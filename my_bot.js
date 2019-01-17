const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const path = require('path');
var array = [];

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
        //General channel id Еxample: 535073760731070491
    })

    let generalChannel = client.channels.get('535073760731070491'); // Generate your tocken!
    // const attachment = new Discord.Attachment("https://www.devdungeon.com/sites/all/themes/devdungeon2/logo.png");
    // generalChannel.send(attachment);
})

client.on('message', (receivedMessage) => {
    var sender = receivedMessage.author;
    var msg = receivedMessage.content
    var prefix = '>';

    if (receivedMessage.content.startsWith('!')) {
        processCommand(receivedMessage);
    }
    // receivedMessage.channel.send(
    //     'Message received, ' + 
    //     receivedMessage.author.toString() + ':'  + 
    //     receivedMessage.content
    // );
    // receivedMessage.react('😎');

    // if (receivedMessage.author == client.user) {
    //     return;
    // }
    

    if (msg === prefix + 'ping') {
        receivedMessage.channel.send('Pong')
    }

    if (msg === prefix + 'userstats') {
        receivedMessage.channel.send('You have sent **' + userData[sender.id].messagesSent + '** messages!');
    }

    // Leveling System
    if (!userData[sender.id]) {
        userData[sender.id] = {
            messagesSent: 0
        }
    }

    userData[sender.id].messagesSent++;



    // fs.writeFile('./Storage/userData.json', JSON.stringify(userData), (err) => {
    //     if (err) console.error(err);
    //     console.log("The file was saved!");
    //     fs.close('./Storage/userData.json', function() {
    //         console.log('file written');
    //     })
    // });
    console.log(receivedMessage.content);

})

function processCommand(receivedMessage) {
    let fullComand = receivedMessage.content.substr(1);
    let splitCommand = fullComand.split(' ');
    let primaryCommand = splitCommand[0];
    let arguments = splitCommand.slice(1);

    if (primaryCommand == 'help') {
        helpCommand(arguments, receivedMessage);
    } else if (primaryCommand == 'multiply') {
        multiplyCommand(arguments, receivedMessage);
    } else if (primaryCommand == 'userstats') {
        gameCommand(receivedMessage);
    } else {
        receivedMessage.channel.send('Unknown command. Try `!help` or `!multiply`')
    }
}

function gameCommand(receivedMessage) {
    // if (msg === prefix + 'userstats') {
    //     receivedMessage.channel.send('You have sent **' + userData[sender.id].messagesSent + '** messages!');
    // }
}

function multiplyCommand(arguments, receivedMessage) {
    if (arguments.length < 2) {
        receivedMessage.channel.send('Not enough arguments. Try `!multiplu 2 10`');
        return;
    }
    let product = 1;

    arguments.forEach((value) => {
        product *= parseFloat(value);
    })
    receivedMessage.channel.send('Калкулатор няяш ли е? Ай ко да та прая. ' + arguments + ' e ' + product.toString())

}

function helpCommand(arguments, receivedMessage) {
    if (arguments.length == 0) {
        receivedMessage.channel.send('I am not sure what you need help with. Try `!help [topic]`')
    } else {
        receivedMessage.channel.send('It looks like you need help with ' + arguments)
    }
}

client.login('NTM1MDc0MTQwNDA3ODU3MTUy.DyC2MQ.qc7DeZzp8oCKNb4xIs-HkASOgm0');
