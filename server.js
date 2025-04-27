const express = require('express');

const app = express();


messages = [];

joinedusers = [];

app.get('/api/join', (req, res) {
    const username = req.query.username;


    joinedusers.push(username)

    messages.push(`${username} has joined`);

    res.status(200).send("JOINOK");
});


app.get('/api/sendmsg', (req, res) {
    const username = req.query.username;
    const message = req.query.message;

    if (joinedusers.includes(username)) {
        messages.push(username + ": " + message);
    }
    else {
        res.status(403).send("SENDFAILNOTEXIST");
    }
});


app.get('/api/msglist', (req, res) {
    res.status(200).json(messages);
});

app.get('/api/users', (req, res) {
    res.status(200).json(joinedusers);
});
