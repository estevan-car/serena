/* WHATSAPP PREMIUM */

const mensajeWhatsapp = document.querySelector(".mensaje-whatsapp");
const botonWhatsapp = document.querySelector(".whatsapp");


if (mensajeWhatsapp && botonWhatsapp) {


    let temporizador;


    function mostrarMensaje(){

        mensajeWhatsapp.classList.add("activo");

    }


    function ocultarMensaje(){

        mensajeWhatsapp.classList.remove("activo");

    }



    /* MOSTRAR AUTOMÁTICAMENTE CADA 10 SEGUNDOS */

    setInterval(()=>{

        mostrarMensaje();


        setTimeout(()=>{

            ocultarMensaje();

        },5000);


    },20000);



    /* MOSTRAR AL PASAR EL PUNTERO */

    botonWhatsapp.addEventListener("mouseenter",()=>{

        clearTimeout(temporizador);

        mostrarMensaje();

    });



    /* OCULTAR AL QUITAR EL PUNTERO */

    botonWhatsapp.addEventListener("mouseleave",()=>{


        temporizador = setTimeout(()=>{

            ocultarMensaje();

        },2000);


    });



    /* MANTENER MENSAJE SI PASA SOBRE ÉL */

    mensajeWhatsapp.addEventListener("mouseenter",()=>{

        clearTimeout(temporizador);

    });



    mensajeWhatsapp.addEventListener("mouseleave",()=>{


        temporizador = setTimeout(()=>{

            ocultarMensaje();

        },1500);


    });



    /* CLICK WHATSAPP */

    botonWhatsapp.addEventListener("click",()=>{

        ocultarMensaje();

    });


}