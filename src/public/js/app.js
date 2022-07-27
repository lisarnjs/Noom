const socket = new WebSocket(`ws://${window.location.host}`); // frontend의 socket = 서버로의 연결

socket.addEventListener("open", () => {
  console.log("Connected to Server");
});

socket.addEventListener("message", (message) => {
  console.log("New message: ", message.data);
});

socket.addEventListener("close", () => {
  console.log("Connected FAIL");
});

setTimeout(() => {
  socket.send("hello from the browser!");
}, 10000);
