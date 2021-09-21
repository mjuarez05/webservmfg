const Net = require('net');
const io = require('socket.io')();
const portBal = 1211;
var peso = '';
var armaPeso = 0;
var numero = 1;
var pos = 0;
var envioPeso = '';
var ultimaActPeso = new Date();
var checkUltimaAct = 0;
const server = new Net.Server();

const portWeb = 1212;
io.listen(portWeb);
console.log('Escuchando Puerto WEB ', portWeb);

server.listen(portBal, function () {
  console.log('Escuchando Puerto Balanza:' + portBal);
});

server.on('connection', function (socket) {
  console.log('Nueva Conexion de la balanza cliente ' + socket.remoteAddress);
  socket.write('Hello, client.');

  socket.on('readable', () => {
    let data;
    while ((data = socket.read(1))) {
      if (
        data.toString().trim() === 'W' ||
        armaPeso.toString().trim() === '1'
      ) {
        pos++;
        if (pos > 9 && pos < 18) peso += data.toString();
        armaPeso = 1;
      }
      if (data.toString().trim() === 'k') {
        console.log(peso);
        console.log(pos);
        pos = 0;
        envioPeso = peso;
        ultimaActPeso = new Date();
        peso = '';
        armaPeso = 0;
      }
    }
  });

  socket.on('end', function () {
    console.log('Closing connection with the client');
  });

  socket.on('error', function (err) {
    console.log('Error: ' + err);
  });
});

io.on('connection', (client) => {
  client.on('disconnecting', (reason) => {
    console.log('desconectado', client.rooms);
  });
  client.on('myTransactionName', (nombre) => {
    console.log('Nueva Conexion de la transaccion ' + nombre);
  });

  client.on('checkEstadoBalanza', (valor) => {
    console.log('Nueva Conexion de la transaccion ' + valor);
  });

  client.on('subscribeGetPesoBal', (interval) => {
    setInterval(() => {
      checkUltimaAct = new Date() - ultimaActPeso;
      if (checkUltimaAct > 5000) envioPeso = 0;
      client.emit('pesobalanza', envioPeso);
    }, interval);
  });

  client.on('subscribeGetEstadoBal', (interval) => {
    setInterval(() => {
      if (checkUltimaAct > 5000) {
        client.emit('estadoBalanza', 'No hay pesos proveniente de balanza');
        envioPeso = 0;
      } else client.emit('estadoBalanza', 'OK!');
    }, interval);
  });
});
