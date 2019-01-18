function multiplyCommand(arguments, receivedMessage) {
    if (arguments.length < 2) {
        receivedMessage.channel.send('Not enough arguments. Try `!multiplu 2 10`');
        return;
    }
    let product = 1;

    arguments.forEach((value) => {
        product *= parseFloat(value);
    })
    receivedMessage.channel.send('Калкулатор няяш ли е? Ай ко да та прая. ' + arguments + ' e ' + product.toString());
}

function helpCommand(arguments, receivedMessage) {
    if (arguments.length == 0) {
        receivedMessage.channel.send('I am not sure what you need help with. Try `!show [topic]`');
    } else {
        receivedMessage.channel.send('It looks like you need help with ' + arguments);
    }
}

function getCurrentTime(receivedMessage){
    receivedMessage.channel.send(
        'Календар няяш ли е ? \nАй ко да та прая \n' + 
        new Date().toLocaleTimeString() + '\n' +
        new Date().toLocaleDateString()
    );
}

function showCommands(receivedMessage){
    let commands = ['-1 !help', '-2 !multiply',  '-3 !ping' , '-4 !time'  ,'-5 !show', '-6 <userstats', '-7 gif'];
    receivedMessage.channel.send(
       "The all commands are:" + '\n' +  '```diff' + '\n' + commands.join('\n') + '```'
    );
}

module.exports = {
    processCommand(receivedMessage) {
        let fullComand = receivedMessage.content.substr(1);
        let splitCommand = fullComand.split(' ');
        let primaryCommand = splitCommand[0];
        let arguments = splitCommand.slice(1);
    
        if (primaryCommand == 'help') {
            helpCommand(arguments, receivedMessage);
        } else if (primaryCommand == 'multiply') {
            multiplyCommand(arguments, receivedMessage);
        } else if (primaryCommand == 'time') {
            getCurrentTime(receivedMessage)
        } else if (primaryCommand == 'show') {
            showCommands(receivedMessage)
        } else if (primaryCommand == 'ping') {
            receivedMessage.reply('Pong!')
        } else {
            receivedMessage.channel.send('Unknown command. Try `!help` or `!show`')
        }
    }
}