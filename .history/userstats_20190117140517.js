module.exports = {
    async countMessages(receivedMessage, userData, sender, prefix, fs){
        if (!userData[sender.id]) {
            userData[sender.id] = {
                messagesSent: 0
            }
        }
        userData[sender.id].messagesSent++;
    
        if(receivedMessage.content == prefix + 'userstats'){
            await receivedMessage.react('😎')
            await receivedMessage.channel.send('You have sent **' + userData[sender.id].messagesSent + '** messages!');
        }
    
        await fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
            if (err) console.error(err);
            console.log("The file was saved!");
        });
    
        return userData;
    }
}