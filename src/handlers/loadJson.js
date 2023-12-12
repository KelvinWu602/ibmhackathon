const fs = require('fs')

// return file content as object
const loadJson = (filename)=>{
    console.log(`./data/${filename}`);
    const file = fs.readFileSync(`./data/${filename}`);
    return JSON.parse(file);
}

module.exports = {
    loadJson
}