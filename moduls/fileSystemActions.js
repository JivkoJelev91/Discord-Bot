const fs = require('fs');

module.exports = {
    readFile() {
        return JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'))
    },

    writeFile(userData) {
        fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
            if (err) {
                console.error(err);
            }
            console.log("The file was saved!");
        });
    }
}