const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const cors = require('cors');
const io = new Server(server, {
  cors: { origin: '*' },
});
const PORT = process.env.PORT || 5000;
app.use(cors());

app.get('/', (req, res) => {
  res.send('ad');
});
let asd = [];
// const a = io.of('/a');
io.on('connection', (socket) => {
  socket.on('send', (data) => {
    console.log(data);
    asd.push(data);
    socket.join('1');
    socket.to('1').emit('sends', asd);
  });
});

server.listen(PORT, () => {
  console.log('listening on *:5000');
});
