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
        } else {
            receivedMessage.channel.send('Unknown command. Try `!help` or `!multiply`')
        }
    }
    
}