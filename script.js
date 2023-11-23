var dificil = new Array('imagenes/Gato.svg', 'imagenes/leon.svg',
    'imagenes/aguila.svg', 'imagenes/alce.svg',
    'imagenes/mono.svg', 'imagenes/caiman.svg',
    'imagenes/mapache.svg', 'imagenes/cebra.svg',
    'imagenes/lobo.svg', 'imagenes/chimpance.svg',
    'imagenes/koala.svg', 'imagenes/elefante.svg',
    'imagenes/jaguar.svg', 'imagenes/gorila.svg',
    'imagenes/niu.svg', 'imagenes/orangutan.svg',
    'imagenes/rinoceronte.svg', 'imagenes/osoPolar.svg',
    'imagenes/tigre.svg', 'imagenes/vibora.svg',
    'imagenes/yak.svg', 'imagenes/zorro.svg',
    'imagenes/libre.svg', 'imagenes/hipopotamo.svg',
    'imagenes/hiena.svg');


var facil = new Array('imagenes/Gato.svg', 'imagenes/leon.svg',
    'imagenes/aguila.svg', 'imagenes/alce.svg',
    'imagenes/libre.svg', 'imagenes/caiman.svg',
    'imagenes/mapache.svg', 'imagenes/cebra.svg',
    'imagenes/lobo.svg', 'imagenes/libre.svg',
    'imagenes/koala.svg', 'imagenes/elefante.svg',
    'imagenes/jaguar.svg', 'imagenes/gorila.svg',
    'imagenes/niu.svg', 'imagenes/orangutan.svg',
    'imagenes/rinoceronte.svg', 'imagenes/osoPolar.svg',
    'imagenes/tigre.svg', 'imagenes/vibora.svg',
    'imagenes/yak.svg', 'imagenes/zorro.svg',
    'imagenes/libre.svg', 'imagenes/hipopotamo.svg',
    'imagenes/hiena.svg');





var tablero = $(".tablero");
var img = $(".jugador");
var img2 = $(".jugador2");
var cartaActual = "";
var modoJuego = '';

var fila = 2, fila2 = 2, colum = 1, colum2 = 1, tiempoCarta = 0;
var f = 2, c = 1;



