const express = require('express');
const app = express();

const messages = [];
const joinedusers = [];

app.get('/api/join', (req, res) => {
    const username = req.query.username;

    if (username) {
        joinedusers.push(username);
        messages.push(`${username} has joined`);
        res.status(200).send("JOINOK");
    } else {
        res.status(400).send("JOINFAILNOUSERNAME");
    }
});

app.get('/api/sendmsg', (req, res) => {
    const username = req.query.username;
    const message = req.query.message;

    if (joinedusers.includes(username)) {
        messages.push(`${username}: ${message}`);
        res.status(200).send("SENDOK");
    } else {
        res.status(403).send("SENDFAILNOTEXIST");
    }
});

app.get('/api/msglist', (req, res) => {
    res.status(200).json(messages);
});

app.get('/api/users', (req, res) => {
    res.status(200).json(joinedusers);
});

// Optional: Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
