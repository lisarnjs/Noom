import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

const sockets = [];

// backend의 socket = 연결된 브라우저
wss.on("connection", (socket) => {
  sockets.push(socket);
  console.log("Connected to Browser");
  socket.on("close", () => console.log("Disconnected from the Browser")); // 브라우저 창을 닫으면 실행됨
  socket.on("message", (message) => {
    const translateMessageData = message.toString("utf8");
    sockets.forEach((aSocket) => aSocket.send(translateMessageData));
  });
});

server.listen(3000, handleListen);
