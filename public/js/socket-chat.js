var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has("name")) {
  window.location = "../index.html";
  throw new Error("the name is neccesary");
}
var user = {
  name: params.get("name"),
};
socket.on("connect", function () {
  console.log("Conectado al servidor");
  socket.emit("enterRoom", user),
    function (resp) {
      console.log("Usuarios conectados:  ", resp);
    };
});

// escuchar
socket.on("disconnect", function () {
  console.log("Perdimos conexión con el servidor");
});

// Enviar información
socket.emit(
  "enviarMensaje",
  {
    usuario: "Fernando",
    mensaje: "Hola Mundo",
  },
  function (resp) {
    console.log("respuesta server: ", resp);
  }
);

// Escuchar información
socket.on("enviarMensaje", function (mensaje) {
  console.log("Servidor:", mensaje);
});
