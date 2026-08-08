/* INICIO SLIDER */

const slider = document.querySelector(".hero-slider");

if (slider) {

    /* CONFIGURACIÓN */

    const TIEMPO_SLIDER = 3000; // 3 segundos

    const imagenes = slider.querySelectorAll(".hero-imagen");
    const indicadores = slider.querySelectorAll(".indicadores-slider button");
    const botonAnterior = slider.querySelector(".slider-anterior");
    const botonSiguiente = slider.querySelector(".slider-siguiente");

    let indiceActual = 0;
    let intervalo;

    /* MOSTRAR IMAGEN */

    function mostrarImagen(indice) {

        imagenes.forEach((imagen) => {
            imagen.classList.remove("activa");
        });

        indicadores.forEach((indicador) => {
            indicador.classList.remove("activo");
        });

        imagenes[indice].classList.add("activa");
        indicadores[indice].classList.add("activo");

        indiceActual = indice;
    }

    /* SIGUIENTE */

    function siguienteImagen() {

        let siguiente = indiceActual + 1;

        if (siguiente >= imagenes.length) {
            siguiente = 0;
        }

        mostrarImagen(siguiente);
    }

    /* ANTERIOR */

    function anteriorImagen() {

        let anterior = indiceActual - 1;

        if (anterior < 0) {
            anterior = imagenes.length - 1;
        }

        mostrarImagen(anterior);
    }

    /* AUTOPLAY */

    function iniciarSlider() {

        intervalo = setInterval(() => {

            siguienteImagen();

        }, TIEMPO_SLIDER);

    }

    function detenerSlider() {

        clearInterval(intervalo);

    }

    function reiniciarSlider() {

        detenerSlider();
        iniciarSlider();

    }

    /* EVENTOS BOTONES */

    botonSiguiente.addEventListener("click", () => {

        siguienteImagen();
        reiniciarSlider();

    });

    botonAnterior.addEventListener("click", () => {

        anteriorImagen();
        reiniciarSlider();

    });

    /* INDICADORES */

    indicadores.forEach((boton, indice) => {

        boton.addEventListener("click", () => {

            mostrarImagen(indice);
            reiniciarSlider();

        });

    });

    /* PAUSAR AL PASAR EL MOUSE */

    slider.addEventListener("mouseenter", () => {

        detenerSlider();

    });

    slider.addEventListener("mouseleave", () => {

        iniciarSlider();

    });

    /* GESTOS TÁCTILES */

    let inicioTouch = 0;
    let finTouch = 0;

    slider.addEventListener("touchstart", (evento) => {

        inicioTouch = evento.changedTouches[0].screenX;

    });

    slider.addEventListener("touchend", (evento) => {

        finTouch = evento.changedTouches[0].screenX;

        if (inicioTouch - finTouch > 50) {

            siguienteImagen();
            reiniciarSlider();

        }

        if (finTouch - inicioTouch > 50) {

            anteriorImagen();
            reiniciarSlider();

        }

    });

    /* INICIALIZAR */

    mostrarImagen(0);

    iniciarSlider();

}