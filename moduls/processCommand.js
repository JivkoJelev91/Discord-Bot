function helpCommand(arguments, receivedMessage) {
    if (arguments.length == 0) {
        receivedMessage.channel.send('I am not sure what you need help with. Try `!show [topic]`');
    } else {
        receivedMessage.channel.send('It looks like you need help with ' + arguments);
    }
}

function getCurrentTime(receivedMessage, date) {
    receivedMessage.channel.send(
        'Календар няяш ли е ? \nАй ко да та прая \n' +
        date.toLocaleTimeString() + '\n' +
        date.toLocaleDateString()
    );
}

function showCommands(receivedMessage) {
    let commands = ['-1 !help', '-2 !training', '-3 !ping', '-4 !time', '-5 !show', '-6 <userstats', '-7 gif'];
    receivedMessage.channel.send(
        "The all commands are:" + '\n' + '```diff' + '\n' + commands.join('\n') + '```'
    );
}

function timeToStartTraining(arguments, receivedMessage, date) {
    let [trainingTime, hours, mins] = [arguments, date.getHours(), date.getMinutes()];

    if (hours >= trainingTime) {
        return receivedMessage.channel.send('Утре пробвай пак!');
    }

    let [h, m] = [trainingTime - hours, 60 - mins];

    if (mins > 0) {
        return h-- && receivedMessage.channel.send(`
              Остават още ${h}:${m} часа време до трерорвка балъче!`);
    }
}

module.exports = {
    processCommand(receivedMessage, date) {
        let fullComand = receivedMessage.content.substr(1);
        let splitCommand = fullComand.split(' ');
        let primaryCommand = splitCommand[0];
        let args = splitCommand.slice(1);
        let commands = ['help', 'time', 'show', 'training', 'ping'];

        if (!commands.includes(primaryCommand)) {
            return receivedMessage.channel.send('Unknown command. Try `!help` or `!show`');
        }
        return {
            'help': () => helpCommand(args, receivedMessage),
            'time': () => getCurrentTime(receivedMessage, date),
            'show': () => showCommands(receivedMessage),
            'training': () => timeToStartTraining(args, receivedMessage, date),
            'ping': () => receivedMessage.reply('Pong!'),
        } [primaryCommand]();
    }
}