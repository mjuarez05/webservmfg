const Net = require('net');
const port = 1237;
var peso = '';
var armaPeso = 0;
const server = new Net.Server();
server.listen(port, function () {
  console.log(
    'Server listening for connection requests on socket localhost:' + port,
  );
});

server.on('connection', function (socket) {
  console.log(
    'A new connection has been established. del cliente ' +
      socket.remoteAddress,
  );
  socket.write('Hello, client.');

  // socket.on('data', function(data) {
  //     console.log('Data received from client:' + data);
  // });

  socket.on('readable', () => {
    let data;
    while ((data = socket.read(1))) {
      if (
        data.toString().trim() === 'W' ||
        armaPeso.toString().trim() === '1'
      ) {
        peso += data.toString();
        armaPeso = 1;
      }
      if (data.toString().trim() === 'k') {
        console.log(peso);
        peso = '';
        armaPeso = 0;
      }
      // peso += data;
      // console.log(peso + " : " + peso.length);
    }
  });

  socket.on('end', function () {
    console.log('Closing connection with the client');
  });

  socket.on('error', function (err) {
    console.log('Error: ' + err);
  });
});

// const io = require('socket.io')();
//
// io.on('connection', (client) => {
//     client.on('subscribeToTimer', (interval) => {
//     console.log('client is subscribing to timer with interval ', interval);
// setInterval(() => {
//     client.emit('timer', new Date());
// }, interval);
// });
// });
//
// const port = 1212;
// io.listen(port);
// console.log('listening on port ', port);
