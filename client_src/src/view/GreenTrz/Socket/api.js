import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:1212');

function subscribeGetPesoBal(cb) {
  socket.on('pesobalanza', (pesobalanza) => cb(null, pesobalanza));
  socket.on('miestado', (miestado) => cb(null, miestado));
  //socket.on(tim)
  socket.emit('myTransactionName', 'TRXPESADO');
  socket.emit('subscribeGetPesoBal', 300);
}

function subscribeGetEstadoBal(cb) {
  socket.on('estadoBalanza', (estadobalanza) => cb(null, estadobalanza));
  socket.emit('checkEstadoBalanza', 'CHECKSTATUS');
  socket.emit('subscribeGetEstadoBal', 300);
}
export {subscribeGetPesoBal};
export {subscribeGetEstadoBal};
