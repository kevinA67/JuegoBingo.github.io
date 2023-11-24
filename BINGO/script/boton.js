// inicializar la base de datos
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

// Agrega un listener 
document.getElementById("abandonar").addEventListener("click", function() {
    // confirmación al usuario
    var confirmacion = confirm("¿Quiere abandonar el juego?");
    
    if (confirmacion) {
        // Si el usuario confirma, ejecutar incrementar partidas incompletas
        incrementarPartidasIncompletas(1);
    } else {
        // Si el usuario cancela, no hacer nada
        console.log("El usuario decidió no abandonar el juego");
    }
});

// Función para sumar una cantidad
function incrementarPartidasIncompletas(cantidad) {
    // Obtener el nombre de usuario del localStorage
    var usuario = localStorage.getItem("usuario");

    if (!usuario) {
        console.log("No hay usuario registrado");
        return;
    }

    var request = initDatabase();

    request.onsuccess = function (event) {
        var db = event.target.result;
        var transaction = db.transaction(["jugadores"], "readwrite");
        var objectStore = transaction.objectStore("jugadores");

        var getRequest = objectStore.get(usuario);

        getRequest.onsuccess = function () {
            var jugador = getRequest.result;
            if (jugador) {
                // Sumando cantidad
                jugador.partidasIncompletas += cantidad;

                // Actualizar el registro 
                var updateRequest = objectStore.put(jugador);

                updateRequest.onsuccess = function () {
                    console.log("Campo partidasIncompletas actualizado con éxito");

                    // Redirigir
                    window.location.href = "interfazJuego.html"; 
                };

                updateRequest.onerror = function (event) {
                    console.log("Error al actualizar el campo partidasIncompletas:", event.target.errorCode);
                };
            } else {
                console.log("No se encontró al jugador con el usuario", usuario);
            }
        };

        getRequest.onerror = function (event) {
            console.log("Error al obtener el jugador:", event.target.errorCode);
        };
    };
}