$(document).ready(function () {

    var finDelJuego = false;

    function JuegoFinalizado() {
        finDelJuego = true;
    }

    function onConfetti() {
        confetti({
            particleCount: 300,
            spread: 360,
        });
    };

    const formasGanadoras = [
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24],
        [0, 5, 10, 15, 20],
        [1, 6, 11, 16, 21],
        [2, 7, 12, 17, 22],
        [3, 8, 13, 18, 23],
        [4, 9, 14, 19, 24],
        [0, 6, 12, 18, 24],
        [4, 8, 12, 16, 20]
    ];
    let tableroJuego = new Array(25).fill(false);
    let tableroJuego2 = new Array(25).fill(false);

    $(".jugador").click(function () {
        
        if (!$(this)[0].src.includes(cartaActual)) {
            showWarningMessage();
            return;
        }
        $(this).addClass('seleccionada');
        $(this).next().css("visibility", "visible");

        for (let j = 0; j < img.length; j++) {
            if ($(this)[0].src === img[j].src) {
                tableroJuego[j] = true;
                let esGanador = formasGanadoras.some(f => f.every(posic => tableroJuego[posic]));
                if (esGanador) {
                    showSuccessMessage();
                    modificarJugador(localStorage.getItem('usuario'), modoJuego, 'GANO');
                    setInterval(() => {
                        onConfetti(); //terma unos 2seg
                    }, 500);

                    setInterval(() => {
                        onConfetti();
                    }, 3000);

                    setInterval(() => {
                        onConfetti();
                    }, 1000);


                    JuegoFinalizado();
                    setInterval(function () {
                        window.location.reload();
                    }, 13000);
                }
                break;
            }
        }
    });


    // var casilla=$(".casillaJugador");
    // for (let i = 0; i < 25; i++) {
    //     $(casilla[i]).css("grid-row", f);
    //     $(casilla[i]).css("grid-colum", c++);

    //     if (i == 4 || i == 9 || i == 14 || i == 19 || i == 24) {
    //         f++;
    //         c = 1;
    //     }
    // }

    $("#dificultad > a").on("click", function () {
        if ($(this).text() == "FÁCIL") {
            $("#dificultad").css("visibility", "hidden");
            dificultad([...facil], [...facil]);
            $("#bontonIniciar").css("visibility", "visible");
            $(".reloj").text("5s");
            $("#opciones > span:nth-child(2)").text("MODO: FÁCIL");
            $("#opciones > span:nth-child(1)").text("JUGADOR: " + localStorage.getItem("usuario"));

            modoJuego = 'FACIL';
            tiempoCarta = 5;



        } else if ($(this).text() == "DIFÍCIL") {
            $("#dificultad").css("visibility", "hidden");
            dificultad([...dificil], [...dificil]);
            $("#bontonIniciar").css("visibility", "visible");
            $(".reloj").text("2s");
            $("#opciones > span:nth-child(2)").text("MODO: DIFÍCIL");
            $("#opciones > span:nth-child(1)").text("JUGADOR: " + localStorage.getItem("usuario"));

            modoJuego = 'DIFICIL';
            tiempoCarta = 2;

        }
    });

    $("#bontonIniciar").on("click", function () {
        $(this).css("visibility", "hidden");
    });

    function dificultad(dificultad, dificultad2) {
        // debugger;
        for (let i = 0; i < 25; i++) {
            var numAleatorio = Math.floor(Math.random() * dificultad.length);
            $(img[i]).attr("src", dificultad[numAleatorio]);
            dificultad.splice(numAleatorio, 1);
            $(img[i]).css("grid-row", fila);
            $(img[i]).css("grid-colum", colum++);
            $(img[i]).css("width", "100%");
            $(img[i]).css("height", "99%");

            if (img[i].src.includes("libre.svg")) {
                tableroJuego[i] = true;
            }
            // console.log(`image[${i}]: ${img[i].src}`)

            if (i == 4 || i == 9 || i == 14 || i == 19 || i == 24) {
                fila++;
                colum = 1;
            }
        }

        for (let i = 0; i < 25; i++) {
            var numAleatorio2 = Math.floor(Math.random() * dificultad2.length);
            $(img2[i]).attr("src", dificultad2[numAleatorio2]);
            dificultad2.splice(numAleatorio2, 1);
            $(img2[i]).css("grid-row", fila2);
            $(img2[i]).css("grid-colum", colum2++);
            $(img2[i]).css("width", "100%");
            $(img2[i]).css("height", "99%");


            if (img2[i].src.includes("libre.svg")) {
                tableroJuego2[i] = true;
            }

            if (i == 4 || i == 9 || i == 14 || i == 19 || i == 24) {
                fila2++;
                colum2 = 1;
            }
        }
        // console.log('tablero: ', tableroJuego);
        // console.log('tablero2: ', tableroJuego2);
        // for (let j = 0; j < img.length; j++) {
        //     console.log(`Posicion ${j} = ${img[j].src}`)
        // }
    }
    // img.on('click', function () {
    // console.log('image: ', img);
    // console.log('click imagen: ', $(this)[0].src)

    // if (!$(this)[0].src.includes(cartaActual)) {
    //     alert('Carta incorrecta');
    //     return;
    // }

    // for (let j = 0; j < img.length; j++) {
    //     if ($(this)[0].src === img[j].src) {
    //         // console.log(`clic en ${j}`);
    //         tableroJuego[j] = true;
    //         let esGanador = formasGanadoras.some(f => f.every(posic => tableroJuego[posic]));
    //         if (esGanador) {
    //             alert('Has ganado');
    //         }
    //         break;
    //     }
    //     // console.log(img[j].src)
    // }
    // let hola = img[5]
    // });

    $("#bontonIniciar").click(function () {

        $("#containerClone").css("visibility", "hidden");

        const imagenesAnimales = [
            'imagenes/Gato.svg',
            'imagenes/leon.svg',
            'imagenes/aguila.svg',
            'imagenes/alce.svg',
            'imagenes/mono.svg',
            'imagenes/caiman.svg',
            'imagenes/mapache.svg',
            'imagenes/cebra.svg',
            'imagenes/lobo.svg',
            'imagenes/chimpance.svg',
            'imagenes/koala.svg',
            'imagenes/elefante.svg',
            'imagenes/jaguar.svg',
            'imagenes/gorila.svg',
            'imagenes/niu.svg',
            'imagenes/orangutan.svg',
            'imagenes/rinoceronte.svg',
            'imagenes/osoPolar.svg',
            'imagenes/tigre.svg',
            'imagenes/vibora.svg',
            'imagenes/yak.svg',
            'imagenes/zorro.svg',
            // 'imagenes/libre.svg', 
            'imagenes/hipopotamo.svg',
            'imagenes/hiena.svg'

        ];


        $(".segundo").css("animation", `llenar ${tiempoCarta}s linear infinite`);
        $(".reloj").css("animation", `llenar ${tiempoCarta}s linear infinite`);

        //yunior Lagos
        const cartaSaliente = document.getElementById('cartaSaliente');

        function mostrarCartaAleatoria() {
            if (finDelJuego) {
                $(".segundo").css("animation", "none");
                $(".reloj").css("animation", "none");
                return;
            }

            const indiceAleatorio = Math.floor(Math.random() * imagenesAnimales.length);
            const rutaImagenAleatoria = imagenesAnimales[indiceAleatorio];
            imagenesAnimales.splice(indiceAleatorio, 1);
            cartaSaliente.src = rutaImagenAleatoria;
            cartaActual = rutaImagenAleatoria;

            /* Simular selección automática del jugador 2
            const $jugador2 = $('.jugador2');
            const $seleccionada = $jugador2.eq(indiceAleatorio);

            // Si la imagen ya fue seleccionada, no hacemos nada
            if ($seleccionada.hasClass('seleccionada1')) {
                // Ya fue seleccionada, no se hace nada o añade lógica adicional para verificar luego la posicion y declarar ganador
            } else {
                // Verificar si la selección del jugador 2 coincide con la carta saliente
                if (rutaImagenAleatoria == $('#cartaSaliente').attr('src')) {
                    $seleccionada.addClass('seleccionada1');
                    //console.log('¡El jugador 2 seleccionó la imagen correcta!');
                    // Agregar lógica adicional para una selección correcta del jugador 2
                } else {

                    //console.log('La selección del jugador 2 no coincide con la carta actual.');
                    // Agregar lógica adicional para una selección incorrecta del jugador 2
                }
            }*/

            for (let i = 0; i < img2.length; i++) {
                if (cartaSaliente.src === img2[i].src) {
                    setInterval(function () {
                        tableroJuego2[i] = true;
                        $(img2[i]).next().css("visibility", "visible")
                        //img2[i].addClass("seleccionada1");
                        $(img2[i]).addClass('seleccionada1');
                    }, 1000);
                    break;
                }
            }

            let ganoMaquina = formasGanadoras.some(f => f.every(posic => tableroJuego2[posic]));
            if (ganoMaquina) {
                showErrorMessage();
                JuegoFinalizado();
                modificarJugador(localStorage.getItem('usuario'), modoJuego, 'PERDIDO');
                setInterval(function () {
                    window.location.reload();
                }, 5000);
            }

            // console.log('carta saliente: ', cartaSaliente.src)
            // console.log('imagen2: ', img2.length)
        }

        // Mostrar la primera carta inmediatamente
        mostrarCartaAleatoria();

        //reloj

        // script.js
        const reloj = document.querySelector('.reloj');

        function actualizarCuentaRegresiva(segundosRestantes) {
            reloj.textContent = segundosRestantes + "s";
        }


        // Cambiar la carta cada 5 segundos
        setInterval(mostrarCartaAleatoria, (tiempoCarta * 1000));
        // Llamada inicial para mostrar el número al cargar la página
        actualizarCuentaRegresiva(tiempoCarta);

        // Cambiar la cuenta regresiva cada segundo
        setInterval(() => {
            // Resta 1 segundo cada vez que se llama
            let segundosRestantes = parseInt(reloj.textContent, 10) - 1;

            // Si llegamos a 0, reiniciamos la cuenta regresiva
            if (segundosRestantes === 0) {
                segundosRestantes = tiempoCarta; // Reiniciar a 5 segundos
            }

            actualizarCuentaRegresiva(segundosRestantes);
        }, 1000);
    });


    /* Función para manejar la selección de la imagen por el jugador 1
    $('.jugador').on('click', function () {
        if (!$(this).hasClass('seleccionada')) {
            $(this).addClass('seleccionada');

            // Verificar si el jugador 1 ha ganado
            if (verificarGanador($('.jugador.seleccionada'))) {
                //console.log('¡El Jugador 1 ha ganado!');
                // Aquí puedes realizar acciones adicionales cuando el jugador 1 gana
            }
        }
    });*/
})

