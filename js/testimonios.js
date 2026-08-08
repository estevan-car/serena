/* TESTIMONIOS */

const sliderTestimonios = document.querySelector(".slider-testimonios");

if (sliderTestimonios) {

    const track = sliderTestimonios.querySelector(".track-testimonios");
    const tarjetas = [...track.querySelectorAll(".tarjeta-testimonio")];

    const botonAnterior = document.querySelector(".anterior-testimonio");
    const botonSiguiente = document.querySelector(".siguiente-testimonio");

    const indicadores = document.querySelectorAll(".indicadores-testimonios button");

    let indiceActual = 0;
    let intervalo;

    /* MOSTRAR TESTIMONIO */

    function actualizarSlider() {

        const estilosTrack = window.getComputedStyle(track);
        const gap = parseFloat(estilosTrack.columnGap || estilosTrack.gap) || 0;

        const anchoTarjeta = tarjetas[0].offsetWidth + gap;

        const desplazamiento = indiceActual * anchoTarjeta;

        track.style.transform = `translateX(-${desplazamiento}px)`;

        tarjetas.forEach((tarjeta) => {
            tarjeta.classList.remove("activa");
        });

        tarjetas[indiceActual].classList.add("activa");

        indicadores.forEach((indicador) => {
            indicador.classList.remove("activo");
        });

        if (indicadores[indiceActual]) {
            indicadores[indiceActual].classList.add("activo");
        }

    }

    /* SIGUIENTE */

    function siguiente() {

        indiceActual++;

        if (indiceActual >= tarjetas.length) {
            indiceActual = 0;
        }

        actualizarSlider();

    }

    /* ANTERIOR */

    function anterior() {

        indiceActual--;

        if (indiceActual < 0) {
            indiceActual = tarjetas.length - 1;
        }

        actualizarSlider();

    }

    /* AUTOPLAY */

    function iniciarSlider() {

        detenerSlider();

        intervalo = setInterval(() => {

            siguiente();

        }, 5000);

    }

    function detenerSlider() {

        clearInterval(intervalo);

    }

    function reiniciarSlider() {

        detenerSlider();
        iniciarSlider();

    }

    /*BOTONES */

    if (botonSiguiente) {

        botonSiguiente.addEventListener("click", () => {

            siguiente();
            reiniciarSlider();

        });

    }

    if (botonAnterior) {

        botonAnterior.addEventListener("click", () => {

            anterior();
            reiniciarSlider();

        });

    }

    /* INDICADORES */

    indicadores.forEach((boton, indice) => {

        boton.addEventListener("click", () => {

            indiceActual = indice;

            actualizarSlider();
            reiniciarSlider();

        });

    });

    /* PAUSA HOVER */

    sliderTestimonios.addEventListener("mouseenter", detenerSlider);

    sliderTestimonios.addEventListener("mouseleave", iniciarSlider);

    /* TOUCH MÓVIL */

    let inicioTouch = 0;
    let finTouch = 0;

    sliderTestimonios.addEventListener("touchstart", (evento) => {

        inicioTouch = evento.changedTouches[0].screenX;

    });

    sliderTestimonios.addEventListener("touchend", (evento) => {

        finTouch = evento.changedTouches[0].screenX;

        if (inicioTouch - finTouch > 50) {

            siguiente();
            reiniciarSlider();

        }

        if (finTouch - inicioTouch > 50) {

            anterior();
            reiniciarSlider();

        }

    });

    /* INICIALIZAR */

    actualizarSlider();
    iniciarSlider();

}