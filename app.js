const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.on('message', ({ id, message }) => {
    let users = [
      {
        id: 1,
        name: 'ahmet',
      },
      {
        id: 2,
        name: 'mehmet',
      },
      {
        id: 3,
        name: 'can',
      },
    ];

    let chats = [
      {
        id: 1,
        users: [1, 2],
        msgList: [1],
      },
    ];

    let msgList = [
      {
        id: 1,
        userId: 1,
        content: 'ahmet',
      },
    ];
    users.forEach((user) => {
      if (id == user.id) {
        chats.forEach((chat) => {
          const cS = chat.users.find((c) => c == id);
          if (cS) {
            msgList.push({
              id: 2,
              userId: id,
              content: message,
            });
          }
        });
      }
    });
    let b = [];
    chats.find((chat) => {
      const cS = chat.users.find((c) => c == id);
      if (cS) {
        b.push(chat);
      }
    });
    let c = [];
    msgList.find((chat) => {
      if (chat.userId == id) {
        c.push(chat);
      }
    });

    io.emit('a', { b, c });
  });

  //   console.log(socket.id);
});

http.listen(5000);
