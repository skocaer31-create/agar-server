const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const GameServer = require("./game/gameServer");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// oyun serveri
const game = new GameServer(io);

// socket bağlantısı
io.on("connection", (socket) => {
    console.log("Oyuncu bağlandı:", socket.id);
    game.addPlayer(socket);

    socket.on("disconnect", () => {
        console.log("Oyuncu ayrıldı:", socket.id);
        game.removePlayer(socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Agar server ${PORT} portunda çalışıyor`);
});
