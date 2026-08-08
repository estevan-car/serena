/* DATOS DEL PEDIDO */

const pedido = {

    diseno: document.querySelector(".hero-diseno h1").textContent.trim(),

    personas: "",

    sabor: "",

    relleno: "",

    color: "",

    mensaje: "",

    comentarios: "",

    imagen: ""

};


/* BOTONES ACTIVOS */

function activarGrupo(selector){

    const botones = document.querySelectorAll(selector);

    botones.forEach(boton=>{

        boton.addEventListener("click",()=>{

            botones.forEach(item=>{

                item.classList.remove("activo");

            });

            boton.classList.add("activo");

        });

    });

}


/* PERSONAS */

activarGrupo(".opciones-personas button");

document
.querySelectorAll(".opciones-personas button")
.forEach(boton=>{

    boton.addEventListener("click",()=>{

        pedido.personas = boton.textContent.trim();

    });

});


/*SABORES */

const selectSabor = document.querySelectorAll("select")[0];

selectSabor.addEventListener("change",()=>{

    pedido.sabor = selectSabor.value;

});


/* RELLENOS */

const selectRelleno = document.querySelectorAll("select")[1];

selectRelleno.addEventListener("change",()=>{

    pedido.relleno = selectRelleno.value;

});


/* COLORES */

activarGrupo(".colores .color");

document
.querySelectorAll(".color")
.forEach(color=>{

    color.addEventListener("click",()=>{

        pedido.color = color.classList[1];

    });

});


/* MENSAJE DE LA TORTA */

const mensajeInput = document.querySelector("input[type='text']");

mensajeInput.addEventListener("input",()=>{

    pedido.mensaje = mensajeInput.value.trim();

});


/* COMENTARIOS */

const comentarios = document.querySelector("textarea");

comentarios.addEventListener("input",()=>{

    pedido.comentarios = comentarios.value.trim();

});

/* CAMBIO DE IMAGEN PRINCIPAL */

const imagenPrincipal = document.querySelector(".imagen-principal img");

const miniaturas = document.querySelectorAll(".miniaturas figure");

miniaturas.forEach(miniatura=>{

    miniatura.addEventListener("click",()=>{

        const imagen = miniatura.querySelector("img");

        imagenPrincipal.src = imagen.src;

        imagenPrincipal.alt = imagen.alt;

        miniaturas.forEach(item=>{

            item.classList.remove("activa");

        });

        miniatura.classList.add("activa");

    });

});


/* SUBIR IMAGEN */

const inputImagen = document.querySelector("input[type='file']");

const vistaPrevia = document.querySelector("#vistaPrevia");

inputImagen.addEventListener("change",(e)=>{

    const archivo = e.target.files[0];

    if(!archivo) return;

    pedido.imagen = archivo.name;

    const lector = new FileReader();

    lector.onload = function(evento){

        vistaPrevia.src = evento.target.result;

        vistaPrevia.parentElement.classList.add("mostrar");

    }

    lector.readAsDataURL(archivo);

});

/* VALIDAR FORMULARIO */

function validarFormulario(){

    if(pedido.personas===""){

        alert("Selecciona para cuántas personas será la torta.");

        return false;

    }

    if(pedido.sabor===""){

        alert("Selecciona un sabor.");

        return false;

    }

    if(pedido.relleno===""){

        alert("Selecciona un relleno.");

        return false;

    }

    return true;

}

/* RESUMEN DEL PEDIDO */

function actualizarResumen(){

    document.querySelector("#resumenDiseno").textContent =
    pedido.diseno;

    document.querySelector("#resumenPersonas").textContent =
    pedido.personas;

    document.querySelector("#resumenSabor").textContent =
    pedido.sabor;

    document.querySelector("#resumenRelleno").textContent =
    pedido.relleno;

    document.querySelector("#resumenColor").textContent =
    pedido.color || "No seleccionado";

    document.querySelector("#resumenMensaje").textContent =
    pedido.mensaje || "Sin mensaje";

}

/* MODAL */

const modal = document.querySelector("#modalConfirmacion");

const botonCrear = document.querySelector("#btnCrearPedido");

botonCrear.addEventListener("click",(e)=>{

    e.preventDefault();

    if(!validarFormulario()) return;

    actualizarResumen();

    modal.classList.add("activo");

});

/* CERRAR MODAL */

const cerrarModal = document.querySelector(".cerrar-modal");

const editar = document.querySelector(".editar");


cerrarModal.addEventListener("click",()=>{

    modal.classList.remove("activo");

});


editar.addEventListener("click",()=>{

    modal.classList.remove("activo");

});

/* MENSAJE WHATSAPP */

function crearMensaje(){

    return `🎂 *Nueva Solicitud - Serena*

━━━━━━━━━━━━━━━━━━━━━━

🍰 Diseño:
${pedido.diseno}

👥 Personas:
${pedido.personas}

🍫 Sabor:
${pedido.sabor}

🥛 Relleno:
${pedido.relleno}

🎨 Color:
${pedido.color || "No seleccionado"}

✍️ Mensaje:
${pedido.mensaje || "Sin mensaje"}

💬 Comentarios:
${pedido.comentarios || "Sin comentarios"}

📷 Imagen:
${pedido.imagen || "No adjuntó"}

━━━━━━━━━━━━━━━━━━━━━━

Hola Serena 😊

Quiero cotizar esta torta.
`;

}

/* ENVIAR WHATSAPP */

const pantallaCarga = document.querySelector("#cargandoWhatsapp");

const enviarWhatsapp = document.querySelector(".enviar-whatsapp");

enviarWhatsapp.addEventListener("click",()=>{

    modal.classList.remove("activo");

    pantallaCarga.classList.add("activo");

    setTimeout(()=>{

        const mensaje = encodeURIComponent(

            crearMensaje()

        );

        window.open(

            `https://wa.me/573185057723?text=${mensaje}`,

            "_blank"

        );

        pantallaCarga.classList.remove("activo");

    },1800);

});