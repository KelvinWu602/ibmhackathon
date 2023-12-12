const {loadJson} = require("./handlers/loadJson.js");
const {validateUserToken} = require("./handlers/validateUserToken.js");

const express = require('express');

//create express app
const app = express();
const fs = require('fs');

const LOGIN_FLOW = true;

//send the client everything in /frontend folder
app.use(express.static("frontend"));
//enable send/receiving json
app.use(express.json());

//register a user with username and password
app.post("/register", (req,res)=>{
    const { username, password } = req.body;

    //check username existence in user.json
    const users = loadJson('user.json');
    for(let token in users){
        if(username === users[token].username)
            return res.status(400).send();
    }

    // Generate the token with the username and password as payload
    const token = jwt.sign({ username, password }, 'secretKey', { expiresIn: '24h' }); //TODO: all users will not last longer than 24h

    users[token] = {username, password};
    fs.writeFileSync("user.json",JSON.stringify(users,null,2))
    return res.status(200).json({token});
})

//allow login
app.post("/login", (req,res)=>{
    const { username, password } = req.body;

    //check password in user.json
    const users = loadJson('user.json');
    for(let token in users){
        if(username === users[token].username && password === users[token].password){
            return res.status(200).json({token});
        }
    }

    return res.status(400);
});

//load data of a particular user
app.get("/todos", (req,res)=>{
    const { token } = req.query;
    if(!validateUserToken(token))
        return res.status(400).send();

    const users = loadJson('user.json');
    const username = users[token].username;
    const datas = loadJson('userdata.json');
    const data = datas[username];
    return res.status(200).json(data);
})

//insert initial data of a new user
app.post("/todos", (req,res)=>{
    const { token } = req.body;
    if(!validateUserToken(token))
        return res.status(400).send();

    const {username} = loadJson('user.json')[token];
    const data = loadJson('userdata.json');
    data[username] = [];
    fs.writeFileSync("./data/userdata.json", JSON.stringify(data,null,2));

    return res.status(200).send();
})

//append item in a todo list of an user
app.patch("/todos", (req, res)=>{
    const { token, item } = req.body;
    if(!validateUserToken(token))
        return res.status(400).send();

    const {username} = loadJson('user.json')[token];
    const data = loadJson('userdata.json');
    data[username].push(item);
    fs.writeFileSync("./data/userdata.json", JSON.stringify(data,null,2));

    return res.status(200).send();
})

//remove a particular item in a todo list of an user
app.delete("/todos", (req, res)=>{
    const { token, item } = req.body;
    if(!validateUserToken(token))
        return res.status(400).send();

    const {username} = loadJson('user.json')[token];
    const data = loadJson('userdata.json');
    //TODO: array may need to change to object
    data[username].remove(item);
    fs.writeFileSync("./data/userdata.json", JSON.stringify(data,null,2));

    return res.status(200).send();
})


app.listen(8000, () => {
    console.log("Server is running on port 8000");
});