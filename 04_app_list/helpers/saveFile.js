const fs = require('fs');

const path = './database/DB.JSON';
const saveDB = (data) => {
    fs.writeFileSync(path, JSON.stringify(data));
}

const readDB = () => {
    if (!fs.existsSync(path)) {
        return null;
    }
    const info = fs.readFileSync(path, {
        encoding: 'utf-8'
    });
    const data = JSON.parse(info);
    return data
}

module.exports = {saveDB, readDB};