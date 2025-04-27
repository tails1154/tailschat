const express = require('express');
const app = express();
const path = require('path');
const crypto = require('crypto');


const hash = crypto.createHash('sha256');



// To change the set the ban command password, set the env variable banhashpasswd to your sha256 hashed password

const messages = [];  // Global messages array
const joinedusers = [];
const bannedusers = [];


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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/sendmsg', (req, res) => {
    const username = req.query.username;
    const message = req.query.message;

    if (joinedusers.includes(username)) {
        if (bannedusers.includes(username)) {
            return;
        }
        const messagearray = message.split(' ');
        if (messagearray[0] === "/clear") {
            // Clear the global messages array
            messages.length = 0;  // This empties the array
            res.status(200).send("CLEAROK");
        } else if (messagearray[0] === "/ban") {
            if (crypto.createHash('sha256').update(messagearray[1]).digest('hex') == process.env.banhashpasswd) {
                bannedusers.push(messagearray[2]);
                console.log(messagearray[2] + " has been banned");
                messages.push(messagearray[2] + " has been banned");
            }
            else {
                messages.push("/ban: incorrect usage");
            }
        } else if (messagearray[0] == "/help") {
            messages.push("/help: commands are: /ban /clear /help /unban");
        } else if (messagearray[0] == "/unban") {
            if (crypto.createHash('sha256').update(messagearray[1]).digest('hex') == process.env.banhashpasswd) {
                if (bannedusers.indexOf(messagearray[2]) !== -1) {
                    bannedusers.splice(bannedusers.indexOf(messagearray[2]), 1);
                    messages.push("unbanned " + messagearray[2]);
                }
            }
        } else {
            messages.push(`${username}: ${message}`);
            res.status(200).send("SENDOK");
        }
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
