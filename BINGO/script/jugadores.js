let jugadores = [];
$(document).ready(function () {
  $("#graph").hide();
  obtenerJugadores();
});

function registrar() {
  var name = $("#nombre").val();
  var lastName = $("#apellido").val();
  var user = $("#usuario").val();
  var password = $("#password").val();
  let jugador = {
    nombre: name,
    apellido: lastName,
    usuario: user,
    pass: password,
    partidasJugadas: 0,
    partidasFacil: 0,
    partidasDificil: 0,
    partidasCompletas: 0,
    partidasIncompletas: 0,
    pganadasFacil: 0,
    pganadasDificil: 0,
    pperdidasFacil: 0,
    pperdidasDificil: 0,
  };

  registrarJugador(jugador);
}

function modificarJugador(usuario, modo, resultado) {
  /*Como parametros envie de forma obligatoria el codigo del jugador que esta jugando
      y mande los datos que desea modificar...
  */
  var request = initDatabase();

  request.onsuccess = function (event) {
    var db = event.target.result;
    var transaction = db.transaction(["jugadores"], "readwrite");
    var objectStore = transaction.objectStore("jugadores");
    var getRequest = objectStore.get(usuario);

    getRequest.onsuccess = function () {
      var jugador = getRequest.result;

      if (jugador) {
        // Ejemplo de como actualizar los datos del jugador...
        ///Aqui modifique unicamente el campo que le interese del jugador

        // jugador.nombre = nuevoNombre;
        // jugador.apellido = nuevoApellido;
        jugador.partidasJugadas = jugador.partidasJugadas + 1;
        jugador.partidasCompletas = jugador.partidasCompletas + 1;

        if (modo === "FACIL") {
          jugador.partidasFacil = jugador.partidasFacil + 1;

          if (resultado === "GANO") {
            jugador.pganadasFacil = jugador.pganadasFacil + 1;
          } else {
            jugador.pperdidasFacil = jugador.pperdidasFacil + 1;
          }
        } else {
          jugador.partidasDificil = jugador.partidasDificil + 1;
          if (resultado === "GANO") {
            jugador.pganadasDificil = jugador.pganadasDificil + 1;
          } else {
            jugador.pperdidasDificil = jugador.pperdidasDificil + 1;
          }
        }

        // Guardar los cambios en la base de datos
        var updateRequest = objectStore.put(jugador);

        updateRequest.onsuccess = function () {
          console.log("jugador modificado con éxito");
        };

        updateRequest.onerror = function (event) {
          console.log("Error al modificar el jugador:", event.target.errorCode);
        };
      } else {
        console.log("No se encontró un jugador con el código proporcionado.");
      }
    };

    getRequest.onerror = function (event) {
      console.log("Error al obtener el jugador:", event.target.errorCode);
    };
  };
}

function initDatabase() {
  var request = indexedDB.open("BingoBD", 1);

  request.onerror = function (event) {
    console.log("Error al abrir la base de datos:", event.target.errorCode);
  };

  request.onupgradeneeded = function (event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("jugadores", { keyPath: "usuario" });
  };

  return request;
}

function registrarJugador(data) {
  var request = initDatabase();

  request.onsuccess = function (event) {
    var db = event.target.result;
    var transaction = db.transaction(["jugadores"], "readwrite");
    var objectStore = transaction.objectStore("jugadores");
    var addRequest = objectStore.add(data);

    addRequest.onsuccess = function () {
      alert("¡Jugador registrado con éxito!");
      $("#nombre").val("");
      $("#apellido").val("");
      $("#usuario").val("");
      $("#password").val("");
    };

    addRequest.onerror = function (event) {
      console.log("Error al registrar el jugador:", event.target.errorCode);
    };
  };
}

function obtenerJugadores() {
  var request = initDatabase();

  request.onsuccess = function (event) {
    var db = event.target.result;
    var transaction = db.transaction(["jugadores"], "readonly");
    var objectStore = transaction.objectStore("jugadores");
    var jugadores = objectStore.getAll();
    var tbody = $("#listaJugadores tbody");

    jugadores.onsuccess = function () {
      $.each(jugadores.result, function (index, item) {
        var fila = $("<tr>").appendTo(tbody);
        $("<td>").text(item.nombre).appendTo(fila);
        $("<td>").text(item.apellido).appendTo(fila);
        $("<td>").text(item.usuario).appendTo(fila);
        $("<td>").text(item.partidasJugadas).appendTo(fila);
        $("<td>").text(item.partidasFacil).appendTo(fila);
        $("<td>").text(item.partidasDificil).appendTo(fila);
        var btnEst = $("<button>")
          .text("Ver Estadisticas")
          .addClass("btnEstadistica")
          .click(() => mostrarGrafico(item.usuario));
        // Crea una celda y agrega el botón a la celda
        $("<td>").append(btnEst).appendTo(fila);
      });
    };

    jugadores.onerror = function (event) {
      console.log("Error al contar los jugadores:", event.target.errorCode);
    };
  };
}

function estadisticas() {
  window.location.href = "graficos.html";
}
//inicia el ingreso al login
function login() {
  let user = document.getElementById("Usuario").value;
  let clave = document.getElementById("clave").value;

  // Validar si los campos están vacíos
  if (user === "" || clave === "") {
    mostrarMensajeError("Por favor, completa todos los campos.");
    return;
  }
  validarAcceso(user, clave);
}

