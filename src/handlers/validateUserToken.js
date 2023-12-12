const {loadJson} = require('./loadJson.js');

// load user.json, if a key equal to 'token' exists, the token is considered valid
const validateUserToken = (token)=>{
    if (!token) return false;
    const users = loadJson('userdata.json');
    return users[token]!=undefined;
}

module.exports = {
    validateUserToken
}