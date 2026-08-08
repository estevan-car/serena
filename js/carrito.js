/* CARRITO — todo se guarda en localStorage, sin backend.
   Al finalizar, arma un solo mensaje y lo envía por WhatsApp. */

const CARRITO_KEY = "serena_carrito";
const CARRITO_WHATSAPP = "573185057723";

/* LECTURA / ESCRITURA */

function leerCarrito(){

    try {

        const datos = JSON.parse(localStorage.getItem(CARRITO_KEY));
        return Array.isArray(datos) ? datos : [];

    } catch {

        return [];

    }

}

function guardarCarrito(carrito){

    localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));

}

/* AGREGAR / QUITAR */

function agregarAlCarrito(nombre, categoria){

    if(!nombre) return;

    const carrito = leerCarrito();

    const existente = carrito.find(item=>
        item.nombre === nombre && item.categoria === categoria
    );

    if(existente){

        existente.cantidad += 1;

    } else {

        carrito.push({ nombre, categoria: categoria || "", cantidad: 1 });

    }

    guardarCarrito(carrito);
    actualizarContador();
    renderizarCarrito();
    mostrarToast(`${nombre} se agregó al carrito`);

}

function quitarDelCarrito(indice){

    const carrito = leerCarrito();

    carrito.splice(indice, 1);

    guardarCarrito(carrito);
    actualizarContador();
    renderizarCarrito();

}

function vaciarCarrito(){

    guardarCarrito([]);
    actualizarContador();
    renderizarCarrito();

}

/* CONTADOR EN EL HEADER */

function actualizarContador(){

    const total = leerCarrito().reduce((acc, item)=> acc + item.cantidad, 0);

    document.querySelectorAll(".contador-carrito").forEach(el=>{

        el.textContent = total;
        el.style.display = total > 0 ? "flex" : "none";

    });

}

/* MENSAJE DE WHATSAPP */

function construirMensajeWhatsapp(carrito){

    const lineas = carrito.map((item, i)=>{

        const cantidad = item.cantidad > 1 ? ` x${item.cantidad}` : "";
        const categoria = item.categoria ? ` (${item.categoria})` : "";

        return `${i + 1}. ${item.nombre}${categoria}${cantidad}`;

    });

    return `🎂 *Nuevo pedido - Serena*\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `${lineas.join("\n")}\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `Hola Serena 😊, quiero cotizar estos diseños.`;

}

/* RENDER DEL PANEL */

function renderizarCarrito(){

    const lista = document.querySelector("#carritoLista");
    const vacio = document.querySelector("#carritoVacio");
    const enviarBtn = document.querySelector("#enviarCarritoWhatsapp");
    const vaciarBtn = document.querySelector("#vaciarCarrito");

    if(!lista) return;

    const carrito = leerCarrito();

    lista.innerHTML = "";

    if(carrito.length === 0){

        vacio.style.display = "flex";
        if(enviarBtn) enviarBtn.classList.add("deshabilitado");
        if(vaciarBtn) vaciarBtn.style.display = "none";

    } else {

        vacio.style.display = "none";
        if(enviarBtn) enviarBtn.classList.remove("deshabilitado");
        if(vaciarBtn) vaciarBtn.style.display = "inline-flex";

        carrito.forEach((item, indice)=>{

            const li = document.createElement("li");

            li.className = "carrito-item";

            li.innerHTML = `
                <section class="carrito-item-info">
                    <h4>${item.nombre}</h4>
                    <p>${item.categoria}${item.cantidad > 1 ? ` · x${item.cantidad}` : ""}</p>
                </section>
                <button type="button" class="carrito-item-quitar" aria-label="Quitar ${item.nombre} del carrito">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            `;

            li.querySelector(".carrito-item-quitar").addEventListener("click", ()=>{

                quitarDelCarrito(indice);

            });

            lista.appendChild(li);

        });

    }

    if(enviarBtn){

        if(carrito.length > 0){

            const mensaje = encodeURIComponent(construirMensajeWhatsapp(carrito));
            enviarBtn.href = `https://wa.me/${CARRITO_WHATSAPP}?text=${mensaje}`;

        } else {

            enviarBtn.href = "#";

        }

    }

}

/* ABRIR / CERRAR PANEL */

function abrirCarrito(){

    const panel = document.querySelector("#carritoPanel");

    if(!panel) return;

    panel.classList.add("abierto");
    panel.setAttribute("aria-hidden", "false");
    document.body.classList.add("carrito-abierto");

}

function cerrarCarrito(){

    const panel = document.querySelector("#carritoPanel");

    if(!panel) return;

    panel.classList.remove("abierto");
    panel.setAttribute("aria-hidden", "true");
    document.body.classList.remove("carrito-abierto");

}

/* TOAST DE CONFIRMACIÓN */

let toastTimeout;

function mostrarToast(texto){

    const toast = document.querySelector("#carritoToast");

    if(!toast) return;

    toast.textContent = texto;
    toast.classList.add("visible");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(()=>{

        toast.classList.remove("visible");

    }, 2400);

}

/* INICIALIZACIÓN */

document.addEventListener("DOMContentLoaded", ()=>{

    actualizarContador();
    renderizarCarrito();

    /* Abrir carrito */

    document.querySelectorAll(".boton-carrito").forEach(boton=>{

        boton.addEventListener("click", (e)=>{

            e.stopPropagation();
            abrirCarrito();

        });

    });

    /* Cerrar carrito */

    const cerrarBtn = document.querySelector(".cerrar-carrito");

    if(cerrarBtn){

        cerrarBtn.addEventListener("click", cerrarCarrito);

    }

    const overlay = document.querySelector(".carrito-overlay");

    if(overlay){

        overlay.addEventListener("click", cerrarCarrito);

    }

    document.addEventListener("keydown", (e)=>{

        if(e.key === "Escape") cerrarCarrito();

    });

    /* Vaciar carrito */

    const vaciarBtn = document.querySelector("#vaciarCarrito");

    if(vaciarBtn){

        vaciarBtn.addEventListener("click", vaciarCarrito);

    }

    /* Botones "Agregar al carrito" de cada diseño */

    const categoriaPagina = document.body.dataset.categoria || document.title;

    document.querySelectorAll(".boton-agregar-carrito").forEach(boton=>{

        boton.addEventListener("click", ()=>{

            agregarAlCarrito(boton.dataset.nombre, categoriaPagina);

        });

    });

});
