function helpCommand(args, receivedMessage) {
    if (args.length == 0) {
        receivedMessage.channel.send('I am not sure what you need help with. Try `!show [topic]`');
    } else {
        receivedMessage.channel.send('It looks like you need help with ' + args);
    }
}

function getCurrentTime(receivedMessage, date) {
    receivedMessage.channel.send(
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
        if (hours >= args || args > 24) return receivedMessage.channel.send('Tomorrow try again!!');
        let [leftHours, leftMinutes] = [(args - ++hours) , 60 - mins];
        let strLiteral = `There is ${leftHours} hours and ${leftMinutes} minutes left!`;
        return receivedMessage.channel.send('```dif' + '\n' + strLiteral + '\n' + '```') && receivedMessage.react('👍');
    }
    return receivedMessage.channel.send('Type a number and stop writing bulshits!') && receivedMessage.react('💩');
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