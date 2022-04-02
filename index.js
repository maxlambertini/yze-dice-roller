const express = require('express');
const res = require('express/lib/response');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


const d6 =  () => {
    const roll = Math.floor(Math.random()*6)+1
    if (w == 1) return "[BANE]"
    if (w == 6) return "[SUCCESS]"
    return "[x]"    
}

const rollYZE = (numDice, push) => {
    var res=[]
    for (var i = 0; i < numDice; i++) 
    {
        const w = Math.floor(Math.random()*6)+1
        if (w == 1) {
            if (push)
                res.push(`<i class='bane'>${w}</i>`)
            else
                res.push(`<i class='one'>${w}</i>`)
        }
        else if (w == 6)
            res.push(`<i class='success'>${w}</i>`)
        else
            res.push(`<i class='x'>${w}</i>`)
    }
    return res.join(' ');

}     

app.use('/static', express.static('static'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('roll', (data) => {
        console.log('roll: ' + JSON.stringify(data));
        const returned = {
            'who': data["nick"], 
            'attr': rollYZE(parseInt(data["attr"]),false),
            'skill': rollYZE(parseInt(data["skill"]),false),
            'gear': rollYZE(parseInt(data["gear"]),false)
        };
        console.log(returned);
        io.emit('rolled', returned);    
    })

    socket.on('rollPush', (data) => {
        console.log('push: ' + JSON.stringify(data));
        const returned = {
            'who': data["nick"], 
            'attr': rollYZE(parseInt(data["attr"]),true),
            'skill': rollYZE(parseInt(data["skill"]),true),
            'gear': rollYZE(parseInt(data["gear"]),true)
        };
        console.log(returned);
        io.emit('rolled', returned);    
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});