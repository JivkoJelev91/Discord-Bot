const fsActions = require('../moduls/fileSystemActions');

module.exports = {
    async saveMessages(receivedMessage, userData, sender, fs) {
        var prefix = '>';
        try {
            if (receivedMessage.content == prefix + 'userstats') {
                await receivedMessage.react('😎');
                await receivedMessage.channel.send('You have sent **' + userData[sender.id].messagesSent + '** messages!');
            }
            await fsActions.writeFile(userData);
        } catch (err) {
            console.error(err);
        }
        return userData;
    },

    countMessages(userData, sender) {
        if (!userData[sender.id]) {
            userData[sender.id] = {
                messagesSent: 0
            }
        }
        userData[sender.id].messagesSent++;
    }

}