function validarAcceso(user, password) {
  var request = initDatabase();
  request.onsuccess = function (event) {
    var db = event.target.result;
    var transaction = db.transaction(["jugadores"], "readonly");
    var objectStore = transaction.objectStore("jugadores");
    var getRequest = objectStore.get(user);
    getRequest.onsuccess = function () {
      var jugador = getRequest.result;
      if (jugador) {
        if (jugador.pass == password) {
          localStorage.setItem("usuario", user);
          window.location = "interfazJuego.html";
        } else {
          // Mostrar mensaje de error debajo del formulario
          mostrarMensajeError("Usuario o contraseña incorrectos");
        }
      } else {
        mostrarMensajeError("No existe el usuario en la base de datos");
      }
    };
    getRequest.onerror = function (event) {
      console.log("Error al obtener el empleado:", event.target.errorCode);
    };
  };
  return false;
}

function mostrarMensajeError(mensaje) {
  const mensajeError = document.getElementById("mensajeError");
  mensajeError.textContent = mensaje;
  mensajeError.style.color = "red";
}
function limpiarMensajeError() {
  const mensajeError = document.getElementById("mensajeError");
  mensajeError.textContent = "";
}
//fin del ingreso

let chart1;
let chart2;
let chart3;
let chart4;
///INICIO GRAFICO
function mostrarGrafico(user) {
  $("#graph").show();
  var request = initDatabase();
  request.onsuccess = function (event) {
    var db = event.target.result;
    var transaction = db.transaction(["jugadores"], "readonly");
    var objectStore = transaction.objectStore("jugadores");
    var getRequest = objectStore.get(user);
    getRequest.onsuccess = function () {
      graficoFacil(getRequest.result);
      grafico2(getRequest.result);
      grafico3(getRequest.result);
      grafico4(getRequest.result);
    };
    getRequest.onerror = function (event) {
      console.log("Error al obtener el jugador:", event.target.errorCode);
    };
  };
}

function graficoFacil(JugadorGrafico) {
  //facil-1
  //Grafico facil
  const partidas1 = ["Ganadas", "Perdidas"];
  const data1 = {
    labels: partidas1,
    datasets: [
      {
        data: [JugadorGrafico.pganadasFacil, JugadorGrafico.pperdidasFacil],
        backgroundColor: ["rgba(130, 40, 145, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1.5,
      },
    ],
  };
  const config1 = {
    type: "pie",
    data: data1,
    options: {
      responsive: false,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Dificultad Facil",
        },
      },
    },
  };
  if (chart1) {
    chart1.destroy();
    chart1 = new Chart(document.getElementById("grafico1"), config1);
  } else {
    chart1 = new Chart(document.getElementById("grafico1"), config1);
  }
}

function grafico2(JugadorGrafico) {
  console.log(
    "JugadorGrafico.pperdidasDificil",
    JugadorGrafico.pperdidasDificil
  );
  //Grafico dificil
  const config2 = {
    type: "bar",
    data: {
      labels: "Partidas",
      datasets: [
        {
          label: "Ganadas",
          data: [JugadorGrafico.pganadasDificil],
          backgroundColor: ["rgba(130, 40, 145, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 1.5,
        },
        {
          label: "Perdidas",
          data: [JugadorGrafico.pperdidasDificil],
          backgroundColor: ["rgba(54, 162, 235, 0.2)"],
          borderColor: ["rgba(54, 162, 235, 1)"],
          borderWidth: 1.5,
        },
      ],
    },
  };

  if (chart2) {
    chart2.destroy();
    chart2 = new Chart(document.getElementById("grafico2"), config2);
  } else {
    chart2 = new Chart(document.getElementById("grafico2"), config2);
  }
}

function grafico3(JugadorGrafico) {
  //Grafico facil
  const partidas3 = ["Facil", "Dificil"];
  const data3 = {
    labels: partidas3,
    datasets: [
      {
        data: [JugadorGrafico.partidasFacil, JugadorGrafico.partidasDificil],
        backgroundColor: ["rgba(130, 40, 145, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1.5,
      },
    ],
  };
  const config3 = {
    type: "pie",
    data: data3,
    options: {
      responsive: false,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Partidas Jugadas",
        },
      },
    },
  };

  if (chart3) {
    chart3.destroy();
    chart3 = new Chart(document.getElementById("grafico3"), config3);
  } else {
    chart3 = new Chart(document.getElementById("grafico3"), config3);
  }
}

function grafico4(JugadorGrafico) {
  const config4 = {
    type: "bar",
    data: {
      labels: "Partidas",
      datasets: [
        {
          label: "Completas",
          data: [JugadorGrafico.partidasCompletas],
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 1.5,
        },
        {
          label: "Incompletas",
          data: [JugadorGrafico.partidasIncompletas],
          backgroundColor: ["rgba(54, 162, 235, 0.2)"],
          borderColor: ["rgba(54, 162, 235, 1)"],
          borderWidth: 1.5,
        },
      ],
    },
  };

  if (chart4) {
    chart4.destroy();
    chart4 = new Chart(document.getElementById("grafico4"), config4);
  } else {
    chart4 = new Chart(document.getElementById("grafico4"), config4);
  }
}

///FIN GRAFICOS
