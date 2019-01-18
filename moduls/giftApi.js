const axios = require('axios');
const limit = 50;
const api = `https://api.tenor.com/v1/search?q=excited&key=LIVDSRZULELA&limit=${limit}&anon_id=3a76e56901d740da9e59ffb22b988242`;

module.exports = {
    async getGiftApi(receivedMessage) {
        let array = [];
        await axios.get(api)
            .then((response) => {
                response.data.results.map((gif) => {
                    array.push(gif.itemurl);
                })
            })
            .catch((error) => {
                console.log(error);
            });

        await showGif(receivedMessage, array);
    }
}

function showGif(receivedMessage, array) {
    var randomValue = array[Math.floor(array.length * Math.random())];
    receivedMessage.channel.send(randomValue);
    console.log(randomValue);
}