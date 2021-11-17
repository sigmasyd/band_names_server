const express = require('express');
const path = require('path');
require('dotenv').config();

// App express
const app = express();

// Noode server
const server = require("http").createServer(app);
const io = require("socket.io")(server);

// Sockets message
io.on('connection',client=>{
	console.log("Cliente conectado");
	client.on('disconnect',()=>{
		console.log("Cliente desconectado");
	});
	client.on('mensaje',(payload)=>{
		console.log('Mensaje: ', payload);

		io.emit('mensaje',{admin: 'nuevo mensaje'});

	});
});


const publicPath = path.resolve(__dirname,'public');

app.use(express.static(publicPath));

server.listen(process.env.PORT,(err)=>{
	if(err) throw new Error(err);
	console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})