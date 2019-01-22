function helpCommand(args, receivedMessage) {
    if (args.length == 0) {
        receivedMessage.channel.send('I am not sure what you need help with. Try `!show [topic]`');
    } else {
        receivedMessage.channel.send('It looks like you need help with ' + args);
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
    let commands = ['-1 !help', '-2 !training', '-3 !ping', '-4 !time', '-5 !show', '-6 >userstats', '-7 gif'];
    receivedMessage.channel.send(
        "The all commands are:" + '\n' + '```diff' + '\n' + commands.join('\n') + '```'
    );
}

function timeToStartTraining(args, receivedMessage, date) {
    args = args.filter(x => (/^(\d+)$/g).test(x) && x !== '').map(parseInt);
    if(args.length !== 0){
        let [hours, mins] = [date.getHours(), date.getMinutes()];
        if (hours >= args) return receivedMessage.channel.send('Утре пробвай пак!');
        if (args > 24) return receivedMessage.channel.send('Ти неска тренира ли че питаш за утре?!');
        let [leftHours, leftMinutes] = [(args - ++hours) , 60 - mins];
        let strLiteral = `Остават още ${leftHours} часа и ${leftMinutes} минути време до трерорвка балъче! \nКой си е дебел си е дебел. До ген си е!`;
        return receivedMessage.channel.send('```dif' + '\n' + strLiteral + '\n' + '```') && receivedMessage.react('👍');
    }
    return receivedMessage.channel.send('Въведи число е кви са тия тъпни къде ги въвеждаш ...') && receivedMessage.react('💩');
}

module.exports = {
    processCommand(receivedMessage) {
        let date = new Date();
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