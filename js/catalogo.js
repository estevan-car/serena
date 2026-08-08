/* CATÁLOGO DINÁMICO
   Lee data/{slug}.json y pinta el hero + la galería de diseños.
   Este JSON es justamente lo que edita el panel de administración (/admin). */

const CATALOGO_WHATSAPP = "573185057723";

function formatearPrecioCatalogo(numero){

    const valor = Number(numero) || 0;

    return "$" + valor.toLocaleString("es-CO");

}

function pintarHero(hero){

    const contenedor = document.querySelector(".contenido-categoria");

    if(!contenedor || !hero) return;

    const etiqueta = contenedor.querySelector(".etiqueta-seccion");
    const titulo = contenedor.querySelector("h1");
    const descripcion = contenedor.querySelector("p:not(.etiqueta-seccion)");

    if(etiqueta) etiqueta.textContent = hero.etiqueta || "";
    if(titulo) titulo.textContent = hero.titulo || "";
    if(descripcion) descripcion.textContent = hero.descripcion || "";

    const imagen = document.querySelector(".imagen-categoria img");

    if(imagen && hero.imagen){

        imagen.src = hero.imagen;
        imagen.alt = hero.titulo || "";

    }

}

function tarjetaDiseno(diseno){

    const nombre = diseno.nombre || "";
    const tags = diseno.tags || "";
    const precio = Number(diseno.precio) || 0;
    const precioTexto = precio > 0 ? formatearPrecioCatalogo(precio) : "Precio a cotizar";
    const waTexto = encodeURIComponent(
        `Hola Serena, quiero personalizar el diseño ${nombre}.`
    );

    const article = document.createElement("article");

    article.className = "diseno";

    article.innerHTML = `
        <figure class="imagen-diseno">
            <img src="${diseno.imagen || ""}" alt="${nombre}">
        </figure>

        <section class="informacion-diseno">
            <h3>${nombre}</h3>
            <p>${tags}</p>
            <p class="precio-diseno">${precioTexto}</p>

            <div class="acciones-diseno">
                <a href="https://wa.me/${CATALOGO_WHATSAPP}?text=${waTexto}" class="boton-diseno">
                    Quiero este diseño
                    <i class="fa-solid fa-arrow-right"></i>
                </a>

                <button type="button" class="boton-agregar-carrito"
                    data-nombre="${nombre}"
                    data-precio="${precio}"
                    aria-label="Agregar ${nombre} al carrito">
                    <i class="fa-solid fa-cart-plus"></i>
                </button>
            </div>
        </section>
    `;

    return article;

}

function pintarGaleria(disenos){

    const grid = document.querySelector(".grid-disenos");

    if(!grid || !Array.isArray(disenos)) return;

    grid.innerHTML = "";

    disenos.forEach(diseno=>{

        grid.appendChild(tarjetaDiseno(diseno));

    });

}

async function cargarCatalogo(){

    const slug = document.body.dataset.slug;

    if(!slug) return;

    try {

        const respuesta = await fetch(`data/${slug}.json`);

        if(!respuesta.ok) throw new Error(`No se pudo cargar data/${slug}.json`);

        const datos = await respuesta.json();

        pintarHero(datos.hero);
        pintarGaleria(datos.disenos);

    } catch (error){

        console.error("Error cargando el catálogo:", error);

        const grid = document.querySelector(".grid-disenos");

        if(grid){

            grid.innerHTML = `<p class="catalogo-error">
                No se pudo cargar el catálogo en este momento. Intenta recargar la página.
            </p>`;

        }

    }

}

document.addEventListener("DOMContentLoaded", cargarCatalogo);
