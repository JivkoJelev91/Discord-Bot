
async function getGiftApi (receivedMessage){
    let array = [];
    await axios.get(api)
          .then((response) => {
              response.data.results.map((gif) => {
                  array.push(gif.itemurl);
                })
          })
          .catch(function (error) {
            console.log(error);
          });

   await showGif(receivedMessage, array);
}

function showGif(receivedMessage, array){
    var randomValue = array[Math.floor(array.length * Math.random())];
    receivedMessage.channel.send(randomValue);
}
